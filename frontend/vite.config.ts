import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// @ts-ignore
export default defineConfig({
  plugins: [react()],
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
