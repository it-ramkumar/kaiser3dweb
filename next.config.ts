import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 1. Force these variables to be available to the app
  env: {
    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASS: process.env.ADMIN_PASS,
  },
};

export default nextConfig;
