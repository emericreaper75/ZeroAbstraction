import React from 'react';
import { ArrowRight } from 'lucide-react';

export function FutureDirections({ children, title = "Future Directions" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-3 mt-0">
        {title}
        <ArrowRight className="w-5 h-5 text-zinc-500" />
      </h2>
      <div className="prose prose-invert prose-p:text-[0.9375rem] prose-p:text-zinc-400 prose-li:text-[0.9375rem] prose-li:text-zinc-400 max-w-none">
        {children}
      </div>
    </section>
  );
}
