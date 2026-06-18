import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from 'fs'

const { version } = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
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
