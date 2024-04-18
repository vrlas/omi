import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import svg from 'vite-svg-loader'

export default defineConfig({
  plugins: [
    vue(),
    svg(),
    AutoImport({ resolvers: [ElementPlusResolver(), VantResolver()] }),
    Components({ resolvers: [ElementPlusResolver(), VantResolver()] })
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
