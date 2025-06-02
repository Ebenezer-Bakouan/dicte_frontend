/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactive les vérifications ESLint pendant le build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 