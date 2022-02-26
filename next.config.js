/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/matches/:path*',
        destination: '/match/:path*',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
