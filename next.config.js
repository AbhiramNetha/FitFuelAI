/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Enable standalone output for Docker
  output: 'standalone',
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
