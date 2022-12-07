/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

module.exports = {
  nextConfig,
  env: {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "apod.nasa.gov",
      "mars.jpl.nasa.gov",
      "epic.gsfc.nasa.gov",
      "www.youtube.com",
    ],
  },
};
