import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "images.unsplash.com",
      "r2.cloudflarestorage.com",
      "8edf5348d3294520cc7f4ca5ee20cca1.r2.cloudflarestorage.com",
    ],
  },
};

export default withNextIntl(nextConfig);
