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
  // Premium easeOut — used for reveals, inspired by Linear
  premium: [0.16, 1, 0.3, 1] as [number, number, number, number],
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
 * Slowed to 8s cycle for a more premium, expensive feel
 */
export const floatingVariant: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

// ── New Motion Variants ──────────────────────────────────────────────

/**
 * Viewport-triggered reveal
 * Used by homepage sections, cards, and content blocks.
 * Restrained: 12px translateY, cinematic ease.
 */
export const revealVariant: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASING.premium,
    },
  },
};

/**
 * Hover elevation for interactive surfaces
 * Subtle translateY shift + scale. Used via whileHover.
 */
export const hoverElevation = {
  y: -2,
  scale: 1.005,
  transition: SPRING.gentle,
};

/**
 * Navbar slide-down on initial page load
 */
export const navSlideDown: Variants = {
  initial: { opacity: 0, y: -8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: EASING.premium,
    },
  },
};

/**
 * Helper for generating spring transitions
 */
export const getSpring = (type: keyof typeof SPRING = "smooth") => {
  return SPRING[type];
};
