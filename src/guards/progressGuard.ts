import { Router } from 'vue-router'
import { message } from 'ant-design-vue'

let loadingCount = 0
let loadingTimer: ReturnType<typeof setTimeout> | null = null

export function setupProgressGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    // 增加加载计数
    loadingCount++

    // 延迟显示 loading，避免快速切换时的闪烁
    if (loadingTimer) {
      clearTimeout(loadingTimer)
    }

    loadingTimer = setTimeout(() => {
      if (loadingCount > 0) {
        message.loading({
          content: '加载中...',
          key: 'route-loading',
          duration: 0,
        })
      }
    }, 200)

    next()
  })

  router.afterEach(() => {
    // 减少加载计数
    loadingCount--

    // 如果所有加载都完成，隐藏 loading
    if (loadingCount <= 0) {
      loadingCount = 0
      if (loadingTimer) {
        clearTimeout(loadingTimer)
        loadingTimer = null
      }
      message.destroy('route-loading')
    }
  })

  router.onError(() => {
    // 发生错误时，重置计数并隐藏 loading
    loadingCount = 0
    if (loadingTimer) {
      clearTimeout(loadingTimer)
      loadingTimer = null
    }
    message.destroy('route-loading')
  })
}
