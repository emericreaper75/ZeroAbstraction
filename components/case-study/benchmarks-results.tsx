import React from 'react';
import { Surface } from '@/components/ui/surface';

export function BenchmarksResults({ children, title = "Benchmarks & Results" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-serif text-white mb-8">{title}</h2>
      <Surface variant="glass" padding="none" className="border-emerald-900/30 overflow-hidden">
        <div className="p-1 md:p-2 bg-gradient-to-br from-emerald-950/20 to-zinc-950/40">
           <div className="prose prose-invert max-w-none prose-table:my-0 w-full overflow-x-auto scrollbar-hide">
             {children}
           </div>
        </div>
      </Surface>
    </section>
  );
}
