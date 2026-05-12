import type { Cache } from "@/lib/cache/types";
import { memoryCache } from "@/lib/cache/memory";

/**
 * Cache facade.
 *
 * This intentionally starts as in-memory (safe default) and can be swapped to Redis
 * later without rewriting callers (search, feeds, expensive aggregates, etc.).
 */
export const cacheStore: Cache = memoryCache;

