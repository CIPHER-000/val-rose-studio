import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/webp"],
    deviceSizes: [640, 828, 1080, 1200, 1920],
  },
  poweredByHeader: false,
};

export default nextConfig;
