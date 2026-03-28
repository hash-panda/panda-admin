import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

// Routes
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layouts/default/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '仪表板',
          icon: 'DashboardOutlined',
        },
      },
      {
        path: '/ai-workspace',
        name: 'AIWorkspace',
        component: () => import('@/views/ai-workspace/index.vue'),
        meta: {
          title: 'AI 工作台',
          icon: 'RobotOutlined',
        },
      },
    ],
  },
];

// Create router instance
const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

// Setup router
export function setupRouter(app: App) {
  app.use(router);
  return router;
}

export default router;
