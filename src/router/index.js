import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
// import NotFound from '@/views/404.vue'

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
        { path: 'wps/excel', component: () => import('../views/wps/excel/index.vue') },
        { path: 'wps/excel/info', component: () => import('../views/wps/excel/info.vue') },
        { path: 'wps/excel/edit', component: () => import('../views/wps/excel/edit.vue') },
        { path: 'wps/word', component: () => import('../views/wps/word/index.vue') },
        { path: 'wps/pdf', component: () => import('../views/wps/pdf/index.vue') },
        { path: 'map/cesium', component: () => import('../views/map/cesium/index.vue') },
        { path: 'map/leaflet', component: () => import('../views/map/leaflet/index.vue') },
        { path: 'other/img', component: () => import('../views/other/img/index.vue') },
        { path: 'other/g6', component: () => import('../views/other/g6/index.vue') }
        // { path: '*', component: NotFound }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    to.path === '/login' ? next() : next('/login')
  }
})

export default router
