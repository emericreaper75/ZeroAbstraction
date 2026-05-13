import CopyButton from '@/components/CopyButton';
import { slugify } from '@/lib/toc';

function makeHeading(level: 1 | 2 | 3 | 4) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = typeof children === 'string' ? children : '';
    const id = props.id?.toString() || slugify(text);
    return (
      <Tag id={id} className="scroll-mt-24" {...props}>
        {children}
      </Tag>
    );
  };
}

export const mdxComponents = {
  h1: makeHeading(1),
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  // Code block with copy button
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode: string = typeof codeEl?.children === 'string' ? codeEl.children : '';
    return (
      <div className="group relative my-6">
        <CopyButton code={rawCode} />
        <pre
          className="overflow-x-auto rounded-lg border border-neutral-800 bg-[hsl(220,16%,10%)] p-5 font-mono text-sm leading-relaxed text-neutral-200"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  // Table styling
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900/30">
      <table className="w-full border-collapse text-sm text-neutral-200">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-neutral-800/50">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody>{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="border-b border-neutral-700 last:border-b-0 hover:bg-neutral-800/30">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-4 py-2 text-left font-medium text-neutral-300">{children}</th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-4 py-2 border-t border-neutral-700">{children}</td>
  ),
};

