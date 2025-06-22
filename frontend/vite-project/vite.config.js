/// <reference types="vitest"/>
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: "./__tests__/vitest.setup.js",
    environment: "jsdom",
    globals: true,
  },
});
