import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react";
          }

          if (id.includes("highlight.js/lib/")) {
            return "highlight";
          }

          if (id.includes("html2canvas")) {
            return "download";
          }

          if (id.includes("sensorario-design-system")) {
            return "designSystem";
          }
        },
      },
    },
  },
});
