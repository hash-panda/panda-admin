import type { RouteRecordRaw } from 'vue-router'
import type { BackendRoute } from '../types/route'

/**
 * 组件映射表
 * 将后端返回的组件字符串映射到实际的组件
 */
const componentMap: Record<string, () => Promise<any>> = {
  // Layout 组件
  Layout: () => import('@/layouts/index.vue'),
  ParentView: () => import('@/components/ParentView.vue'),
  
  // 示例页面组件（根据实际项目路径调整）
  Dashboard: () => import('@/views/dashboard/index.vue'),
  UserManagement: () => import('@/views/system/user/index.vue'),
  RoleManagement: () => import('@/views/system/role/index.vue'),
  MenuManagement: () => import('@/views/system/menu/index.vue'),
}

/**
 * 动态加载组件
 * @param componentStr 组件字符串
 * @returns 组件加载函数或 undefined
 */
export function loadComponent(componentStr?: string): (() => Promise<any>) | undefined {
  if (!componentStr) {
    return undefined
  }

  // 如果是 Layout，使用 Layout 组件
  if (componentStr === 'Layout' || componentStr === 'layout') {
    return componentMap.Layout
  }

  // 如果是 ParentView，使用 ParentView 组件
  if (componentStr === 'ParentView' || componentStr === 'parentView') {
    return componentMap.ParentView
  }

  // 从映射表中查找
  if (componentMap[componentStr]) {
    return componentMap[componentStr]
  }

  // 尝试动态导入（支持相对路径）
  if (componentStr.startsWith('@/views/') || componentStr.startsWith('/views/')) {
    const normalizedPath = componentStr.replace(/^@/, '')
    return () => import(/* @vite-ignore */ normalizedPath)
  }

  // 未找到组件，返回 undefined
  console.warn(`Component "${componentStr}" not found in component map`)
  return undefined
}

/**
 * 递归转换后端路由数据为 Vue Router 的 RouteRecordRaw 格式
 * @param routes 后端路由数组
 * @returns Vue Router 路由配置数组
 */
export function transformRoutes(routes: BackendRoute[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []

  for (const route of routes) {
    const routeRecord: RouteRecordRaw = {
      path: route.path,
      name: route.name || String(route.id),
    }

    // 处理组件
    if (route.component) {
      const component = loadComponent(route.component)
      if (component) {
        routeRecord.component = component
      }
    }

    // 处理重定向
    if (route.redirect) {
      routeRecord.redirect = route.redirect
    }

    // 处理元信息
    if (route.meta) {
      routeRecord.meta = route.meta
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      routeRecord.children = transformRoutes(route.children)
    }

    result.push(routeRecord)
  }

  return result
}

/**
 * 注册动态组件到映射表
 * @param key 组件键
 * @param loader 组件加载函数
 */
export function registerComponent(key: string, loader: () => Promise<any>): void {
  componentMap[key] = loader
}

/**
 * 批量注册组件
 * @param components 组件映射对象
 */
export function registerComponents(components: Record<string, () => Promise<any>>): void {
  Object.assign(componentMap, components)
}

/**
 * 获取组件映射表（用于调试）
 * @returns 组件映射表
 */
export function getComponentMap(): Record<string, () => Promise<any>> {
  return { ...componentMap }
}
