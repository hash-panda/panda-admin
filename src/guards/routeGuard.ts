import { Router } from 'vue-router'
import { useUserStore } from '@/store/user'

// 防止无限重定向的路径集合
const redirectBlacklist = new Set<string>(['/login', '/403', '/404', '/500'])

export function setupRouteGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 检查是否陷入重定向循环
    if (redirectBlacklist.has(to.path) && to.query.redirect === from.path) {
      // 如果在黑名单页面且重定向目标是当前来源，清除重定向参数
      next({ path: to.path, replace: true })
      return
    }

    // 检查是否是白屏风险路径（如空路径）
    if (!to.path || to.path === '/') {
      // 如果是根路径且未登录，重定向到登录页
      const userStore = useUserStore()
      if (!userStore.isLoggedIn) {
        next({ path: '/login', replace: true })
      } else {
        next({ path: '/dashboard', replace: true })
      }
      return
    }

    next()
  })

  router.onError((error) => {
    console.error('路由错误:', error)

    // 如果是路由加载失败，重定向到 500 页面
    if (error.name === 'ChunkLoadError' || error.message.includes('Failed to fetch dynamically imported module')) {
      window.location.href = '/500'
    }
  })
}
