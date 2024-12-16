import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// Fix for __dirname in Vite
const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
