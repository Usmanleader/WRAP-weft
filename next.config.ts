import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        https: false,
        http: false,
        path: false,
      };
      
      // Also alias node: protocol imports
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:fs': false,
        'node:https': false,
        'node:path': false,
      };
    }
    return config;
  },
};

export default nextConfig;
