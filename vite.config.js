import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

const BACKEND_URI = import.meta.env.BACKEND_URI;

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: '../manifest.json'
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      "/route": {
        target: "https://backend-iva0.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});