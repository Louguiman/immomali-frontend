const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudflarestorage.com",
        pathname: "/**",
      },
    ],
    // unoptimized: true, // Désactive l'optimisation Next.js pour images distantes
  },
};

module.exports = withNextIntl(nextConfig);
