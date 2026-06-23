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
    // Enable CSS code splitting per page chunk
    cssCodeSplit: true,
    // Inline small assets as base64 to reduce HTTP requests
    assetsInlineLimit: 4096,
    // Rollup options for granular code splitting
    rollupOptions: {
      output: {
        // Fine-grained manual chunk splitting for maximum lazy-load benefit
        manualChunks: (id) => {
          // React core — always needed, load early
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          // Router — needed for navigation but not critical for FCP
          if (id.includes('node_modules/react-router-dom/') || id.includes('node_modules/react-router/')) {
            return 'router';
          }
          // Icons — large library, tree-shake on demand
          if (id.includes('node_modules/lucide-react/')) {
            return 'icons';
          }
          // i18n translations — heavy, split out
          if (id.includes('/src/i18n/')) {
            return 'i18n';
          }
          // Mock data — split out so pages load it only when needed
          if (id.includes('/src/data/')) {
            return 'data';
          }
          // Pages — each page gets its own chunk (enables lazy loading)
          if (id.includes('/src/pages/')) {
            const match = id.match(/\/pages\/([^/]+)\./);
            if (match) return `page-${match[1].toLowerCase()}`;
          }
          // Components — shared, load with first needed page
          if (id.includes('/src/components/')) {
            return 'components';
          }
        },
        // Optimized chunk file names for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
    // Warn if a chunk exceeds 400KB
    chunkSizeWarningLimit: 400,
  },
})
