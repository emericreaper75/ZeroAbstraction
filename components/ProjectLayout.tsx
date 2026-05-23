'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { cn } from '@/lib/utils';
import DistractionFreeToggle from '@/components/DistractionFreeToggle';
import TableOfContents from '@/components/TableOfContents';
import MobileTOC from '@/components/MobileTOC';
import { TOCNode } from '@/lib/toc';
import { Surface } from '@/components/ui/surface';
import { AmbientLight } from '@/components/backgrounds/ambient-light';
import { ArrowUpRight, Code2 } from 'lucide-react';

type Props = {
  project: {
    slug: string;
    title: string;
    description: string | null;
    tags: string[];
    githubUrl: string | null;
    liveUrl: string | null;
    featured: boolean;
  };
  toc: TOCNode[];
  abstract?: string;
  previewContent: React.ReactNode;
  remainingContent: React.ReactNode | null;
  relatedContent?: React.ReactNode;
};

/** Lightweight fade-up — avoids expensive layout recalculations */
const EASE = [0.25, 0.1, 0.25, 1.0] as const;
const sectionReveal = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export default function ProjectLayout({
  project,
  toc,
  abstract,
  previewContent,
  remainingContent,
  relatedContent,
}: Props) {
  const { isDistractionFree } = useDistractionFree();

  return (
    <div 
      className={cn(
        "mx-auto px-4 sm:px-6 py-16 transition-all duration-500 ease-in-out",
        isDistractionFree ? "max-w-[1400px]" : "max-w-[1200px]"
      )}
    >
      <div className={cn(
        "relative flex items-start justify-center gap-10 xl:gap-20 lg:!flex-row flex-col",
        isDistractionFree && "justify-center"
      )}>
        {/* Main Content */}
        <div className="min-w-0 flex-1 max-w-[820px] w-full">
          {/* Hero */}
          <motion.header 
            {...sectionReveal}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10 border border-zinc-800/50 bg-zinc-950/40"
          >
            {/* Background Systems */}
            <div className="absolute inset-0 z-0 opacity-40">
              <AmbientLight color="cyan" position="top" size="lg" opacity={0.15} />
            </div>

            <div className="relative z-10">
              {/* Tags */}
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-cyan-800 bg-cyan-950/40 text-cyan-400 px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider">
                  Project
                </span>

                {project.tags.map((tag) => (
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
                {project.title}
              </h1>

              {/* Description */}
              {project.description && (
                <p className="mt-4 max-w-2xl text-lg font-light leading-relaxed text-zinc-400">
                  {project.description}
                </p>
              )}

              {/* Meta */}
              <div className="mt-8 flex flex-col gap-6 border-t border-zinc-800/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-2 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-900/60"
                    >
                      <Code2 className="h-4 w-4" aria-hidden="true" />
                      GitHub
                      <ArrowUpRight className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/15"
                    >
                      Live
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <DistractionFreeToggle />
              </div>
            </div>
          </motion.header>

          <motion.article 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: EASE }}
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
                  transition={{ duration: 0.7, ease: EASE }}
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
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="mt-20"
            >
              {relatedContent}
            </motion.div>
          )}
        </div>

        {/* TOC Rail (Right Aligned) */}
        {toc.length > 0 && !isDistractionFree && (
          <motion.aside 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="hidden lg:!block sticky top-28 w-[240px] shrink-0 self-start space-y-8"
          >
            <TableOfContents entries={toc} />
          </motion.aside>
        )}
      </div>
    </div>
  );
}
