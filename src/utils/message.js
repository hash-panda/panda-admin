import { message } from 'ant-design-vue'

/**
 * 显示成功消息
 * @param {string} content - 消息内容
 * @param {number} duration - 持续时间（秒）
 */
export const showSuccess = (content, duration = 3) => {
  message.success(content, duration)
}

/**
 * 显示错误消息
 * @param {string} content - 消息内容
 * @param {number} duration - 持续时间（秒）
 */
export const showError = (content, duration = 5) => {
  message.error(content, duration)
}

/**
 * 显示警告消息
 * @param {string} content - 消息内容
 * @param {number} duration - 持续时间（秒）
 */
export const showWarning = (content, duration = 3) => {
  message.warning(content, duration)
}

/**
 * 显示信息消息
 * @param {string} content - 消息内容
 * @param {number} duration - 持续时间（秒）
 */
export const showInfo = (content, duration = 3) => {
  message.info(content, duration)
}

/**
 * 显示加载消息
 * @param {string} content - 消息内容
 * @param {number} duration - 持续时间（秒）
 */
export const showLoading = (content, duration = 0) => {
  return message.loading(content, duration)
}

export default {
  success: showSuccess,
  error: showError,
  warning: showWarning,
  info: showInfo,
  loading: showLoading
}
