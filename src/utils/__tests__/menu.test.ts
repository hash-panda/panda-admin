import { generateMenuFromRoutes } from '../menu';
import type { RouteRecordRaw } from 'vue-router';

describe('generateMenuFromRoutes', () => {
  it('should filter out hidden routes', () => {
    const routes: RouteRecordRaw[] = [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'dashboard' },
        component: { template: '<div></div>' }
      },
      {
        path: '/hidden',
        name: 'Hidden',
        meta: { title: '隐藏菜单', hidden: true },
        component: { template: '<div></div>' }
      }
    ];

    const menu = generateMenuFromRoutes(routes);
    expect(menu).toHaveLength(1);
    expect(menu[0].title).toBe('仪表盘');
  });

  it('should preserve hierarchical structure', () => {
    const routes: RouteRecordRaw[] = [
      {
        path: '/system',
        name: 'System',
        meta: { title: '系统管理', icon: 'setting' },
        component: { template: '<div></div>' },
        children: [
          {
            path: 'user',
            name: 'User',
            meta: { title: '用户管理' },
            component: { template: '<div></div>' }
          }
        ]
      }
    ];

    const menu = generateMenuFromRoutes(routes);
    expect(menu).toHaveLength(1);
    expect(menu[0].title).toBe('系统管理');
    expect(menu[0].children).toHaveLength(1);
    expect(menu[0].children?.[0].title).toBe('用户管理');
  });

  it('should handle empty routes', () => {
    const menu = generateMenuFromRoutes([]);
    expect(menu).toEqual([]);
  });
});
