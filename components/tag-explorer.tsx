import React from 'react';
import Link from 'next/link';
import { Hash } from 'lucide-react';

// ─── Category accent mapping ──────────────────────────────────────────────────

const categoryAccent: Record<string, string> = {
  electronics:    'hover:border-cyan-500/40 hover:text-cyan-400 hover:bg-cyan-500/5',
  astrophysics:   'hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/5',
  'physics-math': 'hover:border-emerald-500/40 hover:text-emerald-400 hover:bg-emerald-500/5',
  communications: 'hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5',
  research:       'hover:border-amber-500/40 hover:text-amber-400 hover:bg-amber-500/5',
};

const defaultAccent = 'hover:border-zinc-600/60 hover:text-zinc-300 hover:bg-zinc-800/40';

// ─── Matching tags to blog categories (SSR-safe, URL-based) ──────────────────
// Tags that map exactly to a category route key link to /[category] instead of /blog?q=
const CATEGORY_ROUTE_TAGS: Record<string, string> = {
  electronics:    '/electronics',
  astrophysics:   '/astrophysics',
  physics:        '/physics-math',
  mathematics:    '/physics-math',
  'physics-math': '/physics-math',
  communications: '/communications',
  research:       '/research',
};

interface TagExplorerProps {
  tags: string[];
  /** Category of the parent article — used for accent colour */
  category?: string;
}

/**
 * Clickable topic pill navigation bar.
 * Tags link to the global search or matching category pages.
 * Supports keyboard navigation; uses aria-label for screen readers.
 */
export default function TagExplorer({ tags, category }: TagExplorerProps) {
  if (!tags || tags.length === 0) return null;

  const accent = category ? (categoryAccent[category] ?? defaultAccent) : defaultAccent;

  return (
    <nav
      aria-label="Browse by topic"
      className="mt-4 mb-8"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-1.5">
        <Hash className="w-3 h-3" aria-hidden="true" />
        Topics
      </p>

      <div className="flex flex-wrap gap-2" role="list">
        {tags.map((tag) => {
          const href = CATEGORY_ROUTE_TAGS[tag.toLowerCase()]
            ? CATEGORY_ROUTE_TAGS[tag.toLowerCase()]
            : `/blog?category=${encodeURIComponent(tag)}`;

          return (
            <Link
              key={tag}
              href={href}
              role="listitem"
              className={`inline-block rounded-full border border-zinc-800/80 bg-zinc-900/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-500 transition-all duration-150 ${accent}`}
              title={`Browse articles tagged "${tag}"`}
            >
              {tag}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
