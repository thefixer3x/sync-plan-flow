import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  define: {
    __APP_BUILD_ID__: JSON.stringify("test-build-id"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["tests/**", "node_modules/**"],
  },
});
