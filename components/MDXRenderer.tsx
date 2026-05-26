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
  img: (props: React.ComponentPropsWithoutRef<'img'>) => <LightboxImage {...props} />,
  table: (props: React.ComponentPropsWithoutRef<'table'>) => (
    <div className="w-full overflow-x-auto rounded-lg border border-zinc-800/50 scrollbar-hide">
      <table {...props} className="w-full min-w-max" />
    </div>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & { 'data-raw-code'?: string }) => {
    const codeEl = (children as React.ReactElement)?.props;
    const rawCode = props['data-raw-code'] || (typeof codeEl?.children === 'string' ? codeEl.children : '');
    const match = codeEl?.className?.match(/language-(\w+)/);
    const lang = match ? match[1] : '';
    const shortNames: Record<string, string> = {
      typescript: 'TS', javascript: 'JS', python: 'PY', bash: 'SH', shell: 'SH',
      sh: 'SH', tsx: 'TSX', jsx: 'JSX', css: 'CSS', html: 'HTML', json: 'JSON',
      yaml: 'YAML', yml: 'YAML', sql: 'SQL', rust: 'RS', go: 'GO', cpp: 'C++',
      c: 'C', java: 'JAVA', ruby: 'RB', php: 'PHP', swift: 'SWIFT', kotlin: 'KT',
      scala: 'SCALA', r: 'R', matlab: 'MATLAB', latex: 'TEX', tex: 'TEX',
      markdown: 'MD', mdx: 'MDX', graphql: 'GQL', dockerfile: 'DOCKER',
    };
    const langLabel = lang ? (shortNames[lang.toLowerCase()] ?? lang.toUpperCase()) : null;

    return (
      <div className="group relative my-8 w-full max-w-full overflow-hidden rounded-xl border border-white/[0.05] bg-gradient-to-b from-[#0a0a0f] to-[#05050a] shadow-[0_4px_24px_rgb(0,0,0,0.4)]">
        {/* Hairline top highlight — editorial depth cue */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
        
        {/* Header — calmer editorial footprint */}
        <div className="flex items-center justify-between px-5 py-2 bg-white/[0.02] border-b border-white/[0.04] select-none">
          {/* Left: Language identifier */}
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-400/60" />
            <span className="font-mono text-[10.5px] font-medium tracking-[0.12em] text-zinc-500 uppercase">
              {langLabel || 'TEXT'}
            </span>
          </div>
          {/* Right: Editorial copy button */}
          <CopyButton code={rawCode} />
        </div>

        {/* Scrollable code area — horizontal breathing room */}
        <div 
          className="overflow-x-auto w-full [scrollbar-width:thin] scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <pre
            className="font-mono text-[14.5px] leading-[1.75] text-zinc-200 px-8 py-7 min-w-full block"
            {...props}
          >
            {children}
          </pre>
        </div>
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
