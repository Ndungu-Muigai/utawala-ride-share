import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //Configuring the image domains to allow loading images from unsplash.com
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.magnific.com",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
      }
    ],
  },
};

export default nextConfig;
