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
};

