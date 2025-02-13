/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  experimental: {
    serverActions: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
