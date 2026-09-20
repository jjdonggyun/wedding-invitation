import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 90],
    deviceSizes: [360, 390, 430, 480, 640, 750, 828, 1080],
    imageSizes: [160, 240, 320],
  },
};

export default nextConfig;
