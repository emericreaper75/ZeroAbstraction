'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type FigureLayout = 'default' | 'wide' | 'inset' | 'full';

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  label?: string;      // e.g. "Fig. 1" — rendered as monospace prefix before caption
  layout?: FigureLayout;
  width?: number;
  height?: number;
}

// ─── Layout Classes ────────────────────────────────────────────────────────────

const layoutClasses: Record<FigureLayout, string> = {
  default: 'my-10 mx-auto max-w-full',
  inset:   'my-8 mx-auto max-w-[480px] float-right ml-8 mb-4 clear-right',
  wide:    'my-10 mx-auto max-w-[960px]',
  full:    'my-12 mx-[-2rem] sm:mx-[-3rem] lg:mx-[-5rem] max-w-none',
};

// ─── Figure Component ─────────────────────────────────────────────────────────

/**
 * Publication-grade figure component for MDX articles.
 *
 * Usage in MDX:
 *   <Figure src="/images/diagram.png" alt="System Architecture"
 *           caption="High-level overview of the processing pipeline"
 *           label="Fig. 1" layout="wide" />
 */
export function Figure({
  src,
  alt,
  caption,
  label,
  layout = 'default',
}: FigureProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <figure className={layoutClasses[layout]}>
        {/* Image */}
        <div className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-zinc-950/40 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent pointer-events-none z-10" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt ?? caption ?? ''}
            className="w-full h-auto object-cover cursor-zoom-in hover:opacity-95 transition-opacity duration-200 block"
            onClick={() => setIsOpen(true)}
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Caption */}
        {(caption || label) && (
          <figcaption className="mt-3 flex items-start gap-2 text-sm text-zinc-500 leading-relaxed">
            {label && (
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600 bg-zinc-800/50 border border-zinc-700/50 rounded px-1.5 py-0.5 mt-0.5">
                {label}
              </span>
            )}
            {caption && <span>{caption}</span>}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            {/* Close hint */}
            <p className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              Press anywhere to close
            </p>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-4 p-4 md:p-10 max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt ?? caption ?? ''}
                className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
                onClick={() => setIsOpen(false)}
              />

              {/* Caption in overlay */}
              {(caption || label) && (
                <div className="flex items-center gap-3 text-sm text-zinc-500 max-w-prose text-center">
                  {label && (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      {label}
                    </span>
                  )}
                  {caption && <span className="text-zinc-400">{caption}</span>}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Figure;
