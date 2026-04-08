import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          highlight: [
            "highlight.js/lib/core",
            "highlight.js/lib/languages/bash",
            "highlight.js/lib/languages/css",
            "highlight.js/lib/languages/javascript",
          ],
          download: ["html2canvas"],
          designSystem: ["sensorario-design-system/Button"],
        },
      },
    },
  },
});
