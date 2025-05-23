import path from 'node:path';

import EnvironmentPlugin from 'vite-plugin-environment';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  plugins: [EnvironmentPlugin(['VITE_API_BASE_URL', 'VITE_GRAPHQL_URI']) as any],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['src/@types', 'node_modules']
  }
});
