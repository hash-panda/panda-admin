/**
 * 路由/权限数据结构定义
 */

/**
 * 路由项接口
 */
export interface RouteItem {
  /** 路由唯一标识 */
  id: string | number;
  /** 路由名称 */
  name: string;
  /** 路由路径 */
  path: string;
  /** 路由组件路径 */
  component?: string;
  /** 路由重定向 */
  redirect?: string;
  /** 路由元信息 */
  meta?: RouteMeta;
  /** 子路由 */
  children?: RouteItem[];
}

/**
 * 路由元信息接口
 */
export interface RouteMeta {
  /** 路由标题 */
  title: string;
  /** 图标 */
  icon?: string;
  /** 是否隐藏 */
  hidden?: boolean;
  /** 是否缓存 */
  keepAlive?: boolean;
  /** 是否固定标签 */
  affix?: boolean;
  /** 排序 */
  order?: number;
  /** 权限标识 */
  permissions?: string[];
  /** 角色标识 */
  roles?: string[];
  /** 外链 */
  externalLink?: boolean;
}

/**
 * 权限项接口
 */
export interface PermissionItem {
  /** 权限唯一标识 */
  id: string | number;
  /** 权限编码 */
  code: string;
  /** 权限名称 */
  name: string;
  /** 权限描述 */
  description?: string;
  /** 权限类型: menu-菜单, button-按钮, api-接口 */
  type: 'menu' | 'button' | 'api';
  /** 父权限ID */
  parentId?: string | number;
  /** 关联路由ID */
  routeId?: string | number;
}

/**
 * 用户权限信息接口
 */
export interface UserPermissions {
  /** 用户ID */
  userId: string | number;
  /** 用户名 */
  username: string;
  /** 角色列表 */
  roles: string[];
  /** 权限列表 */
  permissions: PermissionItem[];
  /** 路由列表 */
  routes: RouteItem[];
}

/**
 * API 响应基础接口
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
