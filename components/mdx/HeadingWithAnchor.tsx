'use client';

import React, { useState } from 'react';
import { slugify } from '@/lib/toc';

type Props = React.HTMLAttributes<HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4;
};

function getHeadingText(node: React.ReactNode): string {
  if (node == null) return '';
  if (typeof node === 'string' || typeof node === 'number') {
    return node.toString();
  }
  if (Array.isArray(node)) {
    return node.map(getHeadingText).join('');
  }
  if (typeof node === 'object' && 'props' in node) {
    return getHeadingText((node as React.ReactElement).props.children);
  }
  return '';
}

export default function HeadingWithAnchor({ level, children, ...props }: Props) {
  const [copied, setCopied] = useState(false);
  const Tag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4';
  
  const text = getHeadingText(children);
  const id = props.id?.toString() || slugify(text);

  if (level === 1 || !id) {
    return (
      <Tag id={id} className="scroll-mt-28" {...props}>
        {children}
      </Tag>
    );
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <Tag id={id} className="group relative scroll-mt-28" {...props}>
      <span>{children}</span>
      <a
        href={`#${id}`}
        onClick={handleCopy}
        className="inline-flex items-center ml-2 text-neutral-500 hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 align-middle"
        title="Copy link to this section"
        aria-label={`Copy link to section`}
      >
        {copied ? (
          <svg className="w-4 h-4 text-emerald-400 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 002.502-1.685m1.85-2.251l1.102-1.101a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )}
      </a>
      {copied && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-950/30 border border-emerald-800/50 rounded px-1.5 py-0.5 ml-2 inline-block align-middle animate-in fade-in zoom-in duration-200">
          Copied!
        </span>
      )}
    </Tag>
  );
}
