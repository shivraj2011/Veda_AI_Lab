import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @ts-ignore
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3001').trim().replace(/\/$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`
      }
    ]
  }
};

export default nextConfig;
