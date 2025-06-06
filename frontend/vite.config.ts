import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

// https://vite.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'build',
  },
  test: {
    globals: true, // Allows using `describe`, `it`, `expect` without imports
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './src/setupTests.js', // File for test setup (see below)
    css: true, // Optional: Include CSS in tests if needed
  },
})
