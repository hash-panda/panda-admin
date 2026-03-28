/**
 * 路由元信息类型
 */
export interface RouteMeta {
  /** 菜单标题 */
  title?: string
  /** 菜单图标 */
  icon?: string
  /** 是否隐藏菜单项 */
  hidden?: boolean
  /** 排序权重 */
  order?: number
  /** 是否在面包屑中显示 */
  breadcrumb?: boolean
  /** 是否在标签页中显示 */
  affix?: boolean
  /** 其他自定义元信息 */
  [key: string]: any
}

/**
 * 路由记录类型
 */
export interface RouteRecord {
  /** 路由路径 */
  path: string
  /** 路由名称 */
  name?: string
  /** 重定向路径 */
  redirect?: string
  /** 路由元信息 */
  meta?: RouteMeta
  /** 子路由 */
  children?: RouteRecord[]
}

/**
 * 菜单项类型
 */
export interface MenuItem {
  /** 菜单项唯一标识 */
  key: string
  /** 菜单标题 */
  label: string
  /** 菜单图标 */
  icon?: string
  /** 子菜单 */
  children?: MenuItem[]
  /** 原始路由路径 */
  path: string
  /** 排序权重 */
  order?: number
}
