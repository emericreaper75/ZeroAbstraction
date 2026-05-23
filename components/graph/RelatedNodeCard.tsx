import Link from 'next/link';
import { ScoredNode } from '@/lib/graph/types';
import { ArrowUpRight, BookOpen, Clock, Code2, FileText, Network } from 'lucide-react';

interface RelatedNodeCardProps {
  scoredNode: ScoredNode;
}

export default function RelatedNodeCard({ scoredNode }: RelatedNodeCardProps) {
  const { node, reasons } = scoredNode;

  const getIcon = () => {
    switch (node.type) {
      case 'post':
        return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'project':
        return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'research':
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'timeline':
        return <Clock className="w-4 h-4 text-fuchsia-400" />;
      default:
        return <Network className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getLabel = () => {
    switch (node.type) {
      case 'post': return 'Article';
      case 'project': return 'Project';
      case 'research': return 'Research Log';
      case 'timeline': return 'Timeline Event';
      default: return 'Content';
    }
  };

  return (
    <Link href={node.url} className="block group">
      <div className="h-full flex flex-col justify-between p-5 rounded-xl border border-neutral-800 bg-neutral-900/30 hover:bg-neutral-800/50 transition-colors duration-300">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {getIcon()}
            <span className="text-xs font-medium tracking-wide text-neutral-400 uppercase">
              {getLabel()}
            </span>
          </div>
          
          <h4 className="text-base font-semibold text-neutral-200 group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
            {node.title}
          </h4>
          
          <p className="text-sm text-neutral-500 line-clamp-3 mb-4">
            {node.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-800/50">
          <div className="flex flex-wrap gap-1">
            {reasons.slice(0, 2).map((r, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded bg-neutral-800/80 text-neutral-400">
                {r}
              </span>
            ))}
          </div>
          <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-amber-400 transition-colors" />
        </div>
      </div>
    </Link>
  );
}
