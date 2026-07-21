const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.public",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
