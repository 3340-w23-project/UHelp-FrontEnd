/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/uhelp-api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/forum",
        destination: "/forum/1",
        permanent: true,
      },
    ];
  }
};

module.exports = nextConfig;
