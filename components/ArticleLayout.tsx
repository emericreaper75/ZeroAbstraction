'use client';

import React from 'react';

import { useDistractionFree } from '@/components/DistractionFreeProvider';

import { Post } from '@/lib/posts';
import { TOCNode } from '@/lib/toc';

import { formatDate, cn } from '@/lib/utils';

import CategoryBadge from '@/components/CategoryBadge';
import TableOfContents from '@/components/TableOfContents';
import DistractionFreeToggle from '@/components/DistractionFreeToggle';
import ReadingProgressBar from '@/components/ReadingProgressBar';

type Props = {
  post: Post;
  toc: TOCNode[];
  mdxContent: React.ReactNode;
};

export default function ArticleLayout({
  post,
  toc,
  mdxContent,
}: Props) {
  const { isDistractionFree } =
    useDistractionFree();

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 py-16 transition-all duration-300',
        isDistractionFree
          ? 'max-w-[960px]'
          : 'max-w-[1400px]'
      )}
    >
      {!isDistractionFree && (
        <ReadingProgressBar
          targetId="article-content"
          className="top-16"
        />
      )}

      <div
        className={cn(
          'relative flex items-start justify-center gap-10 xl:gap-20 overflow-hidden',
          isDistractionFree &&
            'justify-center'
        )}
      >
        {/* Main Content */}
        <div className="min-w-0 flex-1 max-w-[820px]">
          {/* Hero */}
          <header className="glass-panel relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10">
            {/* Background */}
            <div
              className="absolute inset-0 z-0 opacity-10 grayscale contrast-125"
              style={{
                backgroundImage:
                  post.category ===
                  'astrophysics'
                    ? 'url("/images/astrophysics.jpg")'
                    : post.category ===
                      'physics-math'
                    ? 'url("/images/math-blueprint.jpg")'
                    : post.category ===
                      'electronics'
                    ? 'url("/images/electronics.jpg")'
                    : 'url("/images/math-grid.jpg")',
                backgroundSize: 'cover',
                backgroundPosition:
                  'center',
                filter:
                  'brightness(0.5)',
              }}
            />

            <div className="relative z-10">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <CategoryBadge
                  category={
                    post.category
                  }
                />

                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-700 bg-neutral-950/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500 backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                {post.title}
              </h1>

              {/* Description */}
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-neutral-400">
                {post.description}
              </p>

              {/* Meta */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-neutral-800/50 pt-6">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-neutral-500">
                  <time
                    dateTime={post.date}
                  >
                    {formatDate(
                      post.date
                    )}
                  </time>

                  <span className="text-neutral-700">
                    •
                  </span>

                  <span>
                    {post.readingTime}
                  </span>
                </div>

                <DistractionFreeToggle />
              </div>
            </div>
          </header>

          {/* Article */}
          <article
            id="article-content"
            className={cn(
              'min-w-0 pt-24 transition-all duration-300',
              isDistractionFree
                ? 'text-[1.0625rem]'
                : ''
            )}
          >
            <div className="prose prose-invert prose-lg max-w-none prose-headings:scroll-mt-28 prose-p:text-neutral-300 prose-p:leading-8 prose-li:text-neutral-300 prose-strong:text-white prose-headings:text-white">
              {mdxContent}
            </div>
          </article>
        </div>

        {/* TOC Rail */}
        {!isDistractionFree &&
          toc.length > 0 && (
            <aside className="sticky top-28 w-[220px] shrink-0">
              <TableOfContents
                entries={toc}
              />
            </aside>
          )}
      </div>
    </div>
  );
}