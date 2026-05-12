import "server-only";

export type AnalyticsEvent = {
  name: string;
  userId?: string;
  properties?: Record<string, unknown>;
  occurredAt?: string;
};

/**
 * Analytics abstraction (PostHog, Segment, self-hosted, etc).
 * Keeps product code vendor-agnostic.
 */
export async function trackEvent(_event: AnalyticsEvent) {
  // Intentionally a no-op until a provider is wired.
  void _event;
  return { ok: true as const };
}

