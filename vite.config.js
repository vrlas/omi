import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium'
import svg from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    svg(),
    cesium()
  ],
  server: {
    proxy: {
      '/trending': {
        target: 'https://github.com/trending?since=monthly',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
