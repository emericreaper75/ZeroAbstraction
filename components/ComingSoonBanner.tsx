import React from 'react';
import { Surface } from '@/components/ui/surface';

interface ComingSoonBannerProps {
  count: number;
  category: string;
}

export default function ComingSoonBanner({ count, category }: ComingSoonBannerProps) {
  if (count <= 0) return null;

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Surface
          key={`placeholder-${i}`}
          variant="glass"
          className="border-dashed border-white/10 min-h-[320px] flex flex-col justify-center items-center"
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span className="text-sm font-mono text-neutral-400">Research in progress</span>
            </div>
            <span className="text-xs text-neutral-500 uppercase tracking-widest">{category}</span>
          </div>
        </Surface>
      ))}
    </>
  );
}
