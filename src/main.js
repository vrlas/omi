import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'

import App from './App.vue'
import router from './router'
import Github from '@/assets/svg/github.vue'

createApp(App)
  .component('source-code', Github)
  .use(createPinia())
  .use(router)
  .use(Vue3Lottie)
  .use(ElementPlus)
  .mount('#app')
