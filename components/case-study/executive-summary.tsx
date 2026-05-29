import React from 'react';
import { Surface } from '@/components/ui/surface';

export function ExecutiveSummary({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-8">
      <Surface variant="glass" padding="lg" className="border-cyan-900/30 bg-gradient-to-br from-cyan-950/20 to-zinc-950/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50" />
        <h2 className="text-sm font-mono tracking-widest text-cyan-400 uppercase mb-6 mt-0 border-b border-cyan-900/30 pb-3 flex items-center gap-3">
          <span className="block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          Executive Summary
        </h2>
        <div className="prose prose-invert prose-p:text-[1.125rem] prose-p:leading-[1.8] prose-p:font-light prose-p:text-zinc-300 max-w-none">
          {children}
        </div>
      </Surface>
    </section>
  );
}
