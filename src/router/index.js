import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      title: '仪表盘',
      icon: 'DashboardOutlined',
      closable: false
    }
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/Users.vue'),
    meta: {
      title: '用户管理',
      icon: 'UserOutlined',
      closable: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      title: '系统设置',
      icon: 'SettingOutlined',
      closable: true
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
    meta: {
      title: '产品管理',
      icon: 'ShoppingOutlined',
      closable: true
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue'),
    meta: {
      title: '订单管理',
      icon: 'FileTextOutlined',
      closable: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
