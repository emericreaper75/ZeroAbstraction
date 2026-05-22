"use client";

import { motion } from "framer-motion";

/**
 * Animated progress bar for the Hero section's "knowledge graph" card.
 * Isolated as a client component to keep the Hero itself server-rendered.
 */
export function HeroProgressBar() {
  return (
    <motion.div
      className="h-full bg-cyan-500"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
    />
  );
}
