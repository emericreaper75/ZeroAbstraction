import Link from 'next/link';
import { TimelineEntry } from '@/lib/timeline';
import { formatDate } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type CategoryConfig = {
  bg: string;
  ring: string;
  borderHover: string;
  glow: string;
  linkColor: string;
};

const categoryConfigs: Record<string, CategoryConfig> = {
  electronics: { 
    bg: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]', 
    ring: 'ring-cyan-950/30', 
    borderHover: 'hover:border-cyan-400/50 group-hover:border-l-2 hover:border-l-cyan-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]',
    linkColor: 'text-cyan-400 hover:text-cyan-300 border-cyan-800/60 hover:border-cyan-600/60 bg-cyan-950/30',
  },
  astrophysics: { 
    bg: 'bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]', 
    ring: 'ring-violet-950/30', 
    borderHover: 'hover:border-violet-400/50 group-hover:border-l-2 hover:border-l-violet-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
    linkColor: 'text-violet-400 hover:text-violet-300 border-violet-800/60 hover:border-violet-600/60 bg-violet-950/30',
  },
  'physics-math': { 
    bg: 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]', 
    ring: 'ring-emerald-950/30', 
    borderHover: 'hover:border-emerald-400/50 group-hover:border-l-2 hover:border-l-emerald-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(74,222,128,0.15)]',
    linkColor: 'text-emerald-400 hover:text-emerald-300 border-emerald-800/60 hover:border-emerald-600/60 bg-emerald-950/30',
  },
  physics: { 
    bg: 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]', 
    ring: 'ring-emerald-950/30', 
    borderHover: 'hover:border-emerald-400/50 group-hover:border-l-2 hover:border-l-emerald-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(74,222,128,0.15)]',
    linkColor: 'text-emerald-400 hover:text-emerald-300 border-emerald-800/60 hover:border-emerald-600/60 bg-emerald-950/30',
  },
  math: { 
    bg: 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]', 
    ring: 'ring-emerald-950/30', 
    borderHover: 'hover:border-emerald-400/50 group-hover:border-l-2 hover:border-l-emerald-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(74,222,128,0.15)]',
    linkColor: 'text-emerald-400 hover:text-emerald-300 border-emerald-800/60 hover:border-emerald-600/60 bg-emerald-950/30',
  },
  research: { 
    bg: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]', 
    ring: 'ring-amber-950/30', 
    borderHover: 'hover:border-amber-400/50 group-hover:border-l-2 hover:border-l-amber-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]',
    linkColor: 'text-amber-400 hover:text-amber-300 border-amber-800/60 hover:border-amber-600/60 bg-amber-950/30',
  },
  academic: { 
    bg: 'bg-zinc-400 text-zinc-400', 
    ring: 'ring-zinc-950/30', 
    borderHover: 'hover:border-zinc-400/50 group-hover:border-l-2 hover:border-l-zinc-400', 
    glow: 'hover:shadow-[0_0_25px_rgba(161,161,170,0.15)]',
    linkColor: 'text-zinc-400 hover:text-zinc-300 border-zinc-700/60 hover:border-zinc-600/60 bg-zinc-900/30',
  },
};

const defaultConfig: CategoryConfig = {
  bg: 'bg-zinc-500 text-zinc-500', 
  ring: 'ring-neutral-950/30', 
  borderHover: 'hover:border-neutral-500/50 group-hover:border-l-2 hover:border-l-neutral-500', 
  glow: 'hover:shadow-[0_0_25px_rgba(115,115,115,0.15)]',
  linkColor: 'text-zinc-400 hover:text-zinc-300 border-zinc-700/60 hover:border-zinc-600/60 bg-zinc-900/30',
};

const contentTypeLabels: Record<string, string> = {
  post: 'Article',
  project: 'Project',
  research: 'Research Log',
};

type Props = { entry: TimelineEntry; isLast?: boolean };

export default function TimelineItem({ entry, isLast = false }: Props) {
  const cn = categoryConfigs[entry.category] ?? defaultConfig;

  return (
    <div className="relative flex gap-6 pb-12 group">
      {/* Dot */}
      <div className={`relative mt-1 h-5 w-5 shrink-0 rounded-full ${cn.bg} ring-4 ${cn.ring} transition-all duration-300`} />

      {/* Content */}
      <div className={`min-w-0 flex-1 rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 ${cn.borderHover} ${cn.glow}`}>
        <time className="font-mono text-[11px] tracking-wider uppercase text-neutral-500">{formatDate(entry.date)}</time>
        <h3 className="mt-2 font-serif text-lg font-semibold text-neutral-100 group-hover:text-white transition-colors">{entry.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-400 group-hover:text-neutral-300 transition-colors">{entry.description}</p>
        
        {entry.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-neutral-800/80 bg-neutral-900/50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* View link — only rendered when href is provided */}
        {entry.href && (
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={entry.href}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200 ${cn.linkColor}`}
            >
              View {entry.contentType ? contentTypeLabels[entry.contentType] : 'Content'}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

