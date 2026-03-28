import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import type { AppRouteModule } from './types';

// Layouts
const Layout = () => import('@/layouts/default/index.vue');

// Routes
export const basicRoutes: AppRouteModule[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/home',
    meta: {
      title: 'Dashboard',
      icon: 'dashboard',
    },
    children: [
      {
        path: 'home',
        name: 'DashboardHome',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/ai-studio',
    name: 'AIStudio',
    component: Layout,
    redirect: '/ai-studio/page-builder',
    meta: {
      title: 'AI 工作室',
      icon: 'robot',
    },
    children: [
      {
        path: 'page-builder',
        name: 'AIPageBuilder',
        component: () => import('@/views/ai-studio/page-builder/index.vue'),
        meta: {
          title: '页面构建器',
        },
      },
      {
        path: 'code-generator',
        name: 'AICodeGenerator',
        component: () => import('@/views/ai-studio/code-generator/index.vue'),
        meta: {
          title: '代码生成器',
        },
      },
      {
        path: 'chat-assistant',
        name: 'AIChatAssistant',
        component: () => import('@/views/ai-studio/chat-assistant/index.vue'),
        meta: {
          title: 'AI 助手',
        },
      },
    ],
  },
];

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: basicRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export default router;
