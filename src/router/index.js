import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: 'wps/excel', component: defineAsyncComponent(() => import('../views/wps/excel/index.vue')) },
        { path: 'wps/excel/info', component: defineAsyncComponent(() => import('../views/wps/excel/info.vue')) },
        { path: 'wps/excel/edit', component: defineAsyncComponent(() => import('../views/wps/excel/edit.vue')) },
        { path: 'wps/word', component: defineAsyncComponent(() => import('../views/wps/word/index.vue')) },
        { path: 'wps/pdf', component: defineAsyncComponent(() => import('../views/wps/pdf/index.vue')) },
        { path: 'other/g6', component: defineAsyncComponent(() => import('../views/other/g6/index.vue')) },
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
