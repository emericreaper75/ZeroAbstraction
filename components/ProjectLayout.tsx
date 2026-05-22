'use client';

import React from 'react';
import { useDistractionFree } from '@/components/DistractionFreeProvider';
import { cn } from '@/lib/utils';
import DistractionFreeToggle from '@/components/DistractionFreeToggle';
import TableOfContents from '@/components/TableOfContents';
import { TOCNode } from '@/lib/toc';

type Props = {
  project: {
    slug: string;
    featured: boolean;
  };
  toc: TOCNode[];
  abstract?: string;
  previewContent: React.ReactNode;
  remainingContent: React.ReactNode | null;
  relatedContent?: React.ReactNode;
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
    <main className={cn(
      "mx-auto px-6 py-14 transition-all duration-300",
      isDistractionFree ? "max-w-[1400px]" : "max-w-screen-xl"
    )}>
      <div className={cn(
        "flex flex-col gap-12 items-start",
        isDistractionFree ? "lg:flex-row justify-center" : "lg:flex-row justify-between"
      )}>
        {/* TOC sidebar on the left */}
        {toc.length > 0 && isDistractionFree && (
          <aside className="sticky top-28 hidden lg:block w-[220px] shrink-0 self-start">
            <TableOfContents entries={toc} />
          </aside>
        )}

        <article className="min-w-0 flex-1 max-w-[820px] relative">
          {/* Abstract */}
          {abstract && !isDistractionFree && (
            <div className="mb-8 p-6 rounded-xl bg-neutral-900/50 border border-neutral-800">
              <h3 className="text-neutral-400 font-mono text-xs uppercase tracking-widest mb-3">Abstract</h3>
              <p className="text-neutral-200 text-lg leading-relaxed">{abstract}</p>
            </div>
          )}

          <div className={cn(
            "prose prose-neutral prose-invert prose-headings:scroll-mt-28 transition-all duration-500",
            isDistractionFree ? "max-w-none" : "max-w-[720px]"
          )}>
            {previewContent}

            {isDistractionFree && remainingContent && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-700 mt-6">
                {remainingContent}
              </div>
            )}
          </div>

          {!isDistractionFree && remainingContent && (
            <div className="relative h-48 -mt-24 bg-gradient-to-t from-neutral-950 via-neutral-950/90 to-transparent flex flex-col items-center justify-end pb-4 z-10 pointer-events-none">
              <div className="pointer-events-auto">
                <DistractionFreeToggle />
              </div>
            </div>
          )}
        </article>

        {/* Side metadata panel */}
        {!isDistractionFree && (
          <aside className="hidden xl:block w-[320px] shrink-0">
            <div className="sticky top-28 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <div className="flex justify-between items-center mb-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                  Metadata
                </p>
                {remainingContent && <DistractionFreeToggle />}
              </div>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-500">Slug</dt>
                  <dd className="font-mono text-neutral-200">{project.slug}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Featured</dt>
                  <dd className="text-neutral-200">{project.featured ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>
          </aside>
        )}
      </div>

      {relatedContent && (
        <div className="mt-20">
          {relatedContent}
        </div>
      )}
    </main>
  );
}
