/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactive les vérifications ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dicte-backend.onrender.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 