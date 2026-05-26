import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ReadingContinuityProps {
  /** Category of the current post, used for accent colour */
  category?: string;
  /** Series name if the article belongs to one */
  series?: string;
  /** Next article slug and title */
  nextPost?: {
    title: string;
    slug: string;
    category: string;
    readingTime?: string;
    description?: string;
  };
  /** Related articles from the same category (fallback if no series) */
  relatedSlugs?: Array<{
    title: string;
    href: string;
    readingTime?: string;
  }>;
}

const categoryAccent: Record<string, string> = {
  electronics:    'border-cyan-500/30 text-cyan-400',
  astrophysics:   'border-violet-500/30 text-violet-400',
  'physics-math': 'border-emerald-500/30 text-emerald-400',
  communications: 'border-amber-500/30 text-amber-400',
};

/**
 * Reading continuity panel — placed in the TOC sidebar rail.
 * Shows the next post in a series or suggests contextual next reads.
 */
export default function ReadingContinuity({
  category,
  series,
  nextPost,
  relatedSlugs,
}: ReadingContinuityProps) {
  const hasNext = !!nextPost;
  const hasRelated = relatedSlugs && relatedSlugs.length > 0;

  if (!hasNext && !hasRelated) return null;

  const accentClass = category ? (categoryAccent[category] ?? 'border-zinc-700 text-zinc-400') : 'border-zinc-700 text-zinc-400';

  return (
    <div className="space-y-6">
      {/* Series badge */}
      {series && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
            Series
          </p>
          <span className={cn('inline-block font-mono text-[11px] border rounded px-2 py-0.5', accentClass)}>
            {series}
          </span>
        </div>
      )}

      {/* Next in series / next read */}
      {hasNext && nextPost && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
            {series ? 'Next in Series' : 'Continue Reading'}
          </p>
          <Link
            href={`/${nextPost.category}/${nextPost.slug}`}
            className="group block rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-3 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/50"
          >
            <p className="text-xs text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors duration-200 line-clamp-3">
              {nextPost.title}
            </p>
            {nextPost.readingTime && (
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
                {nextPost.readingTime}
              </p>
            )}
            {/* Arrow */}
            <div className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-zinc-600 group-hover:text-cyan-400 transition-colors duration-200">
              <span>Next</span>
              <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
            </div>
          </Link>
        </div>
      )}

      {/* Related reads (fallback) */}
      {!hasNext && hasRelated && relatedSlugs && (
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
            Related Reading
          </p>
          <div className="space-y-2">
            {relatedSlugs.slice(0, 2).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group block rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-2.5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/40"
              >
                <p className="text-xs text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors line-clamp-2">
                  {item.title}
                </p>
                {item.readingTime && (
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-zinc-600">
                    {item.readingTime}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
