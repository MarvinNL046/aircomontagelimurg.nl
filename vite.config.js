import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    minify: 'terser',
    cssMinify: true,
    sourcemap: false,
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        faq: './faq.html',
        producten: './producten.html',
        heerlen: './heerlen.html',
        sittard: './sittard.html',
        maastricht: './maastricht.html',
        webhookTest: './webhook-test.html'
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name][extname]`;
          }
          if (extType === 'css') {
            return `css/[name][extname]`;
          }
          if (extType === 'js') {
            return `js/[name][extname]`;
          }
          return `assets/[name][extname]`;
        },
        manualChunks: {
          vendor: ['@emailjs/browser'],
          toast: ['react-hot-toast']
        }
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 8847,
    host: 'localhost',
    open: true
  },
  define: {
    'process.env': process.env
  }
});