import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/meal.ts',
      formats: ['es'],
    },
    rollupOptions: {
      // external: /^lit/,
      input: {
        main: 'index.html',
      }
    }
  }
})
