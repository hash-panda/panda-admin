import { request } from '@/utils/request';
import type { ApiResponse, RouteItem, UserPermissions, PermissionItem } from '@/types/route';

/**
 * 获取用户路由列表
 * @returns Promise<RouteItem[]> 用户路由列表
 */
export function getUserRoutes(): Promise<ApiResponse<RouteItem[]>> {
  return request.get<RouteItem[]>('/user/routes');
}

/**
 * 获取用户权限信息
 * @returns Promise<UserPermissions> 用户权限信息
 */
export function getUserPermissions(): Promise<ApiResponse<UserPermissions>> {
  return request.get<UserPermissions>('/user/permissions');
}

/**
 * 获取所有权限列表
 * @returns Promise<PermissionItem[]> 权限列表
 */
export function getPermissionList(): Promise<ApiResponse<PermissionItem[]>> {
  return request.get<PermissionItem[]>('/permissions');
}

/**
 * 根据角色获取路由列表
 * @param role 角色
 * @returns Promise<RouteItem[]> 路由列表
 */
export function getRoutesByRole(role: string): Promise<ApiResponse<RouteItem[]>> {
  return request.get<RouteItem[]>(`/routes/role/${role}`);
}
