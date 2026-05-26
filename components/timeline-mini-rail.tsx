import React from 'react';
import Link from 'next/link';
import { TimelineEntry } from '@/lib/timeline';

// ─── Category dot colours ─────────────────────────────────────────────────────

const categoryDotColor: Record<string, string> = {
  electronics:    'bg-cyan-400',
  astrophysics:   'bg-violet-400',
  'physics-math': 'bg-emerald-400',
  research:       'bg-amber-400',
  academic:       'bg-zinc-500',
};

interface TimelineMiniRailProps {
  entries: TimelineEntry[];
  /** Optional heading override */
  heading?: string;
}

/**
 * Compact timeline mini-rail for embedding in project and article sidebars.
 * Shows up to 3 milestone entries with category dot + year + title,
 * each linked to the full timeline page at the specific entry anchor.
 *
 * SSR-only — no client hooks, no hydration cost.
 */
export default function TimelineMiniRail({
  entries,
  heading = 'Research Timeline',
}: TimelineMiniRailProps) {
  if (!entries || entries.length === 0) return null;

  const visible = entries.slice(0, 3);

  return (
    <div role="complementary" aria-label="Related research timeline">
      {/* Heading */}
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500 mb-4">
        {heading}
      </p>

      {/* Entries */}
      <div className="space-y-3">
        {visible.map((entry) => {
          const year = entry.date.split('-')[0];
          const dotClass = categoryDotColor[entry.category] ?? 'bg-zinc-600';
          const anchor = `/timeline#${entry.id}`;

          return (
            <div key={entry.id} className="group flex gap-3 items-start">
              {/* Category dot */}
              <div className="mt-1.5 shrink-0 flex flex-col items-center">
                <span
                  className={`w-2 h-2 rounded-full ${dotClass} opacity-70 group-hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <p className="font-mono text-[9px] text-zinc-700 mb-0.5 tabular-nums">
                  {year}
                </p>
                {entry.href ? (
                  <Link
                    href={anchor}
                    className="text-xs text-zinc-500 hover:text-zinc-200 transition-colors leading-snug line-clamp-2"
                  >
                    {entry.title}
                  </Link>
                ) : (
                  <p className="text-xs text-zinc-600 leading-snug line-clamp-2">
                    {entry.title}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer link */}
      <Link
        href="/timeline"
        className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-cyan-400 transition-colors"
      >
        Research timeline <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
