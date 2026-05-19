'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import CopyButton from '@/components/CopyButton';
import { slugify } from '@/lib/toc';
import { LightboxImage } from '@/components/ui/lightbox-image';

type Props = {
  source: MDXRemoteSerializeResult;
};

function makeHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  return function Heading({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement> & { children?: React.ReactNode }) {
    const text = typeof children === 'string' ? children : '';
    const id = slugify(text);
    return (
      <Tag id={id} {...props} className="scroll-mt-24">
        {children}
      </Tag>
    );
  };
}

const components = {
  h1: makeHeading(1),
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
  img: (props: any) => <LightboxImage {...props} />,
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & { children?: React.ReactNode }) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode = codeEl?.children ?? '';
    return (
      <div className="group relative my-6">
        <CopyButton code={typeof rawCode === 'string' ? rawCode : ''} />
        <pre {...props}>{children}</pre>
      </div>
    );
  },
};

export default function MDXRenderer({ source }: Props) {
  return (
    <div className="prose prose-neutral prose-invert max-w-none">
      <MDXRemote {...source} components={components} />
    </div>
  );
}
