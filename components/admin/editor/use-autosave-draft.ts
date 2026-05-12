"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { SaveStatus } from "@/components/admin/editor/save-status";

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function uuid() {
  // Good-enough client mutation id for idempotency and dedupe.
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useAutosaveDraft<TDraft extends Record<string, unknown>>(input: {
  enabled: boolean;
  storageKey: string;
  initialDraft: TDraft;
  debounceMs?: number;
  save: (draft: TDraft, clientMutationId: string) => Promise<
    | { ok: true; updatedAt: string; version?: number }
    | { ok: false; error: string }
  >;
}) {
  const debounceMs = input.debounceMs ?? 800;

  const [draft, setDraft] = useState<TDraft>(() => {
    const fromStorage = safeJsonParse<TDraft>(
      typeof window === "undefined"
        ? null
        : window.localStorage.getItem(input.storageKey)
    );
    return fromStorage ?? input.initialDraft;
  });

  const [status, setStatus] = useState<SaveStatus>({ state: "idle" });

  const lastSavedJsonRef = useRef<string>(JSON.stringify(input.initialDraft));
  const inFlightRef = useRef(false);
  const queuedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const draftJson = useMemo(() => JSON.stringify(draft), [draft]);

  const persistLocal = useCallback(
    (next: TDraft) => {
      try {
        window.localStorage.setItem(input.storageKey, JSON.stringify(next));
      } catch {
        // Ignore storage quota / disabled storage.
      }
    },
    [input.storageKey]
  );

  const flush = useCallback(async function flushImpl() {
    if (!input.enabled) return;
    if (inFlightRef.current) {
      queuedRef.current = true;
      return;
    }

    if (draftJson === lastSavedJsonRef.current) {
      setStatus((s) => (s.state === "saving" ? { state: "idle" } : s));
      return;
    }

    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus({ state: "offline" });
      persistLocal(draft);
      queuedRef.current = true;
      return;
    }

    inFlightRef.current = true;
    setStatus({ state: "saving" });

    const clientMutationId = uuid();
    const res = await input.save(draft, clientMutationId);

    if (res.ok) {
      lastSavedJsonRef.current = draftJson;
      setStatus({ state: "saved", at: res.updatedAt });
      persistLocal(draft);
    } else {
      setStatus({ state: "error", message: res.error });
    }

    inFlightRef.current = false;

    if (queuedRef.current) {
      queuedRef.current = false;
      // Avoid tight loop: allow React paint + consolidate changes.
      setTimeout(() => flushImpl(), 0);
    }
  }, [draft, draftJson, input, persistLocal]);

  useEffect(() => {
    if (!input.enabled) return;

    if (timerRef.current) clearTimeout(timerRef.current);

    setStatus((prev) => (prev.state === "saving" ? prev : { state: "dirty" }));

    timerRef.current = setTimeout(() => {
      flush();
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draftJson, debounceMs, flush, input.enabled]);

  useEffect(() => {
    if (!input.enabled) return;
    const onOnline = () => {
      if (queuedRef.current) flush();
    };
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, [flush, input.enabled]);

  return {
    draft,
    setDraft: (next: TDraft) => {
      setDraft(next);
      if (typeof window !== "undefined") persistLocal(next);
    },
    status,
    flush,
    resetLocalDraft: () => {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(input.storageKey);
      }
      setDraft(input.initialDraft);
      lastSavedJsonRef.current = JSON.stringify(input.initialDraft);
      setStatus({ state: "idle" });
    },
  };
}

