/**
 * API 请求模块
 */

// 示例：基础请求配置
export const requestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
}
