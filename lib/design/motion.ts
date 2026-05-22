import { Variants } from "framer-motion";
import { SPRING, MOTION_TIMING } from "./tokens";

/**
 * Reusable Framer Motion configurations for ZeroAbstraction.
 * 
 * Note: Components using these must implement `useReducedMotion`
 * internally if they do heavy layout changes, though these standard 
 * variants use opacity and slight translateY which are mostly safe.
 */

// Easing Functions
export const EASING = {
  cinematic: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number], // Smooth, classic curve
  restrained: [0.4, 0.0, 0.2, 1.0] as [number, number, number, number], // Material standard
  linear: [0.0, 0.0, 1.0, 1.0] as [number, number, number, number],
};

/**
 * Standard Fade Up Reveal
 * Useful for text blocks, cards, headings.
 */
export const fadeUpVariant: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_TIMING.medium / 1000,
      ease: EASING.cinematic,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: MOTION_TIMING.micro / 1000 },
  },
};

/**
 * Subtle scale and fade for premium reveals (e.g. hero images)
 */
export const entryScaleVariant: Variants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_TIMING.large / 1000,
      ease: EASING.cinematic,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: MOTION_TIMING.micro / 1000 },
  },
};

/**
 * Container for staggering children
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: MOTION_TIMING.stagger / 1000,
      delayChildren: 0.1, // Slight delay before sequence
    },
  },
};

/**
 * Ambient floating motion for backgrounds/atmospheres
 */
export const floatingVariant: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

/**
 * Helper for generating spring transitions
 */
export const getSpring = (type: keyof typeof SPRING = "smooth") => {
  return SPRING[type];
};
