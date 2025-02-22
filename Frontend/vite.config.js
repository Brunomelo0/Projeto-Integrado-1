import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'babel-plugin-styled-components',
            {
              ssr: false, // Desativar SSR (não é necessário para Electron)
              displayName: true, // Ativar nomes de componentes no DOM
              preprocess: false, // Desativar pré-processamento
            },
          ],
        ],
      },
    }),
  ],
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  server: {
    port: 5173,
  },
});