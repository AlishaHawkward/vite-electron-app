import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [reactRefresh(), eslintPlugin({
    include: ['./src/**/*.ts', './src/**/*.tsx'],
    fix: true
  })],
  build: {
    outDir: './dist/render',
    emptyOutDir: true,
  },
});
