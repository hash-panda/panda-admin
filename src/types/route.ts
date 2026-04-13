/**
 * 后端返回的路由数据结构
 */
export interface BackendRoute {
  id: string | number
  path: string
  name?: string
  component?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    roles?: string[]
    keepAlive?: boolean
    [key: string]: any
  }
  children?: BackendRoute[]
  [key: string]: any
}

/**
 * Vue Router 的 RouteRecordRaw 类型
 */
export type { RouteRecordRaw } from 'vue-router'
