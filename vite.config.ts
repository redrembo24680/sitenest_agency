import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'oxc',
    cssCodeSplit: false,         // Single CSS file — avoids flash of unstyled content
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React core — stable, long-term cached separately
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // Router — stable vendor chunk
          if (
            id.includes('node_modules/react-router-dom/') ||
            id.includes('node_modules/react-router/')
          ) {
            return 'router';
          }
          // NOTE: lucide-react is NOT split — it's used in App.tsx (footer/header)
          // which renders synchronously. Async icon chunk causes CLS in footer.
          // Let it bundle with whatever imports it (App.tsx → main index chunk).
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
