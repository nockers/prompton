// @ts-check
const bundleAnalyzer = require("@next/bundle-analyzer")

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
