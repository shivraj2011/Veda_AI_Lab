import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  typescript: {
    ignoreBuildErrors: true,
  },
  // @ts-ignore
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3001').trim();
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`
      }
    ]
  }
};

export default nextConfig;
