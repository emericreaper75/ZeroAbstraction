'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidenoteProps {
  children: React.ReactNode;
  number?: number | string;
  label?: string;
}

/**
 * Editorial sidenote component.
 * - Desktop (≥1440px): absolute margin note to the right of prose.
 * - Mobile/Tablet (<1440px): inline collapsible disclosure.
 *
 * Usage in MDX:
 *   <Sidenote number={1}>Editorial aside text here.</Sidenote>
 */
export function Sidenote({ children, number, label }: SidenoteProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop margin sidenote */}
      <span
        className="hidden 2xl:inline-block sidenote-container"
        aria-label={label ?? `Sidenote ${number ?? ''}`}
      >
        <aside className="sidenote-aside">
          {number !== undefined && (
            <span className="font-mono text-[9px] text-cyan-500/60 mr-1.5 tabular-nums">
              [{number}]
            </span>
          )}
          <span className="text-[12px] text-zinc-500 leading-relaxed">
            {children}
          </span>
        </aside>
      </span>

      {/* Mobile/Tablet inline collapsible */}
      <span className="2xl:hidden inline-block">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={label ?? `Toggle sidenote ${number ?? ''}`}
          className={cn(
            'inline-flex items-center justify-center w-[1.2em] h-[1.2em] rounded font-mono text-[0.6em] align-super mx-0.5 border transition-colors duration-150 cursor-pointer',
            open
              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400'
              : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
          )}
        >
          {number ?? '·'}
        </button>
        {open && (
          <span className="block mt-2 mb-3 ml-4 pl-3 border-l border-zinc-700/50 text-sm text-zinc-400 leading-relaxed">
            {children}
          </span>
        )}
      </span>
    </>
  );
}

export default Sidenote;
