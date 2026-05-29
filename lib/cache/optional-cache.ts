import "server-only";

import { getRedis } from "@/lib/cache/redis";

export async function optionalCacheGet<T>(key: string): Promise<T | null> {
  try {
    const redis = getRedis();
    const v = await redis.get<T>(key);
    return v ?? null;
  } catch {
    return null;
  }
}

export async function optionalCacheSet<T>(key: string, value: T, ttlSeconds: number) {
  try {
    const redis = getRedis();
    await redis.set(key, value, { ex: ttlSeconds });
  } catch {
    // best-effort
  }
}

export async function optionalCacheDel(key: string) {
  try {
    const redis = getRedis();
    await redis.del(key);
  } catch {
    // best-effort — if Redis is down, cache will expire via TTL anyway
  }
}
