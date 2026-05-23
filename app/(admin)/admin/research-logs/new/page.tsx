"use client";

import { useFormState } from "react-dom";
import { createResearchLog } from "@/actions/research-log-actions";
import Link from "next/link";

const SERIES_OPTIONS = [
  "Signal Processing",
  "Systems Architecture",
  "Astrophysics Notes",
  "Electronics Lab",
  "Physics Abstractions",
  "Communications Theory",
];

export default function NewResearchLogPage() {
  const [state, formAction] = useFormState(createResearchLog, { error: "" });
  const isPending = false;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      <div className="cinematic-glow" />

      {/* Header */}
      <header className="h-24 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div className="flex flex-col">
          <nav className="font-label text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
            Admin / Research Logs / <span className="text-[#c9c6c5]">New Entry</span>
          </nav>
          <h1 className="text-[36px] font-black font-headline tracking-tighter text-on-surface">New Research Log</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/research-logs" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-label text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all">
            Cancel
          </Link>
          <button
            form="new-log-form"
            type="submit"
            name="published"
            value="true"
            disabled={isPending}
            className="px-8 py-2 bg-zinc-300 text-black font-label text-xs font-bold uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50"
          >
            {isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </header>

      {state.error && (
        <div className="mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      <form id="new-log-form" action={formAction} className="flex-1 overflow-y-auto custom-scrollbar px-12 py-8 max-w-5xl space-y-8">
        {/* Title */}
        <div>
          <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Log Title</label>
          <input
            name="title"
            required
            className="w-full bg-[#111111] border border-zinc-700 px-4 py-4 text-2xl font-bold font-headline text-on-surface focus:outline-none focus:border-zinc-300 transition-all"
            placeholder="Research log title..."
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Research Series</label>
            <select
              name="series"
              required
              className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 font-label text-sm text-zinc-300 focus:outline-none focus:border-zinc-300 appearance-none"
            >
              <option value="">Select Series...</option>
              {SERIES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Entry #</label>
            <input
              name="entryNumber"
              type="number"
              min="1"
              className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 font-label text-sm text-zinc-300 focus:outline-none focus:border-zinc-300 transition-all"
              placeholder="001"
            />
          </div>
          <div>
            <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Keywords / Tags</label>
            <input
              name="tags"
              className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 font-label text-sm text-zinc-300 focus:outline-none focus:border-zinc-300 transition-all"
              placeholder="tag1, tag2..."
            />
          </div>
        </div>

        {/* Abstract */}
        <div className="relative">
          <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Abstract</label>
          <textarea
            name="abstract"
            className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 text-sm text-on-surface font-body leading-relaxed focus:outline-none focus:border-zinc-300 resize-none"
            placeholder="Concise summary of the research log entry..."
            rows={4}
          />
        </div>

        {/* MDX Editor */}
        <div>
          <div className="flex gap-1 mb-0">
            <button type="button" className="px-6 py-2 bg-[#111111] border-x border-t border-zinc-700 font-label text-[10px] uppercase tracking-widest text-zinc-200">Write</button>
            <button type="button" className="px-6 py-2 text-zinc-600 hover:text-zinc-400 font-label text-[10px] uppercase tracking-widest transition-colors">Preview</button>
          </div>
          <textarea
            name="content"
            className="w-full min-h-[480px] bg-[#0d0d0d] border border-zinc-700 p-8 font-label text-sm leading-loose text-zinc-400 focus:outline-none resize-none custom-scrollbar"
            placeholder="# Research Entry&#10;&#10;Begin documenting your findings..."
          />
        </div>

        <input type="hidden" name="published" value="false" />
      </form>

      {/* Status Bar */}
      <footer className="fixed bottom-0 left-[240px] right-0 bg-surface-container-lowest border-t border-zinc-800 px-6 h-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-label text-[9px] text-zinc-500 uppercase tracking-widest">Auto-save Enabled</span>
        </div>
        <span className="font-label text-[9px] text-zinc-600 uppercase tracking-widest">MDX — UTF-8</span>
      </footer>
    </div>
  );
}
