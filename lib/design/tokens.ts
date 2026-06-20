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

// ── Surface Hierarchy Opacity Constants ──────────────────────────
export const SURFACE_OPACITY = {
  base: 1.0,
  elevated: 1.0,
  floating: 0.85,
  glass: 0.6,
};

// ── Border Opacity Constants ─────────────────────────────────────
export const BORDER_OPACITY = {
  hairline: 0.04,
  elevated: 0.08,
  glass: 0.06,
  interactive: 0.12,
  active: 0.20,
};

// Framer Motion Springs
export const SPRING = {
  // Snappy, subtle bounce
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  // Smooth, premium feel (Apple-like) — slower for expensive motion
  smooth: { type: "spring" as const, stiffness: 80, damping: 22 },
  // Heavy, slow (for large layouts)
  heavy: { type: "spring" as const, stiffness: 50, damping: 15 },
  // Gentle — for subtle hover elevation shifts
  gentle: { type: "spring" as const, stiffness: 120, damping: 18 },
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

// ── Typography Constants (for JS-side calculations) ──────────────
export const TYPOGRAPHY = {
  lineHeight: {
    display: 1.1,
    heading: 1.2,
    body: 1.75,
    caption: 1.5,
  },
  letterSpacing: {
    display: "-0.03em",
    heading: "-0.02em",
    body: "-0.006em",
    overline: "0.12em",
    meta: "0.06em",
  },
};
