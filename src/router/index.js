import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import dayBookRouter from '@/modules/daybook/router'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
