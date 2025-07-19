import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
