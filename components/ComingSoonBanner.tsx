import React from 'react';

interface ComingSoonBannerProps {
  count: number;
  category: string;
}

export default function ComingSoonBanner({ count, category }: ComingSoonBannerProps) {
  if (count <= 0) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <article
          key={`placeholder-${i}`}
          className="group relative flex flex-col rounded-lg border border-dashed border-white/6 bg-[#0f0f1a]/40 p-6 transition-all min-h-[320px] justify-center items-center"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-mono text-neutral-400">Research in progress</span>
            </div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">{category}</span>
          </div>
        </article>
      ))}
    </>
  );
}
