import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr()],
  preview: {
    port: 8080,
    strictPort: true,
   },
  server: {
    port: 3000,
    host: true,
    watch: {
       usePolling: true,
    },
  },
  base: '/',
  build: {
    //add this property for react devtools
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});
