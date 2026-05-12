"use client";

import { useMemo } from "react";

export type SaveStatus =
  | { state: "idle" }
  | { state: "dirty" }
  | { state: "saving" }
  | { state: "saved"; at: string }
  | { state: "offline" }
  | { state: "error"; message: string };

export function SaveStatusIndicator({ status }: { status: SaveStatus }) {
  const label = useMemo(() => {
    switch (status.state) {
      case "idle":
        return "Idle";
      case "dirty":
        return "Unsaved changes";
      case "saving":
        return "Saving…";
      case "saved":
        return `Saved ${new Date(status.at).toLocaleTimeString()}`;
      case "offline":
        return "Offline (saved locally)";
      case "error":
        return `Save failed: ${status.message}`;
    }
  }, [status]);

  const className = useMemo(() => {
    switch (status.state) {
      case "saved":
        return "border-emerald-900/60 bg-emerald-950/40 text-emerald-200";
      case "saving":
        return "border-zinc-700 bg-zinc-900 text-zinc-200";
      case "dirty":
        return "border-amber-900/60 bg-amber-950/40 text-amber-200";
      case "offline":
        return "border-sky-900/60 bg-sky-950/40 text-sky-200";
      case "error":
        return "border-red-900/60 bg-red-950/40 text-red-200";
      default:
        return "border-zinc-800 bg-zinc-950 text-zinc-400";
    }
  }, [status.state]);

  return (
    <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${className}`}>
      {label}
    </div>
  );
}

