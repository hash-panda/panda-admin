import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { setupGuards } from '@/guards'

// 静态路由配置
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      requiresAuth: false,
    },
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/exception/403.vue'),
    meta: {
      title: '403',
      requiresAuth: false,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/exception/404.vue'),
    meta: {
      title: '404',
      requiresAuth: false,
    },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/exception/500.vue'),
    meta: {
      title: '500',
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/dashboard',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    // 404 必须放在最后，用于匹配所有未定义的路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 }),
})

// 设置路由守卫
setupGuards(router)

export default router
