import { ref, computed } from 'vue'

/**
 * 防抖提交 composable
 * 防止用户重复提交表单或按钮
 * @param {Object} options - 配置选项
 * @returns {Object} 包含状态和方法的对象
 */
export function useDebounceSubmit(options = {}) {
  const {
    debounceTime = 1000, // 防抖时间（毫秒）
    autoReset = true, // 操作完成后自动重置
    onBeforeSubmit = null,
    onSubmit = null,
    onSuccess = null,
    onError = null
  } = options

  const submitting = ref(false)
  const lastSubmitTime = ref(0)
  const submitCount = ref(0)

  const canSubmit = computed(() => {
    const now = Date.now()
    return !submitting.value && (now - lastSubmitTime.value) >= debounceTime
  })

  const remainingTime = computed(() => {
    const now = Date.now()
    const elapsed = now - lastSubmitTime.value
    return Math.max(0, debounceTime - elapsed)
  })

  /**
   * 提交操作
   * @param {Function} operation - 要执行的操作
   * @param {...any} args - 传递给操作的参数
   * @returns {Promise} 操作结果
   */
  const submit = async (operation, ...args) => {
    // 检查是否可以提交
    if (!canSubmit.value) {
      const { showWarning } = await import('../utils/message')
      showWarning(`请等待 ${Math.ceil(remainingTime.value / 1000)} 秒后再试`)
      return Promise.reject(new Error('提交过于频繁'))
    }

    // 执行提交前回调
    if (onBeforeSubmit) {
      const canContinue = await onBeforeSubmit()
      if (canContinue === false) {
        return Promise.reject(new Error('提交被取消'))
      }
    }

    submitting.value = true
    lastSubmitTime.value = Date.now()
    submitCount.value++

    try {
      // 执行提交操作
      const result = typeof operation === 'function' 
        ? await operation(...args) 
        : await onSubmit(...args)

      // 执行成功回调
      if (onSuccess) {
        await onSuccess(result)
      }

      return result
    } catch (error) {
      // 执行错误回调
      if (onError) {
        await onError(error)
      }
      throw error
    } finally {
      submitting.value = false
      
      // 自动重置
      if (autoReset) {
        setTimeout(() => {
          submitting.value = false
        }, debounceTime)
      }
    }
  }

  /**
   * 重置状态
   */
  const reset = () => {
    submitting.value = false
    lastSubmitTime.value = 0
  }

  /**
   * 设置提交状态
   * @param {boolean} value - 提交状态
   */
  const setSubmitting = (value) => {
    submitting.value = value
    if (value) {
      lastSubmitTime.value = Date.now()
    }
  }

  return {
    // 状态
    submitting,
    lastSubmitTime,
    submitCount,
    
    // 计算属性
    canSubmit,
    remainingTime,
    
    // 方法
    submit,
    reset,
    setSubmitting
  }
}

export default useDebounceSubmit
