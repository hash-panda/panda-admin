import { get, post } from '../utils/request'

/**
 * 模拟 API 服务
 * 用于演示错误处理和状态反馈功能
 */

/**
 * 获取数据 - 正常情况
 * @returns {Promise} 数据
 */
export const fetchData = () => {
  return get('/demo/data')
}

/**
 * 获取数据 - 模拟网络错误
 * @returns {Promise} 数据
 */
export const fetchDataWithError = () => {
  return get('/demo/error')
}

/**
 * 获取数据 - 模拟超时
 * @returns {Promise} 数据
 */
export const fetchDataWithTimeout = () => {
  return get('/demo/timeout', {}, { timeout: 1000 })
}

/**
 * 提交数据
 * @param {Object} data - 提交的数据
 * @returns {Promise} 结果
 */
export const submitData = (data) => {
  return post('/demo/submit', data)
}

/**
 * 生成内容
 * @param {Object} params - 参数
 * @returns {Promise} 生成的内容
 */
export const generateContent = (params) => {
  return post('/demo/generate', params)
}
