import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { SimilarityCandidate } from '@/lib/editorial/relationships/types';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';
import type { ContentCategory } from '@prisma/client';

interface Props {
  series: string;
  nextPost?: SimilarityCandidate;
  category?: string;
}

const categoryAccent: Record<string, string> = {
  electronics: 'border-cyan-500/30 text-cyan-400',
  astrophysics: 'border-violet-500/30 text-violet-400',
  'physics-math': 'border-emerald-500/30 text-emerald-400',
  communications: 'border-amber-500/30 text-amber-400',
};

export default function SeriesNavigation({ series, nextPost, category }: Props) {
  const accentClass = category ? (categoryAccent[category] ?? 'border-zinc-700 text-zinc-400') : 'border-zinc-700 text-zinc-400';

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
          Series
        </p>
        <span className={cn('inline-block font-mono text-[11px] border rounded px-2 py-0.5', accentClass)}>
          {series}
        </span>
      </div>

      {nextPost && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
            Next in Series
          </p>
          <Link
            href={`/${CATEGORY_ENUM_TO_ROUTE[nextPost.entity.category as ContentCategory] || 'blog'}/${nextPost.entity.slug}`}
            className="group block rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/50"
          >
            <p className="text-xs text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors duration-200 line-clamp-3">
              {nextPost.entity.title}
            </p>
            <div className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400 transition-colors duration-200">
              <span>Next</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
