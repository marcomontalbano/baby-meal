import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/baby-meal/',
  plugins: [
    VitePWA({
      manifest: {
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        name: 'Baby Meal',
        short_name: 'Baby Meal',
        lang: 'en',
        orientation: 'portrait'
      }
    })
  ],
  build: {
    // lib: {
    //   entry: 'src/meal.ts',
    //   formats: ['es'],
    // },
    rollupOptions: {
      // external: /^lit/,
      input: {
        main: 'index.html',
      }
    }
  }
})
