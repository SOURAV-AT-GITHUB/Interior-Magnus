import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Ensures the build is using modern JavaScript (ES modules)
    modulePreload: true, // Ensures the use of <link rel="modulepreload"> for faster loading
    rollupOptions: {
      output: {
        // Ensure proper module loading and naming
        format: 'es',
      },
    },
  },
});
