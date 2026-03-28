/**
 * Axios 实例
 */
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';

export interface AxiosConfig extends AxiosRequestConfig {
  showErrorMessage?: boolean;
}

class Axios {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * 设置拦截器
   */
  private setupInterceptors(): void {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // 添加 token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data;

        // 根据业务状态码处理
        if (res.code !== undefined && res.code !== 200) {
          message.error(res.message || '请求失败');
          return Promise.reject(new Error(res.message || '请求失败'));
        }

        return res;
      },
      (error) => {
        const { response } = error;

        if (response) {
          switch (response.status) {
            case 401:
              message.error('未授权，请登录');
              // 跳转到登录页
              break;
            case 403:
              message.error('拒绝访问');
              break;
            case 404:
              message.error('请求地址不存在');
              break;
            case 500:
              message.error('服务器内部错误');
              break;
            default:
              message.error(response.data?.message || '请求失败');
          }
        } else {
          message.error('网络连接失败');
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * GET 请求
   */
  get<T = any>(url: string, config?: AxiosConfig): Promise<T> {
    return this.axiosInstance.get(url, config);
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: AxiosConfig): Promise<T> {
    return this.axiosInstance.post(url, data, config);
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: AxiosConfig): Promise<T> {
    return this.axiosInstance.put(url, data, config);
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: AxiosConfig): Promise<T> {
    return this.axiosInstance.delete(url, config);
  }

  /**
   * PATCH 请求
   */
  patch<T = any>(url: string, data?: any, config?: AxiosConfig): Promise<T> {
    return this.axiosInstance.patch(url, data, config);
  }

  /**
   * 文件上传
   */
  upload<T = any>(url: string, file: File, config?: AxiosConfig): Promise<T> {
    const formData = new FormData();
    formData.append('file', file);

    return this.axiosInstance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 获取 Axios 实例
   */
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const defHttp = new Axios();
export default defHttp;
