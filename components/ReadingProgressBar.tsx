'use client';

import { cn } from '@/lib/utils';
import { useReadingProgress } from '@/components/hooks/useReadingProgress';

type Props = {
  targetId: string;
  className?: string;
};

export default function ReadingProgressBar({ targetId, className }: Props) {
  const { progress } = useReadingProgress(targetId);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'fixed left-0 right-0 z-[60] h-0.5 bg-transparent',
        className
      )}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

