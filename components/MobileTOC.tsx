'use client';

import { useMemo, useState } from 'react';
import type { TOCNode } from '@/lib/toc';

type Props = {
  toc: TOCNode[];
};

function TOCList({ nodes, onNavigate }: { nodes: TOCNode[]; onNavigate: () => void }) {
  return (
    <ul className="space-y-1">
      {nodes.map((n) => (
        <li key={n.id}>
          <a
            href={`#${n.id}`}
            className="block truncate rounded-md px-2 py-1 text-sm text-neutral-300 hover:bg-neutral-800/60"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth' });
              onNavigate();
            }}
          >
            {n.text}
          </a>
          {n.children.length > 0 && (
            <div className="ml-3 mt-1 border-l border-neutral-800 pl-3">
              <TOCList nodes={n.children} onNavigate={onNavigate} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function MobileTOC({ toc }: Props) {
  const [open, setOpen] = useState(false);

  const hasItems = useMemo(() => toc.length > 0, [toc]);
  if (!hasItems) return null;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        className="w-full rounded-xl border border-neutral-800 bg-neutral-900/40 px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-neutral-400 hover:border-neutral-700"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        On this page
      </button>

      {open && (
        <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
          <TOCList nodes={toc} onNavigate={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

