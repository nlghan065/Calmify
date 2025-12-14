import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    allowedHosts: [/\.trycloudflare\.com$/],
    host: "0.0.0.0", // hoặc subdomain tunnel của bạn
  },
});
