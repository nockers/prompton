/* eslint-disable @typescript-eslint/no-var-requires */
const bundleAnalyzer = require("@next/bundle-analyzer")
const packageJSON = require("./package.json")

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: false,
    scrollRestoration: true,
  },
  env: {
    NEXT_PUBLIC_SENTRY_RELEASE: packageJSON.version,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
