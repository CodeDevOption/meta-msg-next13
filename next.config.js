/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "links.papareact.com",
      "avatars.githubusercontent.com",
      "platform-lookaside.fbsbx.com",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
