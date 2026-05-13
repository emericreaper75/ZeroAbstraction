'use client';

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
  console.log('TOC flat entries:', flat.length);

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
      <div className="space-y-1 relative">
        {flat.map(
          ({
            id,
            text,
            level,
          }) => {
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
                  'group block text-sm leading-relaxed transition-all duration-300 py-1 text-neutral-500 hover:text-neutral-300',
                  level === 1
                    ? 'pl-0'
                    : level === 2
                    ? 'pl-4'
                    : 'pl-8'
                )}
              >
                {text}
              </a>
            );
          }
        )}
      </div>
    </div>
  );
}