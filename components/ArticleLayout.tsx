'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
import { Clock } from 'lucide-react';
import { FootnoteProvider } from '@/components/mdx/footnotes';
import type { GroupedRelationships } from '@/lib/editorial/presentation/orchestration';
import RelatedContent from '@/components/editorial/related-content';
import SeriesNavigation from '@/components/editorial/series-navigation';
import EngineeringContinuity from '@/components/editorial/engineering-continuity';
import MilestoneChain from '@/components/editorial/milestone-chain';
import { timelineEntries } from '@/lib/timeline';
import TagExplorer from '@/components/tag-explorer';

// Most-recent 2 timeline entries used as sidebar fallback (static — no runtime cost)
const recentTimelineEntries = timelineEntries.slice(0, 2);

type Props = {
  post: Post;
  toc: TOCNode[];
  abstract?: string;
  previewContent: React.ReactNode;
  remainingContent: React.ReactNode | null;
  relatedContent?: React.ReactNode;
  /** Optional timeline entries related to this post by tag/category matching */
  timelineEntries?: Array<{
    id: string;
    date: string;
    title: string;
    href?: string;
    contentType?: string;
  }>;
  /** Grouped relationships data from the editorial engine */
  groupedRelationships?: GroupedRelationships;
};

const categoryColors: Record<string, "cyan" | "violet" | "emerald" | "amber"> = {
  electronics: "cyan",
  astrophysics: "violet",
  'physics-math': "emerald",
  communications: "amber",
};

/** Lightweight fade-up for sequential sections — avoids expensive layout recalculations */
const EASE = [0.25, 0.1, 0.25, 1.0] as const;
const sectionReveal = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ArticleLayout({
  post,
  toc,
  abstract,
  previewContent,
  remainingContent,
  relatedContent,
  timelineEntries: relatedTimeline,
  groupedRelationships,
}: Props) {
  const { isDistractionFree } = useDistractionFree();
  const ambientColor = categoryColors[post.category] || "cyan";

  return (
    <div
      className={cn(
        'mx-auto px-4 sm:px-6 py-10 md:py-16 transition-all duration-500 ease-in-out',
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
        <div className="min-w-0 flex-1 max-w-[820px] w-full">
          {/* Hero */}
          <motion.header 
            {...sectionReveal}
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
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white">
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
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
            id="article-content"
            className={cn(
              'min-w-0 transition-all duration-500 relative overflow-visible',
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
              <Surface variant="glass" padding="md" className="mb-6">
                <h3 className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-3">Abstract</h3>
                <p className="text-zinc-300 text-lg leading-relaxed font-light">{abstract}</p>
              </Surface>
            )}

            {/* Tag explorer — topic navigation pills */}
            {!isDistractionFree && post.tags && post.tags.length > 0 && (
              <TagExplorer tags={post.tags} category={post.category} />
            )}

            {/* Wrap prose content in FootnoteProvider to collect inline <Footnote> registrations */}
            <FootnoteProvider>
              <div className={cn(
                "prose prose-invert prose-za prose-headings:scroll-mt-28 prose-p:text-zinc-300 prose-li:text-zinc-300 prose-strong:text-white prose-headings:text-white transition-all duration-500 mx-auto",
                isDistractionFree ? "max-w-none" : ""
              )}>
                {previewContent}

                {isDistractionFree && remainingContent && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                  >
                    {remainingContent}
                  </motion.div>
                )}
              </div>
            </FootnoteProvider>

            {!isDistractionFree && remainingContent && (
              <div className="relative h-48 -mt-24 bg-gradient-to-t from-base via-base/90 to-transparent flex flex-col items-center justify-end pb-4 z-10 pointer-events-none">
                <div className="pointer-events-auto">
                  <DistractionFreeToggle />
                </div>
              </div>
            )}
          </motion.article>

          {/* Related Content (Legacy injection) */}
          {relatedContent && (
             <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
               className="mt-20"
             >
               {relatedContent}
             </motion.div>
          )}

          {/* Editorial Grouped Relationships */}
          {groupedRelationships && (
             <motion.div
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
             >
               <RelatedContent relationships={groupedRelationships} />
             </motion.div>
          )}
        </div>

        {/* TOC Rail (Right Aligned) */}
        {toc.length > 0 && (
          <motion.aside 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="hidden lg:!block sticky top-28 w-[240px] shrink-0 self-start space-y-8"
          >
            <TableOfContents entries={toc} />

            {/* Timeline cross-references */}
            {relatedTimeline && relatedTimeline.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
                    Timeline
                  </p>
                  <Link
                    href={`/timeline#${relatedTimeline[0].id}`}
                    className="font-mono text-[10px] text-zinc-600 hover:text-cyan-400 transition-colors uppercase tracking-wider"
                  >
                    View all
                  </Link>
                </div>
                <div className="space-y-3">
                  {relatedTimeline.slice(0, 3).map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/timeline#${entry.id}`}
                      className="group block rounded-lg border border-zinc-800/50 bg-zinc-900/30 p-3 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all duration-200"
                    >
                      <p className="font-mono text-[9px] text-zinc-700 mb-1">
                        <Clock className="inline w-3 h-3 mr-1" aria-hidden="true" />
                        {new Date(entry.date).getFullYear()}
                        {entry.contentType && (
                          <span className="ml-2 text-zinc-800">{entry.contentType}</span>
                        )}
                      </p>
                      <p className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors leading-snug line-clamp-2">
                        {entry.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline chain — uses passed entries or falls back to 2 most-recent global entries */}
            {(!relatedTimeline || relatedTimeline.length === 0) ? (
              <MilestoneChain entries={recentTimelineEntries as any[]} heading="Research Timeline" />
            ) : null}

            {/* Reading continuity — next in series or related reads */}
            {groupedRelationships && groupedRelationships.nextInSeries && groupedRelationships.nextInSeries.entity.series && (
              <SeriesNavigation
                category={post.category}
                series={groupedRelationships.nextInSeries.entity.series}
                nextPost={groupedRelationships.nextInSeries}
              />
            )}
            
            {groupedRelationships && !groupedRelationships.nextInSeries && groupedRelationships.relatedArticles.length > 0 && (
              <EngineeringContinuity
                relatedArticles={groupedRelationships.relatedArticles}
              />
            )}
          </motion.aside>
        )}
      </div>
    </div>
  );
}