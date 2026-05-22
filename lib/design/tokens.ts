/**
 * ZeroAbstraction Design Tokens
 * Single source of truth for motion constants, opacities, z-indices, and JS-based spacing.
 * Most spacing and typography tokens are handled via Tailwind/CSS Variables, 
 * but these constants are required for Framer Motion, canvas drawing, and inline styles.
 */

// Motion Timing (ms)
export const MOTION_TIMING = {
  micro: 150,
  medium: 300,
  large: 600,
  stagger: 100,
};

// Z-Index Hierarchy
export const Z_INDEX = {
  background: -10,
  surface: 10,
  overlay: 50,
  navigation: 100,
  modal: 1000,
  tooltip: 2000,
};

// Opacity Values for specific overlays
export const OPACITY = {
  bgOverlay: 0.04, // 4%
  borderSubtle: 0.08, // 8%
  borderMedium: 0.18, // 18%
  surfaceOverlay: 0.06, // 6%
  surfaceHighlight: 0.12, // 12%
};

// Framer Motion Springs
export const SPRING = {
  // Snappy, subtle bounce
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  // Smooth, premium feel (Apple-like)
  smooth: { type: "spring" as const, stiffness: 100, damping: 20 },
  // Heavy, slow (for large layouts)
  heavy: { type: "spring" as const, stiffness: 50, damping: 15 },
};

// Spacing (px) - used for JS calculations
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
  "3xl": 64,
  "4xl": 96,
};

// Border Radii (px)
export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
};

// Blur radii
export const BLUR = {
  subtle: "8px",
  medium: "16px",
  strong: "24px",
};
