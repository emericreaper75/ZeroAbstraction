import React from 'react';
import Link from 'next/link';
import type { SimilarityCandidate } from '@/lib/editorial/relationships/types';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';
import type { ContentCategory } from '@prisma/client';

interface Props {
  relatedSlugs?: Array<{
    title: string;
    href: string;
  }>;
  relatedArticles?: SimilarityCandidate[];
}

export default function EngineeringContinuity({ relatedSlugs, relatedArticles }: Props) {
  // Prefer typed entities if passed
  const items = relatedArticles 
    ? relatedArticles.slice(0, 2).map(c => ({
        title: c.entity.title,
        href: `/${c.entity.type === 'research' ? 'research' : CATEGORY_ENUM_TO_ROUTE[c.entity.category as ContentCategory] || 'blog'}/${c.entity.slug}`
      }))
    : relatedSlugs?.slice(0, 2) || [];

  if (items.length === 0) return null;

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-3">
        Contextual Reading
      </p>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group block rounded-lg border border-zinc-800/50 bg-zinc-900/20 p-2.5 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/40"
          >
            <p className="text-xs text-zinc-400 leading-snug group-hover:text-zinc-200 transition-colors line-clamp-2">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
