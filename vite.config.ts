import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['buffer', 'process'],
      esbuildOptions: {
        define: {
          global: 'globalThis'
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        buffer: 'buffer',
        process: 'process/browser',
      },
    },
    define: {
      'process.env': env,
      global: 'globalThis',
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true,
      open: true,
      cors: true,
      hmr: {
        host: 'localhost',
        port: 5173,
      },
    },
    build: {
      rollupOptions: {
        external: ['buffer', 'process'],
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
      sourcemap: true,
    },
  };
});
