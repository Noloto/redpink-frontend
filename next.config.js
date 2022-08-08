const { isPropertyAccessChain } = require('typescript');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.shopify.com'],
  },
  env: {
    STOREFRONT_API_URL: process.env.STOREFRONT_API_URL,
    STOREFRONT_ACCESS_TOKEN: process.env.STOREFRONT_ACCESS_TOKEN,
    MAINTENANCE: process.env.MAINTENANCE,
    PASSWORD: process.env.PASSWORD,
  },
};

module.exports = nextConfig;
