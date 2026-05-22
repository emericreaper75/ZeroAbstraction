import React from 'react';
import CopyButton from '@/components/CopyButton';
import HeadingWithAnchor from '@/components/mdx/HeadingWithAnchor';
import { Surface } from '@/components/ui/surface';

/** Extract language label from className like "language-typescript" → "TS" or "typescript" */
function getLangLabel(className?: string): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  if (!match) return null;
  const lang = match[1];
  const shortNames: Record<string, string> = {
    typescript: 'TS', javascript: 'JS', python: 'PY', bash: 'SH', shell: 'SH',
    sh: 'SH', tsx: 'TSX', jsx: 'JSX', css: 'CSS', html: 'HTML', json: 'JSON',
    yaml: 'YAML', yml: 'YAML', sql: 'SQL', rust: 'RS', go: 'GO', cpp: 'C++',
    c: 'C', java: 'JAVA', ruby: 'RB', php: 'PHP', swift: 'SWIFT', kotlin: 'KT',
    scala: 'SCALA', r: 'R', matlab: 'MATLAB', latex: 'TEX', tex: 'TEX',
    markdown: 'MD', mdx: 'MDX', graphql: 'GQL', dockerfile: 'DOCKER',
  };
  return shortNames[lang.toLowerCase()] ?? lang.toUpperCase();
}

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={1} {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={4} {...props} />,

  // Code block with language badge + copy button
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode: string = typeof codeEl?.children === 'string' ? codeEl.children : '';
    const langLabel = getLangLabel(codeEl?.className);
    return (
      <div className="group relative my-8">
        {/* Language badge top-left */}
        {langLabel && (
          <span className="absolute left-3 top-3 z-10 rounded border border-zinc-700/60 bg-zinc-800/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-400 select-none pointer-events-none">
            {langLabel}
          </span>
        )}
        {/* Copy button top-right */}
        <CopyButton code={rawCode} />
        <Surface variant="elevated" padding="none" className="overflow-hidden">
          <pre
            className={`overflow-x-auto font-mono text-[13px] leading-relaxed text-zinc-200 ${langLabel ? 'pt-10 pb-5 px-5' : 'p-5'}`}
            style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            {...props}
          >
            {children}
          </pre>
        </Surface>
      </div>
    );
  },

  // Premium blockquote
  blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="my-8 border-l-2 border-cyan-500/40 bg-cyan-500/5 py-4 pl-5 pr-4 text-zinc-300 italic leading-relaxed rounded-r-lg">
      <div className="not-italic font-mono text-[10px] uppercase tracking-widest text-cyan-500/70 mb-2">Note</div>
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <span className="text-zinc-700 text-xs font-mono">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-700 to-transparent" />
    </div>
  ),

  // Premium table styling with mobile scroll support
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-xl" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <Surface variant="glass" padding="none" className="overflow-hidden">
        <table className="min-w-max w-full border-collapse text-sm text-zinc-200">
          {children}
        </table>
      </Surface>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-900/60 border-b border-zinc-700/50">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-zinc-800/50">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-zinc-800/30 transition-colors duration-150">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-5 py-3.5 text-left font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-medium whitespace-nowrap">{children}</th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-5 py-3 text-zinc-300 leading-relaxed">{children}</td>
  ),
};

