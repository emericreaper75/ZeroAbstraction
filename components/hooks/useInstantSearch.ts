import { useEffect, useState } from "react";
import { useDebouncedValue } from "@/components/hooks/useDebouncedValue";

export type SearchResultItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  href: string;
  tags: string[];
  score: number;
  category: string;
};

type State =
  | { status: "idle"; items: SearchResultItem[]; error?: undefined }
  | { status: "loading"; items: SearchResultItem[]; error?: undefined }
  | { status: "error"; items: SearchResultItem[]; error: string };

type SearchIndexItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
};

let searchIndex: SearchIndexItem[] | null = null;
let indexFetchPromise: Promise<SearchIndexItem[]> | null = null;

async function getSearchIndex() {
  if (searchIndex) return searchIndex;
  if (!indexFetchPromise) {
    indexFetchPromise = fetch("/search-index.json").then(res => res.json());
  }
  searchIndex = await indexFetchPromise;
  return searchIndex;
}

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

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) {
      setState({ status: "idle", items: [] });
      return;
    }

    let isSubscribed = true;

    async function performSearch() {
      setState((s) => ({ status: "loading", items: s.items }));
      try {
        const [index, { default: Fuse }] = await Promise.all([
          getSearchIndex(),
          import("fuse.js")
        ]);
        
        if (!isSubscribed) return;

        const fuse = new Fuse(index, {
          keys: ["title", "description", "content", "tags"],
          includeScore: true,
          threshold: 0.4,
        });

        const results = fuse.search(q, { limit });
        
        const mappedResults: SearchResultItem[] = results.map(r => ({
          id: r.item.id,
          type: r.item.category === "Project" ? "project" : "post",
          title: r.item.title,
          description: r.item.description,
          href: r.item.url,
          tags: r.item.tags,
          score: r.score ?? 0,
          category: r.item.category,
        }));

        setState({ status: "idle", items: mappedResults });
      } catch {
        if (!isSubscribed) return;
        setState({
          status: "error",
          items: [],
          error: "Search failed to load.",
        });
      }
    }

    performSearch();

    return () => {
      isSubscribed = false;
    };
  }, [debouncedQuery, limit]);

  return { ...state, debouncedQuery };
}

