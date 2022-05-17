/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["localhost", "cdn.orsive.com", "cdn.discordapp.com"],
  },
  pwa: {
    dest: "public",
    register: false,
    cacheOnFrontEndNav: true,
    skipWaiting: false,
    disable: false,
    dynamicStartUrlRedirect: true,
  },
};

module.exports = withPWA(nextConfig);
