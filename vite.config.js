import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Raise warning threshold — some large assets are expected
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        // Split vendor libs from app code
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-lucide': ['lucide-react'],
        },
      },
    },
    // Compress assets
    assetsInlineLimit: 4096, // inline assets < 4KB as base64
  },
})
