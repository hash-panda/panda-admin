import axios from 'axios'
import { showError } from './message'
import { getErrorType, getErrorMessage } from './errorHandler'

/**
 * 创建 axios 实例
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000, // 30秒超时
  headers: {
    'Content-Type': 'application/json'
  }
})

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response) => {
    const { data, status } = response
    
    // 检查业务状态码
    if (data.code !== undefined && data.code !== 0 && data.code !== 200) {
      const error = new Error(data.message || '请求失败')
      error.code = data.code
      error.response = response
      return Promise.reject(error)
    }
    
    return data.data || data
  },
  (error) => {
    const errorType = getErrorType(error)
    const errorMessage = getErrorMessage(error)
    
    // 显示错误提示
    showError(errorMessage)
    
    // 特殊处理网络错误
    if (errorType === 'NETWORK_ERROR') {
      console.error('网络错误:', error)
    }
    
    // 特殊处理超时错误
    if (errorType === 'TIMEOUT_ERROR') {
      console.error('请求超时:', error)
    }
    
    return Promise.reject(error)
  }
)

/**
 * GET 请求
 * @param {string} url - 请求地址
 * @param {Object} params - 查询参数
 * @param {Object} config - axios 配置
 * @returns {Promise} 响应数据
 */
export const get = (url, params = {}, config = {}) => {
  return request.get(url, { params, ...config })
}

/**
 * POST 请求
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据
 * @param {Object} config - axios 配置
 * @returns {Promise} 响应数据
 */
export const post = (url, data = {}, config = {}) => {
  return request.post(url, data, config)
}

/**
 * PUT 请求
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据
 * @param {Object} config - axios 配置
 * @returns {Promise} 响应数据
 */
export const put = (url, data = {}, config = {}) => {
  return request.put(url, data, config)
}

/**
 * DELETE 请求
 * @param {string} url - 请求地址
 * @param {Object} params - 查询参数
 * @param {Object} config - axios 配置
 * @returns {Promise} 响应数据
 */
export const del = (url, params = {}, config = {}) => {
  return request.delete(url, { params, ...config })
}

/**
 * 文件上传
 * @param {string} url - 请求地址
 * @param {FormData} formData - 表单数据
 * @param {Object} config - axios 配置
 * @returns {Promise} 响应数据
 */
export const upload = (url, formData, config = {}) => {
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    ...config
  })
}

/**
 * 取消请求
 * @returns {Object} 包含 token 和 cancel 方法的对象
 */
export const createCancelToken = () => {
  const source = axios.CancelToken.source()
  return {
    token: source.token,
    cancel: source.cancel
  }
}

export default request
