import { ScoredNode } from '@/lib/graph/types';
import RelatedNodeCard from './RelatedNodeCard';

interface ContentEcosystemViewProps {
  relatedNodes: ScoredNode[];
}

export default function ContentEcosystemView({ relatedNodes }: ContentEcosystemViewProps) {
  if (!relatedNodes || relatedNodes.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-12 border-t border-neutral-800">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold tracking-tight text-neutral-100">
          Knowledge Graph
        </h3>
        <p className="text-neutral-500 mt-2 text-sm max-w-2xl">
          Explore interconnected research, projects, and events related to this content. 
          Connections are established automatically based on contextual similarity.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {relatedNodes.map((scoredNode) => (
          <RelatedNodeCard key={scoredNode.node.id} scoredNode={scoredNode} />
        ))}
      </div>
    </section>
  );
}
