"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { PageSkeleton } from "./PageSkeleton";

export default function SkeletonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [activePathname, setActivePathname] = useState(pathname);

  useEffect(() => {
    // When the route pathname changes, set loading to true
    setIsLoading(true);
    setActivePathname(pathname);

    // Keep skeleton loading visible for exactly 1ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-neutral-950">
      <AnimatePresence mode="popLayout">
        {isLoading && (
          <motion.div
            key={`skeleton-${activePathname}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[99999] bg-[#050810] w-full h-screen overflow-y-auto"
          >
            <PageSkeleton pathname={activePathname} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={`content-${activePathname}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
