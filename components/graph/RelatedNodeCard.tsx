import Link from 'next/link';
import { ScoredNode } from '@/lib/graph/types';
import { ArrowRight, BookOpen, Code2, FileText, Clock } from 'lucide-react';

interface RelatedNodeCardProps {
  scoredNode: ScoredNode;
}

// ─── Category-aware accent colours ───────────────────────────────────────────

const categoryAccentBorder: Record<string, string> = {
  electronics:    'border-l-cyan-500/40',
  astrophysics:   'border-l-violet-500/40',
  'physics-math': 'border-l-emerald-500/40',
  research:       'border-l-amber-500/40',
  project:        'border-l-sky-500/40',
  communications: 'border-l-blue-500/40',
};

const categoryAccentText: Record<string, string> = {
  electronics:    'text-cyan-400',
  astrophysics:   'text-violet-400',
  'physics-math': 'text-emerald-400',
  research:       'text-amber-400',
  project:        'text-sky-400',
  communications: 'text-blue-400',
};

// ─── Node type config ─────────────────────────────────────────────────────────

function getTypeIcon(type: string) {
  switch (type) {
    case 'post':     return <FileText className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />;
    case 'project':  return <Code2    className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />;
    case 'research': return <BookOpen className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />;
    case 'timeline': return <Clock    className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />;
    default:         return null;
  }
}

function getTypeLabel(type: string) {
  switch (type) {
    case 'post':     return 'Article';
    case 'project':  return 'Project';
    case 'research': return 'Research Log';
    case 'timeline': return 'Timeline Event';
    default:         return 'Content';
  }
}

// ─── Translate raw algorithm reasons → editorial language ─────────────────────

function editorialReason(raw: string): string {
  if (raw.includes('Directly referenced')) return 'Timeline connection';
  if (raw.includes('Referenced in timeline')) return 'Timeline connection';
  if (raw.includes('Shares') && raw.includes('tag')) return 'Related by topic';
  if (raw.includes('Same category')) return 'Same domain';
  return raw;
}

export default function RelatedNodeCard({ scoredNode }: RelatedNodeCardProps) {
  const { node, reasons } = scoredNode;

  const borderAccent = categoryAccentBorder[node.category] ?? 'border-l-zinc-700/40';
  const textAccent   = categoryAccentText[node.category]   ?? 'text-zinc-400';
  const editorialReasons = Array.from(new Set(reasons.map(editorialReason))).slice(0, 2);

  return (
    <Link href={node.url} className="block group">
      <div
        className={`h-full flex flex-col justify-between p-5 rounded-xl border border-zinc-800/60 border-l-2 ${borderAccent} bg-zinc-900/25 hover:bg-zinc-900/50 transition-all duration-200`}
      >
        <div>
          {/* Type + category label row */}
          <div className="flex items-center gap-2 mb-3">
            {getTypeIcon(node.type)}
            <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
              {getTypeLabel(node.type)}
            </span>
            {node.category && node.category !== 'project' && (
              <>
                <span className="text-zinc-800 text-[10px]">·</span>
                <span className={`font-mono text-[9px] uppercase tracking-widest ${textAccent}`}>
                  {node.category.replace('-', ' ')}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors mb-2 leading-snug line-clamp-2">
            {node.title}
          </h4>

          {/* Description */}
          {node.description && (
            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
              {node.description}
            </p>
          )}
        </div>

        {/* Footer: reasons + arrow */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/40">
          <div className="flex flex-wrap gap-1.5">
            {editorialReasons.map((r, i) => (
              <span
                key={i}
                className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-zinc-800/60 text-zinc-600 border border-zinc-800/40"
              >
                {r}
              </span>
            ))}
          </div>
          <ArrowRight
            className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-400 transition-colors shrink-0"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
