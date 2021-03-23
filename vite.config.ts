import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
import localPkgJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [reactRefresh(), eslintPlugin({
    include: ['./src/**/*.ts', './src/**/*.tsx'],
    fix: true
  })],
  define: {
    DEFINE_APP_TITLE: localPkgJson.name
  },
  build: {
    outDir: './dist/render',
    emptyOutDir: true,
  },
});
