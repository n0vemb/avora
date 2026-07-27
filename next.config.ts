import type { NextConfig } from "next";

const strapiApiUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/uploads/:path*',
        destination: `${strapiApiUrl}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
