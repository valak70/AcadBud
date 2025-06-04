import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,          // Explicitly use 5173
    strictPort: true,    // Error if 5173 is taken — no silent fallback
    watch: {
      usePolling: true,  // Docker-friendly: ensures FS changes are detected
      interval: 100,
    },
    proxy: {
      '/api': {
        target: 'http://backend:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
