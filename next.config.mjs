/** @type {import('next').NextConfig} */
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
};

export default nextConfig;
