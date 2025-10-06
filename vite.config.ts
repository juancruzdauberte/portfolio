import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimización de chunks para mejor cache
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks para mejor cache
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'icons': ['react-icons'],
        },
      },
    },
    // Optimizar el tamaño del bundle
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Eliminar console.log en producción
        drop_debugger: true,
      },
    },
    // Reportar tamaño del bundle
    reportCompressedSize: true,
    // Aumentar el límite de advertencia de chunk
    chunkSizeWarningLimit: 1000,
  },
  // Optimizaciones de desarrollo
  server: {
    hmr: {
      overlay: true,
    },
  },
  // Optimizar dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-icons',
      'i18next',
      'react-i18next',
    ],
  },
})
