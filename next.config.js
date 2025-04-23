/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'ui-avatars.com'],
    unoptimized: true
  },
  output: 'standalone',
  distDir: '.next'
}

module.exports = nextConfig 