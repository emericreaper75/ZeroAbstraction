'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Caption displayed below the image and in the lightbox overlay */
  caption?: string;
}

export function LightboxImage({ src, alt, caption, ...props }: LightboxImageProps) {
  // Strip Framer Motion incompatible event handlers
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { onDrag, onDragStart, onDragEnd, onAnimationStart, title, ...restProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  // Use title as caption fallback (MDX img title attribute convention)
  const displayCaption = caption ?? title;

  if (!src) return null;

  return (
    <>
      {/* Image wrapper — figcaption if caption exists */}
      <figure className="my-8 group">
        <motion.img
          src={src}
          alt={alt || 'MDX image'}
          className="cursor-zoom-in rounded-xl border border-white/[0.07] shadow-[0_8px_40px_rgba(0,0,0,0.4)] w-full object-cover transition-opacity duration-200 hover:opacity-90 block"
          onClick={() => setIsOpen(true)}
          layoutId={`img-${src}`}
          {...restProps}
        />
        {displayCaption && (
          <figcaption className="mt-3 text-sm text-zinc-500 leading-relaxed text-center">
            {displayCaption}
          </figcaption>
        )}
      </figure>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/92 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            {/* Close hint */}
            <p className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest text-zinc-600 pointer-events-none">
              Click to close
            </p>

            <motion.img
              src={src}
              alt={alt || 'MDX image expanded'}
              className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl"
              layoutId={`img-${src}`}
            />

            {/* Caption in overlay */}
            {displayCaption && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mt-4 text-sm text-zinc-500 max-w-prose text-center px-4"
              >
                {displayCaption}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
