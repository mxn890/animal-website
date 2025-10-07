import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ✅ Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // ✅ GZIP compression enable
  compress: true,

  // ✅ Experimental optimizations (safe to enable)
  experimental: {
    optimizeCss: true,            // Tailwind ke liye achha hai
    scrollRestoration: true,      // page scroll state preserve karega
    optimizePackageImports: [     // heavy packages ko optimize karega
      "react-icons",
      "lucide-react",
      "framer-motion",
      "recharts",
    ],
  },
};

export default nextConfig;
