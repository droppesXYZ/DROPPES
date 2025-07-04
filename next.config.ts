import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Domínios que ainda são usados diretamente (sem proxy)
      {
        protocol: 'https',
        hostname: 'app.fragmetric.xyz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 't0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.rate-x.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'linea.build',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ['bcryptjs']
};

export default nextConfig;
