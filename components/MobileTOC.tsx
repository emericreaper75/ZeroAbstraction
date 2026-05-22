'use client';

import React, { useState } from 'react';
import { TOCNode } from '@/lib/toc';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import TableOfContents from '@/components/TableOfContents';
import { Surface } from '@/components/ui/surface';

type Props = {
  toc: TOCNode[];
};

export default function MobileTOC({ toc }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Surface variant="glass" padding="none" className="overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-zinc-900/40 hover:bg-zinc-800/40 transition-colors border-b border-transparent data-[state=open]:border-zinc-800"
        data-state={isOpen ? "open" : "closed"}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 text-sm font-medium text-zinc-200">
          <List className="w-4 h-4 text-zinc-400" />
          Table of Contents
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-zinc-950/20">
          <TableOfContents entries={toc} onLinkClick={() => setIsOpen(false)} />
        </div>
      )}
    </Surface>
  );
}
