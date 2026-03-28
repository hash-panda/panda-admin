import { RouteLocationNormalized } from 'vue-router'
import { message } from 'ant-design-vue'

/**
 * 路由错误类型
 */
export enum RouteErrorType {
  NOT_FOUND = 'NOT_FOUND',
  FORBIDDEN = 'FORBIDDEN',
  SERVER_ERROR = 'SERVER_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  AUTH_ERROR = 'AUTH_ERROR',
}

/**
 * 路由错误处理接口
 */
export interface RouteErrorHandler {
  type: RouteErrorType
  message: string
  redirectPath?: string
}

/**
 * 处理路由错误
 */
export function handleRouteError(error: RouteErrorHandler, router: any) {
  console.error('路由错误:', error)

  // 显示错误提示
  message.error(error.message)

  // 根据错误类型进行重定向
  if (error.redirectPath) {
    router.push(error.redirectPath)
  }
}

/**
 * 检查路由是否需要权限
 */
export function checkRoutePermission(
  to: RouteLocationNormalized,
  permissions: string[],
  roles: string[]
): { hasPermission: boolean; error?: RouteErrorHandler } {
  // 检查权限
  const requiredPermissions = to.meta?.permissions as string[] | undefined
  const requiredRoles = to.meta?.roles as string[] | undefined

  if (!requiredPermissions && !requiredRoles) {
    return { hasPermission: true }
  }

  let hasPermission = true

  if (requiredPermissions && requiredPermissions.length > 0) {
    hasPermission = requiredPermissions.some((p) => permissions.includes(p))
  }

  if (requiredRoles && requiredRoles.length > 0) {
    hasPermission = hasPermission && requiredRoles.some((r) => roles.includes(r))
  }

  if (!hasPermission) {
    return {
      hasPermission: false,
      error: {
        type: RouteErrorType.FORBIDDEN,
        message: '您没有权限访问该页面',
        redirectPath: '/403',
      },
    }
  }

  return { hasPermission: true }
}

/**
 * 安全的路由跳转，带有错误处理
 */
export async function safeRoutePush(
  router: any,
  path: string,
  options?: { query?: Record<string, any>; params?: Record<string, any> }
): Promise<boolean> {
  try {
    await router.push({
      path,
      query: options?.query,
      params: options?.params,
    })
    return true
  } catch (error: any) {
    console.error('路由跳转失败:', error)

    // 处理不同的错误类型
    if (error.name === 'NavigationDuplicated') {
      // 重复导航，忽略
      return true
    }

    if (error.name === 'NavigationAborted') {
      // 导航被中止
      message.warning('导航已取消')
      return false
    }

    // 其他错误
    handleRouteError(
      {
        type: RouteErrorType.NETWORK_ERROR,
        message: '页面跳转失败，请重试',
      },
      router
    )
    return false
  }
}
