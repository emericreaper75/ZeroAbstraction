import React from 'react';

export function ProblemContext({ children, title = "Problem Statement" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16">
      <div className="pl-6 border-l-2 border-zinc-800 py-2">
        <h2 className="text-2xl font-serif text-white mb-6 mt-0">{title}</h2>
        <div className="prose prose-invert prose-p:text-zinc-400 prose-p:leading-relaxed max-w-none">
          {children}
        </div>
      </div>
    </section>
  );
}
