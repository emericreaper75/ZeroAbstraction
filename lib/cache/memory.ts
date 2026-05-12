import type { Cache } from "@/lib/cache/types";

type Entry = { v: string; exp: number | null };

const store = new Map<string, Entry>();

export const memoryCache: Cache = {
  async get(key) {
    const e = store.get(key);
    if (!e) return null;
    if (e.exp !== null && Date.now() > e.exp) {
      store.delete(key);
      return null;
    }
    return e.v;
  },
  async set(key, value, ttlSeconds) {
    const exp = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    store.set(key, { v: value, exp });
  },
};

