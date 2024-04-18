import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
      path: '/preview',
      component: () => import('../views/preview/index.vue'),
      children: [
        { path: 'login', component: () => import('../views/preview/login/index.vue') },
        { path: 'duorou', component: () => import('../views/preview/duorou/index.vue') }
      ]
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
        { path: 'other/mobile', component: () => import('../views/other/mobile/index.vue') },
        { path: 'other/cool', component: () => import('../views/other/cool/index.vue') },
        { path: 'other/g6', component: () => import('../views/other/g6/index.vue') }
        // { path: '*', component: NotFound }
      ]
    }
  ]
})

router.beforeEach((to, _, next) => {
  const token = localStorage.getItem('token')
  // 配置放行白名单
  if (location.href.includes('/preview')) {
    next()
    return
  }
  if (token) {
    next()
  } else {
    to.path === '/login' ? next() : next('/login')
  }
})

export default router
