import { Router } from 'vue-router'
import { useUserStore } from '@/store/user'
import { usePermissionStore } from '@/store/permission'

export function setupPermissionGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()

    // 如果路由不需要认证，直接放行
    if (!to.meta?.requiresAuth) {
      next()
      return
    }

    // 检查用户是否登录
    if (!userStore.isLoggedIn) {
      // 未登录，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
      return
    }

    // 检查路由权限要求
    const requiredPermissions = to.meta?.permissions as string[] | undefined
    const requiredRoles = to.meta?.roles as string[] | undefined

    // 如果没有权限要求，直接放行
    if (!requiredPermissions && !requiredRoles) {
      next()
      return
    }

    // 检查权限
    let hasPermission = true

    if (requiredPermissions && requiredPermissions.length > 0) {
      hasPermission = permissionStore.hasAnyPermission(requiredPermissions)
    }

    // 检查角色
    let hasRole = true

    if (requiredRoles && requiredRoles.length > 0) {
      hasRole = permissionStore.hasAnyRole(requiredRoles)
    }

    // 如果有权限或角色，放行
    if (hasPermission && hasRole) {
      next()
      return
    }

    // 无权限，重定向到 403 页面
    next({
      path: '/403',
      query: { redirect: to.fullPath },
    })
  })
}
