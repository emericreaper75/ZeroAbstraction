'use client';

import React, { useState, useMemo, useId } from 'react';
import { Search, X } from 'lucide-react';
import { timelineCategories, TimelineEntry } from '@/lib/timeline';
import TimelineItem from '@/components/TimelineItem';
import TimelineYearMilestone from '@/components/timeline-connection';
import { StaggerContainer, StaggerItem } from '@/components/animations/fade-in';

// ─── Category dot colours matching design system tokens ──────────────────────
const categoryColors: Record<string, string> = {
  electronics:    'var(--color-cat-electronics, #22d3ee)',
  astrophysics:   'var(--color-cat-astrophysics, #a78bfa)',
  'physics-math': 'var(--color-cat-physics-math, #34d399)',
  research:       'var(--color-cat-research, #fbbf24)',
  academic:       '#71717a',
};

interface TimelineFilterProps {
  /** Pre-validated entries from the Server Component — hrefs guaranteed to resolve. */
  entries: TimelineEntry[];
}

export default function TimelineFilter({ entries }: TimelineFilterProps) {
  const searchId = useId();
  const [active, setActive] = useState<string>('all');
  const [query, setQuery] = useState<string>('');

  // Per-category entry counts for badge display
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: entries.length };
    for (const e of entries) {
      counts[e.category] = (counts[e.category] ?? 0) + 1;
    }
    return counts;
  }, [entries]);

  // Filter by category then by search query
  const filtered = useMemo(() => {
    let result = active === 'all'
      ? entries
      : entries.filter((e) => e.category === active);

    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          (e.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }

    return result;
  }, [active, query, entries]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setQuery('');
  };

  return (
    <>
      {/* ── Legend ──────────────────────────────────────────────────── */}
      <div
        className="timeline-legend flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-mono text-zinc-500 mb-6"
        role="list"
        aria-label="Domain legend"
      >
        {timelineCategories.filter((c) => c.value !== 'all').map((cat) => (
          <span key={cat.value} className="legend-item flex items-center gap-1.5" role="listitem">
            <span
              className="legend-dot w-2 h-2 rounded-full"
              style={{ background: categoryColors[cat.value] ?? '#71717a' }}
              aria-hidden="true"
            />
            <span className="legend-label">{cat.label}</span>
          </span>
        ))}
      </div>

      {/* ── Filter + Search Row ──────────────────────────────────────── */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
          {timelineCategories.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActive(value)}
              className={`timeline-filter-btn inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-all ${
                active !== value
                  ? 'border-zinc-800 bg-zinc-900/50 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                  : ''
              }`}
              data-active={active === value}
              aria-pressed={active === value}
            >
              {label}
              {/* Entry count badge */}
              {categoryCounts[value] !== undefined && (
                <span
                  className={`rounded px-1 py-px text-[9px] tabular-nums ${
                    active === value
                      ? 'bg-cyan-500/15 text-cyan-400'
                      : 'bg-zinc-800/80 text-zinc-600'
                  }`}
                >
                  {categoryCounts[value]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Inline search */}
        <div className="relative flex items-center">
          <label htmlFor={searchId} className="sr-only">
            Search timeline entries
          </label>
          <Search
            className="pointer-events-none absolute left-3 w-3.5 h-3.5 text-zinc-600"
            aria-hidden="true"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search milestones…"
            className="w-full sm:w-52 rounded-md border border-zinc-800 bg-zinc-900/50 pl-8 pr-8 py-1.5 font-mono text-xs text-zinc-300 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none transition-colors"
            aria-label="Search timeline milestones"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 text-zinc-600 hover:text-zinc-400 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── Results ─────────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Search className="w-8 h-8 text-zinc-700" aria-hidden="true" />
          <p className="text-sm text-zinc-500 font-mono">No milestones match this filter.</p>
          <button
            type="button"
            onClick={() => { setActive('all'); setQuery(''); }}
            className="text-xs text-cyan-500 hover:text-cyan-400 font-mono transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <StaggerContainer className="timeline-track">
          {filtered.map((entry, i) => {
            const currentYear = entry.date.split('-')[0];
            const previousYear = i > 0 ? filtered[i - 1].date.split('-')[0] : null;
            const showYearSeparator = !previousYear || currentYear !== previousYear;

            // Count entries per year for milestone display
            const yearEntries = filtered.filter((e) => e.date.startsWith(currentYear));
            const domainColors = Array.from(new Set(yearEntries.map((e) => categoryColors[e.category] ?? '#71717a')));

            return (
              <React.Fragment key={entry.id}>
                {showYearSeparator && (
                  <TimelineYearMilestone
                    year={currentYear}
                    entryCount={yearEntries.length}
                    domainColors={domainColors}
                  />
                )}
                <StaggerItem>
                  <TimelineItem entry={entry} />
                </StaggerItem>
              </React.Fragment>
            );
          })}
        </StaggerContainer>
      )}
    </>
  );
}
