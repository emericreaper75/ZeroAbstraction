'use client';

import { useEffect, useRef, useState } from 'react';
import { TOCEntry } from '@/lib/toc';
import { cn } from '@/lib/utils';

type Props = { entries: TOCEntry[] };

export default function TableOfContents({ entries }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingEls = entries
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (obs) => {
        for (const entry of obs) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-72px 0px -60% 0px', threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, [entries]);

  if (entries.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-1">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-neutral-600">
        On this page
      </p>
      {entries.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={cn(
            'block truncate border-l py-0.5 text-sm transition-all',
            level === 1 ? 'pl-0 ml-0' : level === 2 ? 'pl-4 ml-0' : 'pl-8 ml-0',
            activeId === id
              ? 'border-sky-500 text-sky-400'
              : 'border-transparent text-neutral-500 hover:border-neutral-600 hover:text-neutral-300'
          )}
        >
          {text}
        </a>
      ))}
    </nav>
  );
}
