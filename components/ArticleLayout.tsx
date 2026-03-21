'use client';

import React from 'react';
import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { Post } from '@/lib/posts';
import { TOCEntry } from '@/lib/toc';
import { formatDate, cn } from '@/lib/utils';
import CategoryBadge from '@/components/CategoryBadge';
import TableOfContents from '@/components/TableOfContents';
import DistractionFreeToggle from '@/components/DistractionFreeToggle';

type Props = {
  post: Post;
  toc: TOCEntry[];
  mdxContent: React.ReactNode;
};

export default function ArticleLayout({ post, toc, mdxContent }: Props) {
  const { isDistractionFree } = useDistractionFree();

  return (
    <div
      className={cn(
        'mx-auto px-6 py-16 transition-all duration-300',
        isDistractionFree ? 'max-w-[900px]' : 'max-w-screen-xl'
      )}
    >
      <div className={cn('relative flex gap-16', isDistractionFree && 'justify-center')}>
        {/* Main content */}
        <article
          className={cn(
            'min-w-0 transition-all duration-300',
            isDistractionFree ? 'w-full max-w-[900px] text-[1.0625rem]' : 'flex-1 max-w-prose'
          )}
        >
          {/* Article header */}
          <header className="relative mb-12 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-10">
            {/* Contextual Background Image */}
            <div 
              className="absolute inset-0 z-0 opacity-10 grayscale contrast-125"
              style={{ 
                backgroundImage: post.category === 'astrophysics' ? 'url("/images/astrophysics.jpg")' : 
                                 post.category === 'physics-math' ? 'url("/images/math-blueprint.jpg")' : 
                                 post.category === 'electronics' ? 'url("/images/electronics.jpg")' : 'url("/images/math-grid.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.5)'
              }}
            />
            
            <div className="relative z-10">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <CategoryBadge category={post.category} />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 bg-neutral-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-neutral-400 font-light max-w-2xl">{post.description}</p>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-neutral-800/50">
                <div className="flex items-center gap-4 font-mono text-xs text-neutral-500 uppercase tracking-widest">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="text-neutral-700">•</span>
                  <span>{post.readingTime}</span>
                </div>
                <DistractionFreeToggle />
              </div>
            </div>
          </header>

          {/* MDX content */}
          <div className="prose prose-neutral prose-invert max-w-none">
            {mdxContent}
          </div>
        </article>

        {/* Sticky TOC — hidden in distraction-free mode */}
        {!isDistractionFree && toc.length > 0 && (
          <aside className="hidden w-56 shrink-0 xl:block">
            <div className="sticky top-24">
              <TableOfContents entries={toc} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
