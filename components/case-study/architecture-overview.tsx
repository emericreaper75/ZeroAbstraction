import React from 'react';
import { Surface } from '@/components/ui/surface';

export function ArchitectureOverview({ children, title = "Architecture Overview" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-serif text-white mb-8">{title}</h2>
      <Surface variant="glass" padding="lg" className="border-indigo-900/30 bg-gradient-to-br from-indigo-950/20 to-zinc-950/40">
        <div className="prose prose-invert prose-p:text-[0.9375rem] prose-p:leading-[1.8] prose-p:text-zinc-300 max-w-none">
          {children}
        </div>
      </Surface>
    </section>
  );
}
