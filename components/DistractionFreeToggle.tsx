'use client';

import { useDistractionFree } from '@/components/DistractionFreeProvider';

export default function DistractionFreeToggle() {
  const { isDistractionFree, toggle } = useDistractionFree();

  return (
    <button
      onClick={toggle}
      aria-label={isDistractionFree ? 'Exit distraction-free mode' : 'Enter distraction-free mode'}
      title={isDistractionFree ? 'Exit distraction-free mode' : 'Enter distraction-free mode'}
      className="flex items-center gap-1.5 rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 font-mono text-xs text-neutral-500 transition-all hover:border-neutral-600 hover:text-neutral-300"
    >
      {isDistractionFree ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
          Exit Focus
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
          Focus Mode
        </>
      )}
    </button>
  );
}
