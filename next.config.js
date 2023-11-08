/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ hostname: 'cdn.shopify.com' }],
  },
  env: {
    STOREFRONT_API_URL: process.env.STOREFRONT_API_URL,
    STOREFRONT_ACCESS_TOKEN: process.env.STOREFRONT_ACCESS_TOKEN,
    MAINTENANCE: process.env.MAINTENANCE,
    EARLY_ACCESS: process.env.EARLY_ACCESS,
    EARLY_ACCESS_PASSWORD: process.env.EARLY_ACCESS_PASSWORD,
  },
};

module.exports = nextConfig;
