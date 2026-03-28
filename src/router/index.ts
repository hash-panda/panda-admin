import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined'
    }
  },
  {
    path: '/ai',
    name: 'AI',
    meta: {
      title: 'AI 工具',
      icon: 'RobotOutlined'
    },
    children: [
      {
        path: 'page-builder',
        name: 'PageBuilder',
        component: () => import('@/views/ai/page-builder.vue'),
        meta: {
          title: '页面构建器',
          icon: 'BuildOutlined'
        }
      },
      {
        path: 'code-gen',
        name: 'CodeGen',
        component: () => import('@/views/ai/code-gen.vue'),
        meta: {
          title: '代码生成器',
          icon: 'CodeOutlined'
        }
      },
      {
        path: 'chat-assistant',
        name: 'ChatAssistant',
        component: () => import('@/views/ai/chat-assistant.vue'),
        meta: {
          title: '聊天助手',
          icon: 'MessageOutlined'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
