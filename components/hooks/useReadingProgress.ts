import { useEffect, useState } from 'react';

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

/**
 * Returns scroll progress for a given element, where:
 * - 0 means the element has not been reached yet
 * - 1 means the element has been fully scrolled past
 */
export function useReadingProgress(targetId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = document.getElementById(targetId);
      if (!el) {
        setProgress(0);
        return;
      }

      const rect = el.getBoundingClientRect();

      // Start when the top reaches the top of viewport.
      // End when the bottom reaches the top of viewport.
      const start = 0;
      const end = Math.max(1, rect.height);
      const current = start - rect.top;
      const next = clamp01(current / end);
      setProgress(next);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    const el = document.getElementById(targetId);
    const ro = typeof ResizeObserver !== 'undefined' && el ? new ResizeObserver(onScrollOrResize) : null;
    if (ro && el) ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      ro?.disconnect();
    };
  }, [targetId]);

  return {
    progress,
    percent: Math.round(progress * 100),
  };
}

