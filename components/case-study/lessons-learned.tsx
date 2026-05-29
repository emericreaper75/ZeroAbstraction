import React from 'react';
import { Lightbulb } from 'lucide-react';

export function Lesson({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 my-6">
      <div className="mt-1 p-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.2)] shrink-0">
        <Lightbulb className="w-4 h-4" />
      </div>
      <div>
        <h3 className="text-base font-medium text-white mb-2 mt-0.5">{title}</h3>
        <div className="prose prose-invert prose-p:text-[0.9375rem] prose-p:text-zinc-300 prose-p:leading-relaxed max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LessonsLearned({ children, title = "Lessons Learned" }: { children: React.ReactNode, title?: string }) {
  return (
    <section className="my-16 border-t border-zinc-800/50 pt-10">
      <h2 className="text-2xl font-serif text-white mb-8">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}
