'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TimelineEntry } from '@/lib/timeline';
import { formatDate } from '@/lib/utils';
import { ArrowRight, ChevronDown } from 'lucide-react';

// ─── Category config ──────────────────────────────────────────────────────────

type CategoryConfig = {
  bg: string;
  ring: string;
  borderActive: string;
  glow: string;
  linkColor: string;
  accent: string;
};

const categoryConfigs: Record<string, CategoryConfig> = {
  electronics: {
    bg: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
    ring: 'ring-cyan-950/30',
    borderActive: 'border-l-cyan-400/50',
    glow: 'hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]',
    linkColor: 'text-cyan-400 hover:text-cyan-300 border-cyan-800/60 hover:border-cyan-600/60 bg-cyan-950/30',
    accent: 'text-cyan-500/60',
  },
  astrophysics: {
    bg: 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]',
    ring: 'ring-violet-950/30',
    borderActive: 'border-l-violet-400/50',
    glow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]',
    linkColor: 'text-violet-400 hover:text-violet-300 border-violet-800/60 hover:border-violet-600/60 bg-violet-950/30',
    accent: 'text-violet-500/60',
  },
  'physics-math': {
    bg: 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]',
    ring: 'ring-emerald-950/30',
    borderActive: 'border-l-emerald-400/50',
    glow: 'hover:shadow-[0_0_20px_rgba(74,222,128,0.1)]',
    linkColor: 'text-emerald-400 hover:text-emerald-300 border-emerald-800/60 hover:border-emerald-600/60 bg-emerald-950/30',
    accent: 'text-emerald-500/60',
  },
  research: {
    bg: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    ring: 'ring-amber-950/30',
    borderActive: 'border-l-amber-400/50',
    glow: 'hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]',
    linkColor: 'text-amber-400 hover:text-amber-300 border-amber-800/60 hover:border-amber-600/60 bg-amber-950/30',
    accent: 'text-amber-500/60',
  },
  academic: {
    bg: 'bg-zinc-400',
    ring: 'ring-zinc-950/30',
    borderActive: 'border-l-zinc-500/50',
    glow: 'hover:shadow-[0_0_20px_rgba(161,161,170,0.1)]',
    linkColor: 'text-zinc-400 hover:text-zinc-300 border-zinc-700/60 hover:border-zinc-600/60 bg-zinc-900/30',
    accent: 'text-zinc-500/60',
  },
};

const defaultConfig: CategoryConfig = {
  bg: 'bg-zinc-500',
  ring: 'ring-neutral-950/30',
  borderActive: 'border-l-zinc-500/50',
  glow: 'hover:shadow-[0_0_20px_rgba(115,115,115,0.1)]',
  linkColor: 'text-zinc-400 hover:text-zinc-300 border-zinc-700/60 hover:border-zinc-600/60 bg-zinc-900/30',
  accent: 'text-zinc-500/60',
};

const contentTypeLabels: Record<string, string> = {
  post: 'Article',
  project: 'Project',
  research: 'Research Log',
};

// Description is considered "long" if > 180 chars — show expand toggle
const EXPAND_THRESHOLD = 180;

type Props = { entry: TimelineEntry };

export default function TimelineItem({ entry }: Props) {
  const cn = categoryConfigs[entry.category] ?? defaultConfig;
  const isLong = entry.description.length > EXPAND_THRESHOLD;
  const [expanded, setExpanded] = useState(false);

  const displayDescription = isLong && !expanded
    ? entry.description.slice(0, EXPAND_THRESHOLD).trimEnd() + '…'
    : entry.description;

  return (
    <div className="relative flex gap-5 pb-10 group">
      {/* Timeline dot */}
      <div
        className={`relative mt-1.5 h-4 w-4 shrink-0 rounded-full ${cn.bg} ring-4 ${cn.ring} transition-all duration-300 group-hover:scale-110`}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className={`min-w-0 flex-1 rounded-xl border border-zinc-800/70 border-l-2 ${cn.borderActive} bg-zinc-900/30 px-5 py-4 transition-all duration-300 ${cn.glow}`}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <time
            className={`font-mono text-[10px] tracking-wider uppercase ${cn.accent}`}
            dateTime={entry.date}
          >
            {formatDate(entry.date)}
          </time>

          {/* Content type badge */}
          {entry.contentType && (
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-700 border border-zinc-800/60 rounded px-1.5 py-0.5">
              {contentTypeLabels[entry.contentType] ?? entry.contentType}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mt-2 font-serif text-base font-semibold text-zinc-100 group-hover:text-white transition-colors leading-snug">
          {entry.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400 transition-colors">
          {displayDescription}
        </p>

        {/* Expand toggle */}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className={`mt-1.5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${cn.accent} hover:text-zinc-300`}
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}

        {/* Tags (shown when expanded or entry is short) */}
        {(expanded || !isLong) && entry.tags && entry.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-800/80 bg-zinc-900/50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Link to content */}
        {entry.href && (
          <div className="mt-4 flex items-center gap-3">
            <Link
              href={entry.href}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${cn.linkColor}`}
            >
              View {entry.contentType ? contentTypeLabels[entry.contentType] : 'Content'}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
