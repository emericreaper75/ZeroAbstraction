import { ScoredNode } from '@/lib/graph/types';
import RelatedNodeCard from './RelatedNodeCard';

interface ContentEcosystemViewProps {
  relatedNodes: ScoredNode[];
}

// Group nodes by type for editorial ordering
function groupByType(nodes: ScoredNode[]) {
  const posts    = nodes.filter((n) => n.node.type === 'post');
  const projects = nodes.filter((n) => n.node.type === 'project');
  const research = nodes.filter((n) => n.node.type === 'research');
  const timeline = nodes.filter((n) => n.node.type === 'timeline');
  return [...posts, ...projects, ...research, ...timeline];
}

export default function ContentEcosystemView({ relatedNodes }: ContentEcosystemViewProps) {
  if (!relatedNodes || relatedNodes.length === 0) return null;

  const ordered = groupByType(relatedNodes);
  const hasTimeline = relatedNodes.some((n) => n.node.type === 'timeline');

  return (
    <section className="mt-16 pt-10 border-t border-zinc-800/50" aria-label="Research connections">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-2">
            Connected Research
          </p>
          <h3 className="font-serif text-xl font-semibold text-zinc-100">
            Related Work
          </h3>
          <p className="mt-1.5 text-sm text-zinc-500 max-w-lg leading-relaxed">
            Articles, projects, and research logs connected by shared topics and domain context.
          </p>
        </div>

        {/* Timeline anchor link if timeline nodes are present */}
        {hasTimeline && (
          <a
            href="/timeline"
            className="font-mono text-[10px] uppercase tracking-widest text-zinc-600 hover:text-cyan-400 transition-colors shrink-0"
          >
            View research timeline →
          </a>
        )}
      </div>

      {/* Node grid — 2-col on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {ordered.map((scoredNode) => (
          <RelatedNodeCard key={scoredNode.node.id} scoredNode={scoredNode} />
        ))}
      </div>
    </section>
  );
}
