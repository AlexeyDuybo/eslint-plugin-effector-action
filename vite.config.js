import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './index.js',
      name: 'eslint-plugin-effector-action',
      fileName: 'index',
      formats: ['cjs'],
    },
  },
});