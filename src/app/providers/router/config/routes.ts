import type { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/home')
  },
  {
    path: '/user/:userId',
    name: 'UserDetails',
    component: () => import('@/pages/UserDetails')
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'Page-404',
    component: () => import('@/pages/page404')
  }
]
