/**
 * @type {import('next').NextConfig}
 *
 * Security headers are defined inline here because next.config.mjs
 * cannot import TypeScript modules directly. The canonical reference
 * is lib/security/headers.ts — keep both in sync.
 */
const nextConfig = {
  output: 'standalone',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // UploadThing hosted files (default domain)
      { protocol: 'https', hostname: 'utfs.io' },
    ],
  },
  experimental: {
    optimizePackageImports: ['shiki'],
  },
  eslint: {
    // Lint separately in CI; don't fail the production build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // tsc runs separately; don't duplicate the work during build
    ignoreBuildErrors: false,
  },

  /**
   * Security headers applied to all responses.
   * Covers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options,
   * Referrer-Policy, Permissions-Policy, X-XSS-Protection.
   */
  async headers() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';

    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https://utfs.io data: blob:",
      "font-src 'self'",
      `connect-src 'self' https://utfs.io ${siteUrl}`,
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
