import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/scss/app.scss', // Point d'entrée SCSS
        'resources/js/app.jsx',    // Point d'entrée JSX
      ],
      refresh: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'resources/js'),
      '~scss': path.resolve(__dirname, 'resources/scss'),
    },
  },
  // ❌ Supprimé : la config PostCSS ici n’est pas nécessaire
});
