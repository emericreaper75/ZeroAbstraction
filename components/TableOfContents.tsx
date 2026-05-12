'use client';

import {
  useEffect,
  useRef,
  useState,
} from 'react';

import { TOCNode } from '@/lib/toc';
import { cn } from '@/lib/utils';

type Props = {
  entries: TOCNode[];
};

function flattenTOC(
  nodes: TOCNode[]
): {
  id: string;
  text: string;
  level: number;
}[] {
  const out: {
    id: string;
    text: string;
    level: number;
  }[] = [];

  const walk = (items: TOCNode[]) => {
    for (const n of items) {
      out.push({
        id: n.id,
        text: n.text,
        level: n.level,
      });

      if (n.children.length) {
        walk(n.children);
      }
    }
  };

  walk(nodes);

  return out;
}

export default function TableOfContents({
  entries,
}: Props) {
  const flat = flattenTOC(entries);

  const [activeId, setActiveId] =
    useState<string>('');

  const observerRef =
    useRef<IntersectionObserver | null>(
      null
    );

  useEffect(() => {
    const headingEls = flat
      .map(({ id }) =>
        document.getElementById(id)
      )
      .filter(Boolean) as HTMLElement[];

    observerRef.current =
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveId(
                entry.target.id
              );
              break;
            }
          }
        },
        {
          rootMargin:
            '-20% 0px -65% 0px',
          threshold: 0,
        }
      );

    headingEls.forEach((el) =>
      observerRef.current?.observe(el)
    );

    return () =>
      observerRef.current?.disconnect();
  }, [flat]);

  if (flat.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Heading */}
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-500">
        On This Page
      </p>

      {/* Links */}
      <div className="space-y-2">
        {flat.map(
          ({
            id,
            text,
            level,
          }) => {
            const isActive =
              activeId === id;

            return (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();

                  document
                    .getElementById(id)
                    ?.scrollIntoView({
                      behavior:
                        'smooth',
                      block: 'start',
                    });
                }}
                className={cn(
                  'group relative block text-sm leading-relaxed transition-all duration-300',
                  level === 1
                    ? 'pl-4'
                    : level === 2
                    ? 'pl-8'
                    : 'pl-12',
                  isActive
                    ? 'text-cyan-400'
                    : 'text-neutral-500 hover:text-neutral-300'
                )}
              >
                {/* Active Glow Bar */}
                <span
                  className={cn(
                    'absolute left-0 top-1/2 h-[24px] w-[4px] -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.95)] transition-all duration-300',
                    isActive
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-75'
                  )}
                />

                {text}
              </a>
            );
          }
        )}
      </div>
    </div>
  );
}