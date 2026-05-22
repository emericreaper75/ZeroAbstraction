import CopyButton from '@/components/CopyButton';
import HeadingWithAnchor from '@/components/mdx/HeadingWithAnchor';
import { Surface } from '@/components/ui/surface';

export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={1} {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={4} {...props} />,
  // Code block with copy button
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode: string = typeof codeEl?.children === 'string' ? codeEl.children : '';
    return (
      <div className="group relative my-8">
        <CopyButton code={rawCode} />
        <Surface variant="elevated" padding="none" className="overflow-hidden">
          <pre
            className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-zinc-200"
            {...props}
          >
            {children}
          </pre>
        </Surface>
      </div>
    );
  },
  // Table styling
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto">
      <Surface variant="glass" padding="none" className="overflow-hidden">
        <table className="w-full border-collapse text-sm text-zinc-200">
          {children}
        </table>
      </Surface>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-900/50 border-b border-zinc-800">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-zinc-800/50">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-zinc-800/20 transition-colors duration-200">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-5 py-3 text-left font-mono text-[11px] uppercase tracking-widest text-zinc-400 font-medium">{children}</th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-5 py-3 text-zinc-300">{children}</td>
  ),
};
