import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3Lottie from 'vue3-lottie'

import App from './App.vue'
import router from './router'
import Github from '@/assets/svg/github.vue'
const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)
isMobile && document.body.classList.add('is-mobile')

createApp(App)
  .component('source-code', Github)
  .use(createPinia())
  .use(router)
  .use(Vue3Lottie)
  .use(ElementPlus)
  .mount('#app')
