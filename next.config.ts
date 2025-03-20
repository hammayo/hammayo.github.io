import { NextConfig } from 'next';
import { env, isGithubActions, repo, basePath, assetPrefix } from './src/lib/env';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: env.NODE_ENV === "production" ? "build" : ".next",
  output: 'export',
  images: {
    unoptimized: true,
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
};

export default nextConfig;
