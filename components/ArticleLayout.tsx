'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { Post } from '@/lib/posts';
import { TOCNode } from '@/lib/toc';
import { formatDate, cn } from '@/lib/utils';

import CategoryBadge from '@/components/CategoryBadge';
import TableOfContents from '@/components/TableOfContents';
import DistractionFreeToggle from '@/components/DistractionFreeToggle';
import MobileTOC from '@/components/MobileTOC';
import { AmbientLight } from '@/components/backgrounds/ambient-light';
import { Surface } from '@/components/ui/surface';
import { staggerContainer, fadeUpVariant } from '@/lib/design/motion';

type Props = {
  post: Post;
  toc: TOCNode[];
  abstract?: string;
  previewContent: React.ReactNode;
  remainingContent: React.ReactNode | null;
  relatedContent?: React.ReactNode;
};

const categoryColors: Record<string, "cyan" | "violet" | "emerald" | "amber"> = {
  electronics: "cyan",
  astrophysics: "violet",
  'physics-math': "emerald",
  communications: "amber",
};

export default function ArticleLayout({
  post,
  toc,
  abstract,
  previewContent,
  remainingContent,
  relatedContent,
}: Props) {
  const { isDistractionFree } = useDistractionFree();
  const ambientColor = categoryColors[post.category] || "cyan";

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 py-16 transition-all duration-500 ease-in-out',
        isDistractionFree ? 'max-w-[1400px]' : 'max-w-[1200px]'
      )}
    >
      <div
        className={cn(
          'relative flex items-start justify-center gap-10 xl:gap-20 lg:!flex-row flex-col',
          isDistractionFree && 'justify-center'
        )}
      >
        {/* Main Content */}
        <motion.div 
          layout
          className="min-w-0 flex-1 max-w-[820px] w-full"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Hero */}
          <motion.header 
            layout
            variants={fadeUpVariant}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10 border border-zinc-800/50 bg-zinc-950/40"
          >
            {/* Background Systems */}
            <div className="absolute inset-0 z-0 opacity-40">
              <AmbientLight color={ambientColor} position="top" size="lg" opacity={0.15} />
            </div>

            <div className="relative z-10">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <CategoryBadge category={post.category} />

                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 backdrop-blur-sm"
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
              <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-zinc-400">
                {post.description}
              </p>

              {/* Meta */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-800/50 pt-6">
                <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
                  <time dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>
                  <span className="text-zinc-700">•</span>
                  <span>{post.readingTime}</span>
                </div>

                <DistractionFreeToggle />
              </div>
            </div>
          </motion.header>

          {/* Article */}
          <motion.article
            layout
            variants={fadeUpVariant}
            id="article-content"
            className={cn(
              'min-w-0 transition-all duration-500 relative',
              isDistractionFree ? 'pt-24 text-[1.0625rem]' : 'pt-16'
            )}
          >
            {/* Mobile TOC for smaller devices */}
            {toc.length > 0 && (
              <div className="mb-8 lg:hidden">
                <MobileTOC toc={toc} />
              </div>
            )}

            {/* Abstract */}
            {abstract && !isDistractionFree && (
              <Surface variant="glass" padding="md" className="mb-10">
                <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-3">Abstract</h3>
                <p className="text-zinc-300 text-lg leading-relaxed font-light">{abstract}</p>
              </Surface>
            )}

            <div className={cn(
              "prose prose-invert prose-za prose-headings:scroll-mt-28 prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white prose-headings:text-white transition-all duration-500 mx-auto",
              isDistractionFree ? "max-w-none" : ""
            )}>
              {previewContent}

              {isDistractionFree && remainingContent && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  {remainingContent}
                </motion.div>
              )}
            </div>

            {!isDistractionFree && remainingContent && (
              <div className="relative h-48 -mt-24 bg-gradient-to-t from-base via-base/90 to-transparent flex flex-col items-center justify-end pb-4 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                  <DistractionFreeToggle />
                </div>
              </div>
            )}
          </motion.article>

          {/* Related Content */}
          {relatedContent && (
             <motion.div layout variants={fadeUpVariant} className="mt-20">
               {relatedContent}
             </motion.div>
          )}
        </motion.div>

        {/* TOC Rail (Right Aligned) */}
        {toc.length > 0 && (
          <motion.aside 
            layout 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="hidden lg:!block sticky top-28 w-[240px] shrink-0 self-start"
          >
            <TableOfContents entries={toc} />
          </motion.aside>
        )}
      </div>
    </div>
  );
}