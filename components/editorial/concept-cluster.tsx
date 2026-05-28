import React from 'react';
import Link from 'next/link';
import { Surface } from '@/components/ui/surface';
import { Network } from 'lucide-react';
import type { ConceptClusterGroup } from '@/lib/editorial/presentation/orchestration';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';
import type { ContentCategory } from '@prisma/client';

interface Props {
  clusters: ConceptClusterGroup[];
}

export default function ConceptCluster({ clusters }: Props) {
  return (
    <div className="space-y-6">
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
        <Network className="w-3 h-3" />
        Concept Clusters
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clusters.map((cluster) => (
          <Surface key={cluster.clusterName} variant="glass" padding="md" className="border-zinc-800/40 bg-zinc-900/20">
            <h4 className="font-mono text-xs text-cyan-400 mb-4 uppercase tracking-widest border-b border-zinc-800/50 pb-3 inline-block pr-6">
              {cluster.clusterName}
            </h4>
            
            <ul className="space-y-3">
              {cluster.items.map((candidate) => {
                const { entity } = candidate;
                const route = entity.type === 'project' ? 'projects' : entity.type === 'research' ? 'research' : CATEGORY_ENUM_TO_ROUTE[entity.category as ContentCategory] || 'blog';
                
                return (
                  <li key={entity.id}>
                    <Link href={`/${route}/${entity.slug}`} className="group flex items-baseline gap-2">
                      <span className="text-zinc-600 font-mono text-[10px] group-hover:text-cyan-500 transition-colors">
                        ↳
                      </span>
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        {entity.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Surface>
        ))}
      </div>
    </div>
  );
}
