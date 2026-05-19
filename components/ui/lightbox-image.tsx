'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LightboxImage({ src, alt, onDrag, onDragStart, onDragEnd, onAnimationStart, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isOpen, setIsOpen] = useState(false);

  if (!src) return null;

  return (
    <>
      <motion.img
        src={src}
        alt={alt || 'MDX image'}
        className="cursor-zoom-in rounded-lg shadow-md my-8 w-full object-cover transition-opacity hover:opacity-90"
        onClick={() => setIsOpen(true)}
        layoutId={`img-${src}`}
        {...props}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            <motion.img
              src={src}
              alt={alt || 'MDX image expanded'}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
              layoutId={`img-${src}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
