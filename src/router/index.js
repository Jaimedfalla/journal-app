import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dayBookRouter from '@/modules/daybook/router'
import authRouter from '@/modules/auth/router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/daybook',
    ...dayBookRouter
  },
  {
    path:'/auth',
    ...authRouter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
