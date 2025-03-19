const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "r2.cloudflarestorage.com",
      "8edf5348d3294520cc7f4ca5ee20cca1.r2.cloudflarestorage.com",
    ],
  },
};

module.exports = withNextIntl(nextConfig);
