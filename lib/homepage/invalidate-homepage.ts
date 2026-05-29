import "server-only";

import { optionalCacheDel } from "@/lib/cache/optional-cache";

const HOMEPAGE_CACHE_KEY = "homepage:v1";

/**
 * Invalidate the homepage Redis cache.
 * Called after any admin mutation that affects homepage content
 * (posts, projects, research logs — create/update/delete/publish/unpublish).
 *
 * This is best-effort: if Redis is unavailable, the cache will expire
 * via its 60-second TTL naturally.
 */
export async function invalidateHomepageCache() {
  await optionalCacheDel(HOMEPAGE_CACHE_KEY);
}
