import { showError } from './message'

/**
 * 错误类型枚举
 */
export const ErrorTypes = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  API_ERROR: 'API_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  EMPTY_CONTENT_ERROR: 'EMPTY_CONTENT_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

/**
 * 错误消息映射
 */
const errorMessages = {
  [ErrorTypes.NETWORK_ERROR]: '网络连接失败，请检查您的网络设置',
  [ErrorTypes.TIMEOUT_ERROR]: '请求超时，请稍后重试',
  [ErrorTypes.API_ERROR]: '服务器错误，请稍后重试',
  [ErrorTypes.VALIDATION_ERROR]: '输入数据验证失败',
  [ErrorTypes.EMPTY_CONTENT_ERROR]: '生成内容为空，请重试',
  [ErrorTypes.UNKNOWN_ERROR]: '发生未知错误，请稍后重试'
}

/**
 * 获取错误类型
 * @param {Error} error - 错误对象
 * @returns {string} 错误类型
 */
export const getErrorType = (error) => {
  if (!error) return ErrorTypes.UNKNOWN_ERROR

  // 网络错误
  if (error.message?.includes('Network Error') || 
      error.code === 'ERR_NETWORK' ||
      !navigator.onLine) {
    return ErrorTypes.NETWORK_ERROR
  }

  // 超时错误
  if (error.code === 'ECONNABORTED' || 
      error.message?.includes('timeout')) {
    return ErrorTypes.TIMEOUT_ERROR
  }

  // API 错误
  if (error.response) {
    return ErrorTypes.API_ERROR
  }

  // 验证错误
  if (error.message?.includes('validation') || 
      error.name === 'ValidationError') {
    return ErrorTypes.VALIDATION_ERROR
  }

  return ErrorTypes.UNKNOWN_ERROR
}

/**
 * 获取错误消息
 * @param {Error} error - 错误对象
 * @param {string} customMessage - 自定义消息
 * @returns {string} 错误消息
 */
export const getErrorMessage = (error, customMessage) => {
  if (customMessage) return customMessage

  const errorType = getErrorType(error)
  let message = errorMessages[errorType]

  // 如果是 API 错误，尝试从响应中获取详细消息
  if (errorType === ErrorTypes.API_ERROR && error.response?.data) {
    const { data } = error.response
    if (typeof data === 'string') {
      message = data
    } else if (data.message) {
      message = data.message
    } else if (data.error) {
      message = data.error
    }
  }

  // 如果有原始错误消息，可以附加到后面
  if (error.message && errorType === ErrorTypes.UNKNOWN_ERROR) {
    message = `${message}: ${error.message}`
  }

  return message
}

/**
 * 显示错误消息
 * @param {Error} error - 错误对象
 * @param {string} customMessage - 自定义消息
 * @param {number} duration - 持续时间（秒）
 */
export const showErrorToast = (error, customMessage, duration = 5) => {
  const message = getErrorMessage(error, customMessage)
  showError(message, duration)
}

/**
 * 处理错误并返回错误类型和消息
 * @param {Error} error - 错误对象
 * @param {string} customMessage - 自定义消息
 * @returns {Object} 包含错误类型和消息的对象
 */
export const handleError = (error, customMessage) => {
  const errorType = getErrorType(error)
  const errorMessage = getErrorMessage(error, customMessage)
  
  return {
    type: errorType,
    message: errorMessage,
    isNetworkError: errorType === ErrorTypes.NETWORK_ERROR,
    isTimeoutError: errorType === ErrorTypes.TIMEOUT_ERROR,
    isRetryable: [
      ErrorTypes.NETWORK_ERROR,
      ErrorTypes.TIMEOUT_ERROR,
      ErrorTypes.API_ERROR,
      ErrorTypes.EMPTY_CONTENT_ERROR
    ].includes(errorType)
  }
}

export default {
  ErrorTypes,
  getErrorType,
  getErrorMessage,
  showErrorToast,
  handleError
}
