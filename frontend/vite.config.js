import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    {
      name: "treat-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, { loader: "jsx", jsx: "automatic" });
      },
    },
    react({ jsxRuntime: "automatic" }),
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    allowedHosts: true,
    host: "0.0.0.0",
    port: 3000,
  },
  build: {
    outDir: "build",
  },
});
