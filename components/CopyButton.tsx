'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Props = { 
  code: string;
  className?: string;
};

export default function CopyButton({ code, className }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label="Copy code"
      className={cn(
        "flex items-center gap-1 rounded border border-white/[0.06] bg-transparent px-2 py-0.5 font-mono text-[10px] text-zinc-500 transition-colors duration-150 hover:border-white/[0.12] hover:text-zinc-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50",
        className
      )}
    >
      {copied ? (
        <>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-400">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-zinc-400 tracking-widest">COPIED</span>
        </>
      ) : (
        <>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          <span className="tracking-widest">COPY</span>
        </>
      )}
    </button>
  );
}

