import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Minify with oxc (Vite 8 default, Rust-based, fast)
    minify: 'oxc',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Rollup options for code splitting
    rollupOptions: {
      output: {
        // Split vendor code into separate chunks
        manualChunks: (id) => {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/')) {
            return 'router';
          }
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    // Warn if a chunk exceeds 500KB
    chunkSizeWarningLimit: 500,
  },
})
