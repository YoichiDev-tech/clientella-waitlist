// Vite configuration for React + TypeScript + Tailwind
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Basic Vite config
  plugins: [react()],
  server: {
    // Helpful for local dev; you can change the port if needed
    port: 5173
  },
  resolve: {
    // Simple path aliases to keep imports clean
    alias: {
      "@": "/src"
    }
  }
});