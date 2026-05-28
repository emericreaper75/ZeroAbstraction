import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/surface';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';
import type { GroupedRelationships } from '@/lib/editorial/presentation/orchestration';
import ConceptCluster from './concept-cluster';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';
import type { ContentCategory } from '@prisma/client';

interface Props {
  relationships: GroupedRelationships;
}

export default function RelatedContent({ relationships }: Props) {
  const { relatedProjects, relatedArticles, conceptClusters } = relationships;

  if (relatedProjects.length === 0 && relatedArticles.length === 0 && conceptClusters.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16 border-t border-zinc-800/50 pt-16 mt-16">
      <div className="flex items-center gap-3">
        <h2 className="font-serif text-2xl text-white font-medium">Continue Exploring</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Projects Column */}
        {relatedProjects.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <Layers className="w-3 h-3" />
              Related Engineering
            </h3>
            <div className="space-y-4">
              {relatedProjects.map((candidate) => {
                const { entity, matchedFactors } = candidate;
                return (
                  <Link
                    key={entity.id}
                    href={`/projects/${entity.slug}`}
                    className="block group"
                  >
                    <Surface variant="glass" padding="md" className="transition-all hover:bg-zinc-900/60 border-zinc-800/30 hover:border-zinc-700/50">
                      <h4 className="font-serif text-lg text-zinc-200 group-hover:text-cyan-400 transition-colors">
                        {entity.title}
                      </h4>
                      <p className="mt-2 text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                        {entity.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {matchedFactors.slice(0, 2).map((factor, idx) => (
                          <span key={idx} className="text-[9px] font-mono uppercase tracking-wider text-zinc-600">
                            {factor.replace('tag:', '').replace('tech:', '')}
                          </span>
                        ))}
                      </div>
                    </Surface>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Articles Column */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              Further Reading
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((candidate) => {
                const { entity } = candidate;
                const route = entity.type === 'research' ? 'research' : CATEGORY_ENUM_TO_ROUTE[entity.category as ContentCategory] || 'blog';
                return (
                  <Link
                    key={entity.id}
                    href={`/${route}/${entity.slug}`}
                    className="block group"
                  >
                    <Surface variant="glass" padding="none" className="transition-all bg-transparent border-none">
                      <div className="flex items-start justify-between gap-4 py-3 border-b border-zinc-800/30 group-hover:border-zinc-600/50">
                        <div>
                          <h4 className="font-serif text-[1.05rem] text-zinc-300 group-hover:text-white transition-colors">
                            {entity.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-zinc-500">
                            <span className="capitalize">{entity.type}</span>
                            <span className="text-zinc-700">•</span>
                            <span className="uppercase font-mono text-[9px] tracking-wider">{entity.category}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-1" />
                      </div>
                    </Surface>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Concept Clusters */}
      {conceptClusters.length > 0 && (
        <div className="pt-8">
          <ConceptCluster clusters={conceptClusters} />
        </div>
      )}
    </div>
  );
}
