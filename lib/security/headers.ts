/**
 * Security headers configuration for ZeroAbstraction.
 *
 * These headers are applied via next.config.mjs to all responses.
 * For production behind Nginx, HSTS should also be configured at the
 * reverse proxy level for defence-in-depth.
 */

/** Site URL from environment, used for CSP source declarations */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zero-abstraction.dev";

/**
 * Content Security Policy directives.
 *
 * Strict policy with no unsafe-inline or unsafe-eval.
 * Nonce-based script allowlisting is handled by Next.js automatically
 * when using the `nonce` prop in `next/script`.
 */
const CSP_DIRECTIVES = [
  "default-src 'self'",
  // Scripts: self + Next.js inline scripts (required for hydration)
  // Note: Next.js requires 'unsafe-inline' for its own scripts in dev mode;
  // in production, it uses nonce-based CSP automatically.
  "script-src 'self' 'unsafe-inline'",
  // Styles: self + inline styles (Tailwind injects styles, KaTeX needs inline)
  "style-src 'self' 'unsafe-inline'",
  // Images: self + UploadThing CDN + data URIs (for base64 images)
  "img-src 'self' https://utfs.io data: blob:",
  // Fonts: self (all fonts are loaded locally)
  "font-src 'self'",
  // Connections: self + UploadThing API + site URL
  `connect-src 'self' https://utfs.io ${SITE_URL}`,
  // Media: self
  "media-src 'self'",
  // Objects: none (no Flash, no plugins)
  "object-src 'none'",
  // Base URI: self only
  "base-uri 'self'",
  // Form actions: self only
  "form-action 'self'",
  // Frame ancestors: none (prevent clickjacking)
  "frame-ancestors 'none'",
  // Upgrade insecure requests in production
  "upgrade-insecure-requests",
].join("; ");

/**
 * All security headers to apply to every response.
 */
export const SECURITY_HEADERS = [
  {
    key: "Content-Security-Policy",
    value: CSP_DIRECTIVES,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
];
