import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/sqlite3.wasm",
          destination: "/demo-app/sqlite3.wasm",
        },
      ],
    };
  },
};

export default nextConfig;
