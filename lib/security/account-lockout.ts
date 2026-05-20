import "server-only";

import { logSecurityEvent } from "@/lib/security/logger";

/**
 * Account lockout system with exponential backoff.
 *
 * Tracks failed login attempts per email address (never per password).
 * After MAX_ATTEMPTS failures within the lockout window, the account
 * is temporarily locked with exponential backoff.
 *
 * Uses in-memory store (suitable for single-instance VPS deployment).
 */

interface LockoutEntry {
  /** Number of consecutive failed attempts */
  failedAttempts: number;
  /** Timestamp of the last failed attempt */
  lastFailedAt: number;
  /** Timestamp when lockout expires (0 if not locked) */
  lockedUntil: number;
}

const lockoutStore = new Map<string, LockoutEntry>();

/** Maximum consecutive failures before lockout kicks in */
const MAX_ATTEMPTS = 5;

/** Base lockout duration in seconds (doubles each subsequent lockout) */
const BASE_LOCKOUT_SECONDS = 60;

/** Maximum lockout duration: 30 minutes */
const MAX_LOCKOUT_SECONDS = 1800;

/** Window in which failed attempts are counted (1 hour) */
const ATTEMPT_WINDOW_MS = 3600_000;

// Cleanup expired entries periodically
const CLEANUP_INTERVAL_MS = 300_000; // 5 minutes
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    lockoutStore.forEach((entry, key) => {
      if (now > entry.lockedUntil && now - entry.lastFailedAt > ATTEMPT_WINDOW_MS) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => lockoutStore.delete(key));
  }, CLEANUP_INTERVAL_MS);
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Check if an account is currently locked out.
 * Returns null if not locked, or the remaining lockout duration in seconds.
 */
export function isLockedOut(email: string): number | null {
  ensureCleanup();

  const normalizedEmail = email.toLowerCase().trim();
  const entry = lockoutStore.get(normalizedEmail);

  if (!entry) return null;

  const now = Date.now();

  if (entry.lockedUntil > now) {
    const remainingSeconds = Math.ceil((entry.lockedUntil - now) / 1000);
    return remainingSeconds;
  }

  return null;
}

/**
 * Record a failed login attempt. Returns whether the account is now locked.
 */
export function recordFailedAttempt(email: string): {
  locked: boolean;
  remainingSeconds: number;
  attempts: number;
} {
  ensureCleanup();

  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();
  const entry = lockoutStore.get(normalizedEmail);

  if (!entry || now - entry.lastFailedAt > ATTEMPT_WINDOW_MS) {
    // First failure or window expired — start fresh
    lockoutStore.set(normalizedEmail, {
      failedAttempts: 1,
      lastFailedAt: now,
      lockedUntil: 0,
    });
    return { locked: false, remainingSeconds: 0, attempts: 1 };
  }

  entry.failedAttempts += 1;
  entry.lastFailedAt = now;

  if (entry.failedAttempts >= MAX_ATTEMPTS) {
    // Calculate exponential backoff duration
    const lockoutMultiplier = Math.pow(2, Math.floor(entry.failedAttempts / MAX_ATTEMPTS) - 1);
    const lockoutSeconds = Math.min(
      BASE_LOCKOUT_SECONDS * lockoutMultiplier,
      MAX_LOCKOUT_SECONDS
    );
    entry.lockedUntil = now + lockoutSeconds * 1000;

    logSecurityEvent({
      type: "AUTH_LOCKOUT",
      message: `Account locked after ${entry.failedAttempts} failed attempts`,
      metadata: {
        email: normalizedEmail,
        attempts: entry.failedAttempts,
        lockoutSeconds,
      },
    });

    return {
      locked: true,
      remainingSeconds: lockoutSeconds,
      attempts: entry.failedAttempts,
    };
  }

  return {
    locked: false,
    remainingSeconds: 0,
    attempts: entry.failedAttempts,
  };
}

/**
 * Reset lockout state after a successful login.
 */
export function resetLockout(email: string): void {
  const normalizedEmail = email.toLowerCase().trim();
  lockoutStore.delete(normalizedEmail);
}
