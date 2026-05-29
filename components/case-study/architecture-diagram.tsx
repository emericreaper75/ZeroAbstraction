import React from 'react';
import { Surface } from '@/components/ui/surface';

export function ArchitectureDiagram({ children, caption }: { children: React.ReactNode, caption?: string }) {
  return (
    <figure className="my-12 relative w-full">
      <Surface variant="glass" padding="md" className="flex justify-center bg-[#0a0a0f]/80 border-zinc-800/50 backdrop-blur-md overflow-hidden">
        <div className="max-w-full overflow-x-auto scrollbar-hide w-full flex justify-center py-6 px-4">
          {children}
        </div>
      </Surface>
      {caption && (
        <figcaption className="text-center text-[11px] font-mono text-zinc-500 mt-4 tracking-widest uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
