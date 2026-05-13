'use client';

import { useState } from 'react';
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
      <div className="mb-10 flex flex-wrap gap-2">
        {timelineCategories.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`rounded-md border px-3 py-1.5 font-mono text-xs transition-all ${
              active === value
                ? 'border-sky-700 bg-sky-950 text-sky-300'
                : 'border-neutral-700 bg-neutral-900 text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <StaggerContainer>
        {filtered.map((entry, i) => (
          <StaggerItem key={entry.id}>
            <TimelineItem
              entry={entry}
              isLast={i === filtered.length - 1}
            />
          </StaggerItem>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-neutral-500">No entries for this category.</p>
        )}
      </StaggerContainer>
    </>
  );
}
