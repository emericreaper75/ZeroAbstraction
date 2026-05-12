import "server-only";

import { getRedis } from "@/lib/cache/redis";

type CacheKey = string;

export async function cacheGetJson<T>(key: CacheKey): Promise<T | null> {
  const redis = getRedis();
  const v = await redis.get<T>(key);
  return v ?? null;
}

export async function cacheSetJson<T>(
  key: CacheKey,
  value: T,
  input?: { ttlSeconds?: number; tags?: string[] }
) {
  const redis = getRedis();
  if (input?.ttlSeconds) {
    await redis.set(key, value, { ex: input.ttlSeconds });
  } else {
    await redis.set(key, value);
  }

  if (input?.tags?.length) {
    for (const tag of input.tags) {
      await redis.sadd(`tag:${tag}`, key);
    }
  }
}

export async function cacheInvalidateTag(tag: string) {
  const redis = getRedis();
  const keys = (await redis.smembers(`tag:${tag}`)) as string[];
  if (!keys.length) return;
  await redis.del(...keys);
  await redis.del(`tag:${tag}`);
}

