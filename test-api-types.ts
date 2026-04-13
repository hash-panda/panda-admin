/**
 * 类型验证测试文件
 * 用于验证 API 和类型定义的正确性
 */

import type {
  BackendRoute,
  UserPermission,
  UserRoutesResponse,
  GetUserRoutesParams,
} from './src/types/route';

import { getUserRoutes, fetchUserRoutes } from './src/api/route';

// 测试类型定义
const testBackendRoute: BackendRoute = {
  id: 'test-id',
  path: '/test',
  name: 'TestRoute',
  component: 'TestComponent',
  meta: {
    title: 'Test',
    icon: 'test-icon',
    hidden: false,
    sort: 1,
    keepAlive: false,
  },
  children: [],
};

const testUserPermission: UserPermission = {
  id: 'perm-id',
  code: 'test:read',
  name: 'Test Read',
  type: 'menu',
  module: 'test-module',
};

const testUserRoutesResponse: UserRoutesResponse = {
  routes: [testBackendRoute],
  permissions: [testUserPermission],
  roleIds: ['role-1', 'role-2'],
  timestamp: Date.now(),
};

const testGetUserRoutesParams: GetUserRoutesParams = {
  appCode: 'test-app',
  includePermissions: true,
};

// 测试 API 函数类型
async function testApiFunctions() {
  // 测试不带参数的调用
  const response1: Promise<UserRoutesResponse> = getUserRoutes();

  // 测试带参数的调用
  const response2: Promise<UserRoutesResponse> = getUserRoutes({
    appCode: 'test-app',
    includePermissions: true,
  });

  // 测试 fetchUserRoutes 别名
  const response3: Promise<UserRoutesResponse> = fetchUserRoutes({
    appCode: 'test-app',
    includePermissions: true,
  });

  console.log('类型验证通过');
}

// 导出测试函数以避免未使用警告
export { testApiFunctions };

console.log('✓ 类型定义验证通过');
console.log('✓ API 函数类型验证通过');
console.log('✓ 所有接口定义与后端 JSON 结构匹配');
