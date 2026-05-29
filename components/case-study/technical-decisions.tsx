import React from 'react';
import { Surface } from '@/components/ui/surface';
import { Check, X, Activity } from 'lucide-react';

interface DecisionProps {
  decision: string;
  rationale: string;
  alternatives?: string[];
  tradeoffs?: string[];
  outcomes?: string;
}

export function TechnicalDecision({ decision, rationale, alternatives, tradeoffs, outcomes }: DecisionProps) {
  return (
    <Surface variant="glass" padding="md" className="my-8 border-l-4 border-l-cyan-500 shadow-lg">
      <h3 className="text-lg font-serif text-white mt-0 mb-5">{decision}</h3>
      <div className="space-y-6">
        <div>
          <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">Rationale</h4>
          <p className="text-[0.9375rem] text-zinc-300 leading-relaxed m-0">{rationale}</p>
        </div>
        
        {alternatives && alternatives.length > 0 && (
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">Alternatives Considered</h4>
            <ul className="space-y-2 m-0 p-0 list-none">
              {alternatives.map((alt, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-zinc-400">
                  <X className="w-4 h-4 text-zinc-600 mt-0.5 shrink-0" />
                  <span>{alt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tradeoffs && tradeoffs.length > 0 && (
          <div>
            <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-2">Tradeoffs Accepted</h4>
            <ul className="space-y-2 m-0 p-0 list-none">
              {tradeoffs.map((tradeoff, i) => (
                <li key={i} className="flex items-start gap-3 text-[0.9375rem] text-zinc-400">
                  <Activity className="w-4 h-4 text-amber-500/70 mt-0.5 shrink-0" />
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {outcomes && (
          <div className="pt-5 mt-5 border-t border-zinc-800/50">
            <h4 className="text-[10px] font-mono tracking-widest text-cyan-500 uppercase mb-2">Outcome</h4>
            <div className="flex items-start gap-3 text-[0.9375rem] text-zinc-300 m-0 leading-relaxed">
              <Check className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
              <span>{outcomes}</span>
            </div>
          </div>
        )}
      </div>
    </Surface>
  );
}

export function TechnicalDecisions({ children }: { children: React.ReactNode }) {
  return (
    <section className="my-16">
      <h2 className="text-2xl font-serif text-white mb-8">Technical Decisions</h2>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  );
}
