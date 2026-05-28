import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { TimelineEntry } from '@/lib/timeline';

interface Props {
  entries: TimelineEntry[];
  heading?: string;
}

export default function MilestoneChain({ entries, heading = "Timeline" }: Props) {
  if (!entries || entries.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
          {heading}
        </p>
        <Link
          href={`/timeline#${entries[0].id}`}
          className="font-mono text-[10px] text-zinc-600 hover:text-cyan-400 transition-colors uppercase tracking-wider"
        >
          View all
        </Link>
      </div>
      
      <div className="relative pl-3 space-y-4 before:absolute before:inset-y-2 before:left-[11px] before:w-[1px] before:bg-zinc-800/60">
        {entries.slice(0, 3).map((entry, idx) => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-[14px] top-1.5 w-1.5 h-1.5 rounded-full bg-zinc-700 ring-4 ring-zinc-950" />
            
            <Link
              href={`/timeline#${entry.id}`}
              className="group block pl-3 transition-all"
            >
              <p className="font-mono text-[9px] text-zinc-600 mb-1 flex items-center gap-1.5">
                <Clock className="w-2.5 h-2.5" aria-hidden="true" />
                {new Date(entry.date).getFullYear()}
                {entry.contentType && (
                  <span className="text-zinc-700">• {entry.contentType}</span>
                )}
              </p>
              <p className="text-xs text-zinc-400 group-hover:text-zinc-200 transition-colors leading-snug line-clamp-2">
                {entry.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
