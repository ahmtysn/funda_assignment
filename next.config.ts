import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'cloud.funda.nl',
        pathname: '/valentina_media/**',
      },
      {
        protocol: 'https',
        hostname: 'cloud.funda.nl',
        pathname: '/valentina_media/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.fstatic.nl',
      },
    ],
  },
};

export default nextConfig;
