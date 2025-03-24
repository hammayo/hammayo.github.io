import { NextConfig } from 'next';
import { env, basePath, assetPrefix } from './src/lib/env';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: env.NODE_ENV === "production" ? "out" : ".next",
  output: 'export',
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'web-assets.same.dev',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'repository-images.githubusercontent.com',
      },
    ],
  },
  basePath,
  assetPrefix,
  typescript: {
    ignoreBuildErrors: false,
  },
  trailingSlash: true,
};

export default nextConfig;
