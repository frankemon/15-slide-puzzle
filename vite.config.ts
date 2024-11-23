import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets", // Specify the directory for static assets
  },
  base: "/projects/15-slide-puzzle/",
  publicDir: "public",
});
