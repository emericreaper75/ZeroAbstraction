import React from 'react';

interface Props {
  technologies: string[];
}

export default function TechnologyMap({ technologies }: Props) {
  if (!technologies || technologies.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map(tech => (
        <span key={tech} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider border border-zinc-800 rounded text-zinc-400 bg-zinc-900/30">
          {tech}
        </span>
      ))}
    </div>
  );
}
