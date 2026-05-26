'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

// ─── Types ────────────────────────────────────────────────────────────────────

interface AnnotationItem {
  mark: string | number;  // The marker shown in the code (e.g., ①, 1, 'A')
  text: string;           // Explanation text
}

interface CodeAnnotationProps {
  annotations: AnnotationItem[];
  /** Optional title for the annotation panel */
  title?: string;
}

// ─── Annotation Bubble (inline, for use within code lines) ────────────────────

interface AnnotationBubbleProps {
  mark: string | number;
  label?: string;
}

/**
 * Small inline marker bubble used inside code blocks.
 * Usage in MDX code block (as a comment trick):
 *   const x = compute(); // ①
 */
export function AnnotationBubble({ mark, label }: AnnotationBubbleProps) {
  return (
    <span
      className="inline-flex items-center justify-center w-[1.25em] h-[1.25em] rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-[0.65em] font-semibold cursor-default select-none align-middle mx-0.5"
      aria-label={label ?? `Annotation ${mark}`}
      title={label ?? `Annotation ${mark}`}
    >
      {mark}
    </span>
  );
}

// ─── Annotation Panel ─────────────────────────────────────────────────────────

/**
 * Renders an ordered list of code annotations below a code block.
 * Each annotation maps a number/symbol to an explanation text.
 *
 * Usage in MDX (immediately after a fenced code block):
 *   <CodeAnnotation annotations={[
 *     { mark: "①", text: "Initialize the state machine with default configuration." },
 *     { mark: "②", text: "The timeout is intentionally conservative — 30s covers network jitter." },
 *   ]} />
 */
export function CodeAnnotation({ annotations, title }: CodeAnnotationProps) {
  const [expanded, setExpanded] = useState(true);

  if (!annotations || annotations.length === 0) return null;

  return (
    <div className="my-[-1rem] mb-8 rounded-b-xl border border-t-0 border-white/[0.06] bg-[#05050a]/80 px-5 py-4">
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between gap-2 cursor-pointer"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-amber-400/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            {title ?? 'Code Notes'}
          </span>
        </div>
        <span
          className={cn(
            'font-mono text-zinc-600 text-xs transition-transform duration-200',
            expanded ? 'rotate-0' : '-rotate-90'
          )}
        >
          ▾
        </span>
      </button>

      {/* Annotations */}
      {expanded && (
        <ol className="mt-3 space-y-2">
          {annotations.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              {/* Marker */}
              <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300/80 font-mono text-[9px] font-semibold">
                {item.mark}
              </span>
              {/* Text */}
              <span className="text-xs text-zinc-400 leading-relaxed pt-0.5">
                {item.text}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default CodeAnnotation;
