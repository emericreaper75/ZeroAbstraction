import "server-only";

import { logSecurityEvent } from "@/lib/security/logger";

/**
 * In-memory rate limiter using a sliding-window counter.
 * For production with multiple instances, replace with Upstash Redis
 * rate limiting (@upstash/ratelimit) when Redis env vars are configured.
 *
 * This implementation is suitable for single-instance deployments
 * (which matches ZeroAbstraction's VPS Docker setup).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Periodic cleanup of expired entries to prevent memory leaks
const CLEANUP_INTERVAL_MS = 60_000; // 1 minute
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanup() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    store.forEach((entry, key) => {
      if (now > entry.resetAt) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach((key) => store.delete(key));
  }, CLEANUP_INTERVAL_MS);
  // Allow Node.js to exit even if the timer is running
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed within the window */
  maxRequests: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

export interface RateLimitResult {
  /** Whether the request is allowed */
  allowed: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  resetAt: number;
}

/**
 * Predefined rate limit presets per endpoint type.
 */
export const RATE_LIMITS = {
  /** Auth endpoints: strict — 5 attempts per 15 minutes */
  auth: { maxRequests: 5, windowSeconds: 900 } satisfies RateLimitConfig,
  /** Search API: moderate — 30 requests per minute */
  search: { maxRequests: 30, windowSeconds: 60 } satisfies RateLimitConfig,
  /** Upload API: strict — 10 uploads per minute */
  upload: { maxRequests: 10, windowSeconds: 60 } satisfies RateLimitConfig,
  /** Newsletter: strict — 3 requests per hour */
  newsletter: { maxRequests: 3, windowSeconds: 3600 } satisfies RateLimitConfig,
  /** General API: moderate — 60 requests per minute */
  general: { maxRequests: 60, windowSeconds: 60 } satisfies RateLimitConfig,
} as const;

/**
 * Check rate limit for a given identifier (typically IP + endpoint).
 * Returns whether the request is allowed and how many remain.
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  ensureCleanup();

  const now = Date.now();
  const existing = store.get(identifier);

  // If no entry exists or the window has expired, start a new window
  if (!existing || now > existing.resetAt) {
    const resetAt = now + config.windowSeconds * 1000;
    store.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: config.maxRequests - 1, resetAt };
  }

  // Increment the counter
  existing.count += 1;

  if (existing.count > config.maxRequests) {
    logSecurityEvent({
      type: "RATE_LIMIT_EXCEEDED",
      message: `Rate limit exceeded for ${identifier}`,
      metadata: {
        count: existing.count,
        limit: config.maxRequests,
        windowSeconds: config.windowSeconds,
      },
    });
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

/**
 * Create standard rate limit response headers.
 */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    ...(result.allowed ? {} : { "Retry-After": String(Math.ceil((result.resetAt - Date.now()) / 1000)) }),
  };
}
