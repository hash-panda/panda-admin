/**
 * 路由相关API
 */

import { get } from '@/utils/request';
import type {
  BackendRoute,
  UserPermission,
  UserRoutesResponse,
  GetUserRoutesParams,
} from '@/types/route';

/**
 * 获取用户路由列表
 * @param params 请求参数
 * @returns 用户路由和权限信息
 */
export function getUserRoutes(
  params?: GetUserRoutesParams
): Promise<UserRoutesResponse> {
  return get<UserRoutesResponse>('/auth/routes', { params });
}

/**
 * 获取用户路由列表（别名）
 * @param params 请求参数
 * @returns 用户路由和权限信息
 */
export function fetchUserRoutes(
  params?: GetUserRoutesParams
): Promise<UserRoutesResponse> {
  return getUserRoutes(params);
}
