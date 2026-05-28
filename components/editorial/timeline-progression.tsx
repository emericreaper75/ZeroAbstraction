// components/editorial/timeline-progression.tsx
import React from 'react';
import type { TimelineEntry } from '@/lib/timeline';
import Link from 'next/link';

interface Props {
  previous?: TimelineEntry;
  next?: TimelineEntry;
}

export default function TimelineProgression({ previous, next }: Props) {
  if (!previous && !next) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between border-t border-zinc-800/50 pt-8 mt-12">
      {previous ? (
        <Link href={`/timeline#${previous.id}`} className="flex-1 group">
          <p className="font-mono text-[10px] uppercase text-zinc-500 mb-1">Previous Milestone</p>
          <p className="text-sm text-zinc-400 group-hover:text-cyan-400 transition-colors line-clamp-1">{previous.title}</p>
        </Link>
      ) : <div className="flex-1" />}
      
      {next && (
        <Link href={`/timeline#${next.id}`} className="flex-1 sm:text-right group">
          <p className="font-mono text-[10px] uppercase text-zinc-500 mb-1">Next Milestone</p>
          <p className="text-sm text-zinc-400 group-hover:text-cyan-400 transition-colors line-clamp-1">{next.title}</p>
        </Link>
      )}
    </div>
  );
}
