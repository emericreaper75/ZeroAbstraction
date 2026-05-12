import { useEffect, useMemo, useState } from "react";

import type { SearchResponse, SearchResultItem } from "@/lib/search/types";
import { useDebouncedValue } from "@/components/hooks/useDebouncedValue";

type State =
  | { status: "idle"; items: SearchResultItem[]; error?: undefined }
  | { status: "loading"; items: SearchResultItem[]; error?: undefined }
  | { status: "error"; items: SearchResultItem[]; error: string };

export function useInstantSearch(opts: {
  query: string;
  limit?: number;
  debounceMs?: number;
}) {
  const limit = opts.limit ?? 10;
  const debouncedQuery = useDebouncedValue(opts.query, opts.debounceMs ?? 180);

  const [state, setState] = useState<State>({
    status: "idle",
    items: [],
  });

  const url = useMemo(() => {
    const q = debouncedQuery.trim();
    if (!q) return null;
    const sp = new URLSearchParams({ q, limit: String(limit) });
    return `/api/search?${sp.toString()}`;
  }, [debouncedQuery, limit]);

  useEffect(() => {
    if (!url) {
      setState({ status: "idle", items: [] });
      return;
    }

    const controller = new AbortController();
    setState((s) => ({ status: "loading", items: s.items }));

    (async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          signal: controller.signal,
          headers: { Accept: "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `Search failed (${res.status})`);
        }

        const data = (await res.json()) as SearchResponse;
        setState({ status: "idle", items: data.items });
      } catch (err) {
        if ((err as { name?: string }).name === "AbortError") return;
        setState({
          status: "error",
          items: [],
          error: err instanceof Error ? err.message : "Search failed",
        });
      }
    })();

    return () => controller.abort();
  }, [url]);

  return { ...state, debouncedQuery };
}

