/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  strictMode: true
}

module.exports = {
  nextConfig,

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false,
      },
    ]
  },
}
