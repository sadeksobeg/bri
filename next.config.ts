/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable strict mode for better development practices
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    // Allow images from local uploads folder
    localPatterns: [
      {
        pathname: "/uploads/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.public",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
  },

  // Compression
  compress: true,

  // Powered by header removal (optional)
  poweredByHeader: false,

  // Headers for performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      {
        // Preload critical fonts
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO (non-production)
  async redirects() {
    return [
      // Force trailing slashes for SEO
      {
        source: "/products",
        destination: "/#products",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/contact",
        destination: "/#contact",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
