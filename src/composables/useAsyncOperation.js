import { ref, computed } from 'vue'
import { handleError } from '../utils/errorHandler'

/**
 * 异步操作 composable
 * 提供统一的加载状态、错误处理和重试功能
 * @param {Function} operation - 异步操作函数
 * @param {Object} options - 配置选项
 * @returns {Object} 包含状态和方法的对象
 */
export function useAsyncOperation(operation, options = {}) {
  const {
    onSuccess = null,
    onError = null,
    showErrorMessage = true,
    retryable = true,
    maxRetries = 3,
    retryDelay = 1000
  } = options

  const loading = ref(false)
  const error = ref(null)
  const data = ref(null)
  const retryCount = ref(0)

  const isNetworkError = computed(() => error.value?.isNetworkError || false)
  const isTimeoutError = computed(() => error.value?.isTimeoutError || false)
  const isRetryable = computed(() => error.value?.isRetryable || false)
  const canRetry = computed(() => 
    retryable && 
    isRetryable.value && 
    retryCount.value < maxRetries
  )

  /**
   * 执行异步操作
   * @param {...any} args - 传递给操作函数的参数
   * @returns {Promise} 操作结果
   */
  const execute = async (...args) => {
    loading.value = true
    error.value = null

    try {
      const result = await operation(...args)
      data.value = result
      retryCount.value = 0
      
      if (onSuccess) {
        onSuccess(result)
      }
      
      return result
    } catch (err) {
      const errorInfo = handleError(err)
      error.value = errorInfo
      
      if (showErrorMessage) {
        // 导入 message 函数
        const { showError } = await import('../utils/message')
        showError(errorInfo.message)
      }
      
      if (onError) {
        onError(errorInfo)
      }
      
      throw errorInfo
    } finally {
      loading.value = false
    }
  }

  /**
   * 重试操作
   * @param {...any} args - 传递给操作函数的参数
   * @returns {Promise} 操作结果
   */
  const retry = async (...args) => {
    if (!canRetry.value) {
      return Promise.reject(new Error('无法重试'))
    }

    retryCount.value++
    
    if (retryDelay > 0) {
      await new Promise(resolve => setTimeout(resolve, retryDelay))
    }
    
    return execute(...args)
  }

  /**
   * 重置状态
   */
  const reset = () => {
    loading.value = false
    error.value = null
    data.value = null
    retryCount.value = 0
  }

  /**
   * 设置错误
   * @param {Error|Object} err - 错误对象
   */
  const setError = (err) => {
    error.value = handleError(err)
  }

  return {
    // 状态
    loading,
    error,
    data,
    retryCount,
    
    // 计算属性
    isNetworkError,
    isTimeoutError,
    isRetryable,
    canRetry,
    
    // 方法
    execute,
    retry,
    reset,
    setError
  }
}

export default useAsyncOperation
