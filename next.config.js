/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placekitten.com",
        port: "3000",
        pathname: "/30/30",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
