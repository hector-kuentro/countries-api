/** @type {import('next').NextConfig} */

const { NEXT_PUBLIC_API_URL } = process.env

const nextConfig = {
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['upload.wikimedia.org', 'flagcdn.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_API_URL
  },
  serverRuntimeConfig: {
    NEXT_PUBLIC_API_URL
  },
}

module.exports = nextConfig
