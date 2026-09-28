import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Images are pre-optimised to WebP at build time (see scripts/optimize-image.mjs),
  // so we skip Vercel's on-demand image optimisation.
  images: { unoptimized: true },
  async redirects() {
    return [
      // www -> apex (the canonical domain). Also configure this in Vercel > Domains.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.woodflexdesigns.com' }],
        destination: 'https://woodflexdesigns.com/:path*',
        permanent: true,
      },
      // Phase 2 experiences are not part of this build yet; send visitors home.
      // Temporary (307) so these URLs can be reused when Phase 2 ships.
      { source: '/architect', destination: '/', permanent: false },
      { source: '/house-owner', destination: '/', permanent: false },
      { source: '/cafe-owner', destination: '/', permanent: false },
      { source: '/lead/:id', destination: '/', permanent: false },
    ];
  },
};

export default nextConfig;
