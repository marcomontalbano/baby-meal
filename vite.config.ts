import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        background_color: '#dcf0ff',
        theme_color: '#dcf0ff',
        display: 'fullscreen',
        name: 'Baby Meal',
        short_name: 'Baby Meal',
        lang: 'en',
        orientation: 'portrait'
      }
    })
  ],
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
