/** @type {import('next').NextConfig} */
require("dotenv").config();
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_URL}/:path*`,
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
