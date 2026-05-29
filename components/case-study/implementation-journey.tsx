import React from 'react';

export function JourneyMilestone({ date, title, children }: { date?: string, title: string, children: React.ReactNode }) {
  return (
    <div className="relative pl-8 sm:pl-10 pb-12 last:pb-0">
      <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)] z-10" />
      <div className="absolute left-[4px] top-3 bottom-0 w-px bg-zinc-800 last-of-type:hidden" />
      
      {date && <div className="text-[10px] font-mono text-cyan-500/70 mb-2 tracking-widest uppercase">{date}</div>}
      <h3 className="text-xl font-serif text-white mb-4 mt-0">{title}</h3>
      <div className="prose prose-invert prose-p:text-zinc-400 prose-p:text-[0.9375rem] prose-p:leading-[1.8] max-w-none">
        {children}
      </div>
    </div>
  );
}

export function ImplementationJourney({ children, title = "Implementation Journey" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-serif text-white mb-10">{title}</h2>
      <div className="ml-2">
        {children}
      </div>
    </section>
  );
}
