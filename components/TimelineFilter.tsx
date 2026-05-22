'use client';

import React, { useState } from 'react';
import { timelineCategories, timelineEntries } from '@/lib/timeline';
import TimelineItem from '@/components/TimelineItem';
import { StaggerContainer, StaggerItem } from '@/components/animations/fade-in';

export default function TimelineFilter() {
  const [active, setActive] = useState<string>('all');

  const filtered = active === 'all'
    ? timelineEntries
    : timelineEntries.filter((e) => e.category === active);

  return (
    <>
      <div className="timeline-legend flex flex-wrap gap-4 text-[10px] uppercase tracking-wider font-mono text-zinc-500 mb-6">
        {timelineCategories.filter(c => c.value !== 'all').map(cat => (
          <span key={cat.value} className="legend-item flex items-center gap-1.5">
            <span className="legend-dot w-2 h-2 rounded-full" style={{ background: `var(--color-cat-${cat.value}, #71717a)` }} />
            <span className="legend-label">{cat.label}</span>
          </span>
        ))}
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {timelineCategories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`timeline-filter-btn rounded-md border px-3 py-1.5 font-mono text-xs transition-all ${
              active !== value
                ? 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
                : ''
            }`}
            data-active={active === value}
          >
            {label}
          </button>
        ))}
      </div>

      <StaggerContainer className="timeline-track">
        {filtered.map((entry, i) => {
          const currentYear = entry.date.split('-')[0];
          const previousYear = i > 0 ? filtered[i-1].date.split('-')[0] : null;
          const showYearSeparator = previousYear && currentYear !== previousYear;
          return (
            <React.Fragment key={entry.id}>
              {showYearSeparator && (
                <div className="timeline-year-separator flex items-center justify-center my-8 relative z-10">
                  <div className="flex-1 h-px bg-zinc-800" />
                  <span className="year-label mx-4 text-sm font-mono text-zinc-500">{currentYear}</span>
                  <div className="flex-1 h-px bg-zinc-800" />
                </div>
              )}
              <StaggerItem>
                <TimelineItem
                  entry={entry}
                  isLast={i === filtered.length - 1}
                />
              </StaggerItem>
            </React.Fragment>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-500">No entries for this category.</p>
        )}
      </StaggerContainer>
    </>
  );
}
