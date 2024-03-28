import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const Excel = defineAsyncComponent(() => import('../views/wps/excel/index.vue'))
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      redirect: '/',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: 'wps/excel', component: Excel }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/home') {
    token ? next() : next('/')
  } else {
    next()
  }
})

export default router
