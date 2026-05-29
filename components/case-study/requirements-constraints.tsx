import React from 'react';

export function RequirementsConstraints({ 
  requirements, 
  constraints 
}: { 
  requirements?: string[], 
  constraints?: string[] 
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
      {requirements && requirements.length > 0 && (
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="font-mono text-xs text-emerald-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-sm" />
            Requirements
          </h3>
          <ul className="space-y-4 m-0 p-0 list-none">
            {requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-4 text-[0.9375rem] text-zinc-300 leading-relaxed">
                <span className="text-emerald-500/40 font-mono text-[11px] mt-1 shrink-0">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {constraints && constraints.length > 0 && (
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <h3 className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-sm" />
            Constraints
          </h3>
          <ul className="space-y-4 m-0 p-0 list-none">
            {constraints.map((con, i) => (
              <li key={i} className="flex items-start gap-4 text-[0.9375rem] text-zinc-300 leading-relaxed">
                <span className="text-amber-500/50 mt-2 block w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
