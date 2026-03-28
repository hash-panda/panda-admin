/**
 * 路由元数据接口
 */
export interface RouteMeta {
  /** 路由标题 */
  title: string;
  /** 路由图标 */
  icon?: string;
  /** 是否显示在菜单中 */
  showMenu?: boolean;
  /** 是否缓存页面 */
  keepAlive?: boolean;
  /** 是否隐藏路由 */
  hidden?: boolean;
  /** 所需权限标识 */
  permissions?: string[];
  /** 排序权重 */
  sort?: number;
  /** 外部链接 */
  link?: string;
  /** 链接打开方式 */
  linkType?: '_self' | '_blank';
  /** 是否固定标签页 */
  affix?: boolean;
}

/**
 * 后端路由项接口
 */
export interface BackendRoute {
  /** 路由ID */
  id: string | number;
  /** 父级路由ID */
  parentId?: string | number | null;
  /** 路由路径 */
  path: string;
  /** 路由名称 */
  name: string;
  /** 组件路径 */
  component?: string;
  /** 重定向路径 */
  redirect?: string;
  /** 路由元数据 */
  meta: RouteMeta;
  /** 子路由列表 */
  children?: BackendRoute[];
  /** 创建时间 */
  createdAt?: string;
  /** 更新时间 */
  updatedAt?: string;
}

/**
 * 用户权限信息接口
 */
export interface UserPermission {
  /** 权限ID */
  id: string | number;
  /** 权限编码 */
  code: string;
  /** 权限名称 */
  name: string;
  /** 权限描述 */
  description?: string;
  /** 权限类型：menu-菜单权限，button-按钮权限，api-接口权限 */
  type: 'menu' | 'button' | 'api';
  /** 所属模块 */
  module?: string;
}

/**
 * 用户路由响应数据接口
 */
export interface UserRoutesResponse {
  /** 路由列表 */
  routes: BackendRoute[];
  /** 用户权限列表 */
  permissions: UserPermission[];
  /** 角色ID列表 */
  roleIds?: (string | number)[];
  /** 响应时间戳 */
  timestamp?: number;
}

/**
 * 获取用户路由请求参数接口
 */
export interface GetUserRoutesParams {
  /** 应用标识 */
  appCode?: string;
  /** 是否包含权限信息 */
  includePermissions?: boolean;
}
