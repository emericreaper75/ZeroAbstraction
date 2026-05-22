import React from 'react';

type PageHeaderProps = {
  label: string;
  title: React.ReactNode;
  subtitle: string;
  accentColor: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';
  count?: number;
  countLabel?: string;
};

const colorConfig = {
  cyan: {
    underline: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]',
    badge: 'text-cyan-400 bg-cyan-400/[0.08] border-cyan-400/30',
  },
  violet: {
    underline: 'bg-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]',
    badge: 'text-violet-400 bg-violet-400/[0.08] border-violet-400/30',
  },
  emerald: {
    underline: 'bg-emerald-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]',
    badge: 'text-emerald-400 bg-emerald-400/[0.08] border-emerald-400/30',
  },
  amber: {
    underline: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]',
    badge: 'text-amber-400 bg-amber-400/[0.08] border-amber-400/30',
  },
  rose: {
    underline: 'bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.5)]',
    badge: 'text-rose-400 bg-rose-400/[0.08] border-rose-400/30',
  },
};

export default function PageHeader({
  label,
  title,
  subtitle,
  accentColor,
  count,
  countLabel = 'articles'
}: PageHeaderProps) {
  const cn = colorConfig[accentColor];

  return (
    <header className="mb-14 max-w-prose relative z-10 flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          {label}
        </p>
        {count !== undefined && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${cn.badge}`}>
            {count} {count === 1 ? countLabel.replace(/s$/, '') : countLabel}
          </span>
        )}
      </div>

      <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl mt-2 relative inline-block">
        {title}
      </h1>
      <div className="mt-2 h-[3px] w-[60px] rounded-sm" style={{ backgroundColor: 'var(--color-brand-primary)', boxShadow: 'var(--shadow-brand)' }} />

      <p className="mt-4 text-base leading-relaxed text-zinc-400">
        {subtitle}
      </p>
    </header>
  );
}
