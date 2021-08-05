import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/render',
  base: './',
  alias: {
    '@': path.resolve(__dirname, 'src/render'),
  },
  plugins: [reactRefresh(), eslintPlugin({
    include: ['./src/**/*.ts', './src/**/*.tsx'],
    fix: true
  })],
  build: {
    outDir: './dist/render',
    emptyOutDir: true,
  },
  server: {
    port: 14843,
  },
});
