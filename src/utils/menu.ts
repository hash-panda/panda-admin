import type { RouteRecord, MenuItem, RouteMeta } from '../types/route'

/**
 * 将路由数据转换为菜单数据
 * @param routes 路由记录数组
 * @returns 菜单项数组
 */
export function transformRoutesToMenu(routes: RouteRecord[]): MenuItem[] {
  const menuItems: MenuItem[] = []

  for (const route of routes) {
    // 跳过隐藏的路由
    if (route.meta?.hidden) {
      continue
    }

    const menuItem: MenuItem = {
      key: route.name || route.path,
      label: route.meta?.title || route.path,
      path: route.path,
      order: route.meta?.order,
    }

    // 添加图标（如果有）
    if (route.meta?.icon) {
      menuItem.icon = route.meta.icon
    }

    // 递归处理子路由
    if (route.children && route.children.length > 0) {
      const childrenMenu = transformRoutesToMenu(route.children)
      if (childrenMenu.length > 0) {
        menuItem.children = childrenMenu
      }
    }

    menuItems.push(menuItem)
  }

  // 根据权重排序
  return sortMenuItems(menuItems)
}

/**
 * 根据权重对菜单项进行排序
 * @param menuItems 菜单项数组
 * @returns 排序后的菜单项数组
 */
function sortMenuItems(menuItems: MenuItem[]): MenuItem[] {
  return menuItems.sort((a, b) => {
    const orderA = a.order ?? Number.MAX_SAFE_INTEGER
    const orderB = b.order ?? Number.MAX_SAFE_INTEGER
    return orderA - orderB
  })
}

/**
 * 过滤隐藏的路由
 * @param routes 路由记录数组
 * @returns 过滤后的路由记录数组
 */
export function filterHiddenRoutes(routes: RouteRecord[]): RouteRecord[] {
  return routes.filter(route => {
    // 如果当前路由被隐藏，则过滤掉
    if (route.meta?.hidden) {
      return false
    }

    // 如果有子路由，递归过滤
    if (route.children && route.children.length > 0) {
      route.children = filterHiddenRoutes(route.children)
      // 如果所有子路由都被过滤掉了，则也过滤掉父路由（除非父路由有可访问的组件）
      return route.children.length > 0 || !route.meta?.hidden
    }

    return true
  })
}

/**
 * 提取路由的元信息
 * @param route 路由记录
 * @param key 元信息键名
 * @returns 元信息值
 */
export function getRouteMeta<T = any>(route: RouteRecord, key: keyof RouteMeta): T | undefined {
  return route.meta?.[key] as T | undefined
}

/**
 * 根据路径查找菜单项
 * @param menuItems 菜单项数组
 * @param path 路由路径
 * @returns 找到的菜单项，未找到则返回 undefined
 */
export function findMenuItemByPath(menuItems: MenuItem[], path: string): MenuItem | undefined {
  for (const item of menuItems) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      const found = findMenuItemByPath(item.children, path)
      if (found) {
        return found
      }
    }
  }
  return undefined
}

/**
 * 获取菜单的面包屑路径
 * @param menuItems 菜单项数组
 * @param targetPath 目标路径
 * @returns 面包屑菜单项数组
 */
export function getBreadcrumbPath(menuItems: MenuItem[], targetPath: string): MenuItem[] {
  const breadcrumbs: MenuItem[] = []

  function search(items: MenuItem[], path: string, currentPath: MenuItem[]): boolean {
    for (const item of items) {
      const newPath = [...currentPath, item]

      if (item.path === path) {
        breadcrumbs.push(...newPath)
        return true
      }

      if (item.children) {
        if (search(item.children, path, newPath)) {
          return true
        }
      }
    }
    return false
  }

  search(menuItems, targetPath, [])
  return breadcrumbs
}
