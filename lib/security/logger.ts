import "server-only";

/**
 * Security event logger for ZeroAbstraction.
 * Logs authentication failures, permission denials, rate limit violations,
 * and other security-relevant events.
 *
 * In production, these should be forwarded to a centralized, tamper-evident
 * log store. For now, structured JSON logs to stdout are used.
 */

export type SecurityEventType =
  | "AUTH_FAILURE"
  | "AUTH_LOCKOUT"
  | "AUTH_SUCCESS"
  | "PERMISSION_DENIED"
  | "RATE_LIMIT_EXCEEDED"
  | "INVALID_INPUT"
  | "SUSPICIOUS_ACTIVITY";

interface SecurityEvent {
  type: SecurityEventType;
  /** IP address or identifier (never log raw credentials) */
  ip?: string;
  /** Email or user ID — never log passwords or tokens */
  userId?: string;
  /** Human-readable context */
  message: string;
  /** Additional safe-to-log metadata */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Log a security event. Uses structured JSON to stdout for production
 * ingestion by log aggregators (e.g., Docker logs, CloudWatch, Datadog).
 *
 * NEVER pass passwords, tokens, API keys, or PII into metadata.
 */
export function logSecurityEvent(event: SecurityEvent): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level: "SECURITY",
    ...event,
  };

  // Use console.warn for security events so they stand out in log streams
  // eslint-disable-next-line no-console
  console.warn(`[SECURITY] ${JSON.stringify(entry)}`);
}
