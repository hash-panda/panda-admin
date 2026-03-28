import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  /** 响应码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data: T;
  /** 时间戳 */
  timestamp?: number;
}

/**
 * 请求配置接口
 */
export interface RequestConfig extends AxiosRequestConfig {
  /** 是否显示加载状态 */
  showLoading?: boolean;
  /** 是否显示错误提示 */
  showError?: boolean;
  /** 是否需要认证 */
  needAuth?: boolean;
}

/**
 * 创建axios实例
 */
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

/**
 * 请求拦截器
 */
request.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
request.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response;
    
    // 根据业务状态码处理
    if (data.code === 200 || data.code === 0) {
      return data.data;
    }
    
    // 处理业务错误
    const error = new Error(data.message || '请求失败');
    (error as any).code = data.code;
    (error as any).response = response;
    return Promise.reject(error);
  },
  (error) => {
    // 处理HTTP错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          error.message = '未授权，请重新登录';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = '请求的资源不存在';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        default:
          error.message = `请求失败: ${error.response.status}`;
      }
    } else if (error.request) {
      error.message = '网络连接失败，请检查网络';
    } else {
      error.message = error.message || '请求失败';
    }
    
    return Promise.reject(error);
  }
);

/**
 * GET请求
 */
export function get<T = any>(url: string, config?: RequestConfig): Promise<T> {
  return request.get(url, config);
}

/**
 * POST请求
 */
export function post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
  return request.post(url, data, config);
}

/**
 * PUT请求
 */
export function put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
  return request.put(url, data, config);
}

/**
 * DELETE请求
 */
export function del<T = any>(url: string, config?: RequestConfig): Promise<T> {
  return request.delete(url, config);
}

export default request;
