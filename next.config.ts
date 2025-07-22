/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ JS aur CSS minify karega
  swcMinify: true,

  // ✅ Image optimization
  images: {
    formats: ['image/avif', 'image/webp'], // faster formats
    minimumCacheTTL: 60,
  },

  // ✅ GZIP compression enable
  compress: true,

  // ✅ Experimental optimizations (safe to enable)
  experimental: {
    optimizeCss: true,            // Tailwind ke liye achha hai
    scrollRestoration: true,      // page scroll state preserve karega
    optimizePackageImports: [     // heavy packages ko optimize karega
      'react-icons',
      'lucide-react',
      'framer-motion',
      'recharts',
    ],
  },
};

module.exports = nextConfig;
