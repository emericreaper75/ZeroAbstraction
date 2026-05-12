"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { useInstantSearch } from "@/components/hooks/useInstantSearch";

function useGlobalHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toLowerCase().includes("mac");
      const isCmdK = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        onOpen();
      }
      if (e.key === "/") {
        // Common SaaS pattern, ignore when typing in inputs.
        const el = e.target as HTMLElement | null;
        const isTyping =
          el?.tagName === "INPUT" || el?.tagName === "TEXTAREA" || (el as HTMLElement | null)?.isContentEditable;
        if (!isTyping) {
          e.preventDefault();
          onOpen();
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onOpen]);
}

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  useGlobalHotkey(openModal);

  const { status, items, error } = useInstantSearch({
    query,
    limit: 10,
    debounceMs: 160,
  });

  const hasResults = items.length > 0;
  const hint = useMemo(() => {
    const isMac = typeof navigator !== "undefined" && navigator.platform.toLowerCase().includes("mac");
    return isMac ? "⌘K" : "Ctrl K";
  }, []);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    // Reset selection on new results to keep keyboard nav predictable.
    setActiveIndex(0);
  }, [items.length]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (!hasResults) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const active = items[activeIndex];
      if (active) window.location.assign(active.href);
    }
  };

  // Keep active item visible while navigating.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  return (
    <>
      <Button
        variant="ghost"
        className="hidden md:inline-flex items-center gap-2 border border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/50"
        onClick={openModal}
        aria-label="Search"
      >
        <Search className="h-4 w-4" aria-hidden="true" />
        <span className="text-sm font-mono">Search</span>
        <span className="ml-2 rounded border border-zinc-800 bg-zinc-950/60 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
          {hint}
        </span>
      </Button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-24 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#050810] shadow-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
              <Search className="h-4 w-4 text-zinc-500" aria-hidden="true" />
              <Input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search posts and projects…"
                className="h-10 border-0 bg-transparent px-1 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-0"
              />
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-zinc-500 hover:text-zinc-200"
                onClick={close}
                aria-label="Close search"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>

            <div className="px-2 py-2">
              {error ? (
                <div className="px-3 py-4 text-sm text-red-300">{error}</div>
              ) : status === "loading" && query.trim() ? (
                <div className="px-3 py-4 text-sm text-zinc-500">Searching…</div>
              ) : !query.trim() ? (
                <div className="px-3 py-4 text-sm text-zinc-500">
                  Tip: press <span className="font-mono text-zinc-300">{hint}</span> or <span className="font-mono text-zinc-300">/</span> to open search.
                </div>
              ) : !hasResults ? (
                <div className="px-3 py-4 text-sm text-zinc-500">No results.</div>
              ) : (
                <div ref={listRef} className="max-h-[60vh] overflow-auto py-1">
                  {items.map((item, idx) => (
                    <Link
                      key={`${item.type}-${item.id}`}
                      href={item.href}
                      onClick={close}
                      data-idx={idx}
                      className={cn(
                        "group flex items-start gap-3 rounded-xl px-3 py-3 text-left transition",
                        idx === activeIndex
                          ? "bg-cyan-500/10 outline outline-1 outline-cyan-500/30"
                          : "hover:bg-zinc-900/40"
                      )}
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      <div className="mt-0.5 w-20 shrink-0">
                        <span
                          className={cn(
                            "inline-flex rounded-full border px-2 py-1 text-[10px] font-mono uppercase tracking-wider",
                            item.type === "post"
                              ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                              : "border-rose-500/30 bg-rose-500/10 text-rose-200"
                          )}
                        >
                          {item.type}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate text-sm font-medium text-zinc-100 group-hover:text-white">
                            {item.title}
                          </p>
                          <span className="text-[10px] font-mono text-zinc-600">
                            {Math.round(item.score * 100) / 100}
                          </span>
                        </div>
                        {item.description ? (
                          <p className="mt-1 line-clamp-2 text-xs text-zinc-500">{item.description}</p>
                        ) : null}
                        {item.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {item.tags.slice(0, 4).map((t) => (
                              <span
                                key={t}
                                className="rounded border border-zinc-800 bg-zinc-950/40 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

