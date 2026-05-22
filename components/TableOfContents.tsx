'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { TOCNode } from '@/lib/toc';
import { cn } from '@/lib/utils';
import { useTableOfContents, TOCItem } from '@/hooks/useTableOfContents';

type Props = {
  entries?: TOCNode[];
};

function flattenTOC(nodes: TOCNode[]): TOCItem[] {
  const out: TOCItem[] = [];

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

export default function TableOfContents({ entries = [] }: Props) {
  const flatEntries = useMemo(() => flattenTOC(entries), [entries]);
  const { activeId, headings } = useTableOfContents(flatEntries);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Heading */}
      <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-500">
        On This Page
      </p>

      {/* Links */}
      <div className="space-y-1 relative border-l border-zinc-800/50">
        {headings.map(({ id, text, level }) => {
          const isActive = activeId === id;
          return (
            <div key={id} className="relative">
              {/* Framer Motion Line Tracker */}
              {isActive && (
                <motion.div
                  layoutId="active-toc-line"
                  className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-cyan-400 z-10 shadow-[0_0_8px_theme(colors.cyan.400)]"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();

                  document.getElementById(id)?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }}
                className={cn(
                  'group block text-sm leading-relaxed transition-colors duration-300 py-1.5 border-l-2 -ml-[1px]',
                  level === 1 ? 'pl-4' : level === 2 ? 'pl-6' : 'pl-8',
                  isActive
                    ? 'border-transparent text-cyan-400 font-medium'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
                )}
              >
                {text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}