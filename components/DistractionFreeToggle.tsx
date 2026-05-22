'use client';

import { useDistractionFree } from '@/components/DistractionFreeProvider';

export default function DistractionFreeToggle() {
  const { isDistractionFree, toggle } = useDistractionFree();

  return (
    <button
      onClick={toggle}
      aria-label={isDistractionFree ? 'Exit focus mode' : 'Enter focus mode to read full document'}
      title={isDistractionFree ? 'Exit focus mode' : 'Enter focus mode to read full document'}
      className="group relative flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-4 py-2 font-mono text-xs text-zinc-400 transition-all duration-300 hover:border-cyan-500/50 hover:bg-zinc-800 hover:text-cyan-400"
    >
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-500/5 blur-md" />
      
      {isDistractionFree ? (
        <>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
          </svg>
          <span className="relative z-10">Exit Focus Mode</span>
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          <span className="relative z-10">Enter Focus Mode</span>
        </>
      )}
    </button>
  );
}
