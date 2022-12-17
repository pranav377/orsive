// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
/** @type {import('next').NextConfig} */
const { withSentryConfig } = require("@sentry/nextjs");

const withPWA = require("next-pwa")({
  dest: "public",
  register: false,
  cacheOnFrontEndNav: true,
  dynamicStartUrlRedirect: true,
});

const moduleExports = withPWA({
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
    domains: [
      "localhost",
      "cdn.orsive.com",
      "cdn.discordapp.com",
      "placeimg.com",
    ],
  },
});

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, {
  silent: true,
  hideSourceMaps: true,
});
