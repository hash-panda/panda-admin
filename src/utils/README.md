# Route Transformation Utility

路由转换工具，用于将后端返回的路由数据转换为 Vue Router 需要的 `RouteRecordRaw` 格式。

## 功能特性

- ✅ 递归转换嵌套路由结构
- ✅ 动态组件加载
- ✅ 支持组件映射表
- ✅ 支持自定义组件注册
- ✅ 完整的 TypeScript 类型支持

## 使用方法

### 基本使用

```typescript
import { transformRoutes } from '@/utils/routeTransform'
import type { BackendRoute } from '@/types/route'

// 后端返回的路由数据
const backendRoutes: BackendRoute[] = [
  {
    id: 1,
    path: '/system',
    component: 'Layout',
    meta: { title: '系统管理', icon: 'system' },
    children: [
      {
        id: 2,
        path: 'user',
        name: 'UserManagement',
        component: 'UserManagement',
        meta: { title: '用户管理' }
      }
    ]
  }
]

// 转换为 Vue Router 格式
const vueRoutes = transformRoutes(backendRoutes)

// 添加到路由器
router.addRoute(vueRoutes[0])
```

### 组件映射

工具内置了常用组件的映射：

```typescript
{
  Layout: () => import('@/layouts/index.vue'),
  ParentView: () => import('@/components/ParentView.vue'),
  Dashboard: () => import('@/views/dashboard/index.vue'),
  // ... 更多组件
}
```

### 注册自定义组件

如果需要添加自定义组件映射：

```typescript
import { registerComponent, registerComponents } from '@/utils/routeTransform'

// 注册单个组件
registerComponent('MyComponent', () => import('@/views/my-component/index.vue'))

// 批量注册组件
registerComponents({
  ComponentA: () => import('@/views/a/index.vue'),
  ComponentB: () => import('@/views/b/index.vue'),
})
```

## API 文档

### `transformRoutes(routes: BackendRoute[]): RouteRecordRaw[]`

递归转换后端路由数据为 Vue Router 格式。

**参数：**
- `routes` - 后端路由数组

**返回：**
- Vue Router 路由配置数组

### `loadComponent(componentStr?: string): (() => Promise<any>) | undefined`

根据组件字符串动态加载组件。

**参数：**
- `componentStr` - 组件标识字符串

**返回：**
- 组件加载函数或 undefined

### `registerComponent(key: string, loader: () => Promise<any>): void`

注册单个组件到映射表。

**参数：**
- `key` - 组件键名
- `loader` - 组件加载函数

### `registerComponents(components: Record<string, () => Promise<any>>): void`

批量注册组件到映射表。

**参数：**
- `components` - 组件映射对象

### `getComponentMap(): Record<string, () => Promise<any>>`

获取当前组件映射表（用于调试）。

**返回：**
- 组件映射表的副本

## 类型定义

### `BackendRoute`

后端返回的路由数据结构：

```typescript
interface BackendRoute {
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
```

## 注意事项

1. **组件路径**：确保组件路径与实际项目结构一致
2. **动态导入**：使用 Vite 的 `/* @vite-ignore */` 注释来支持动态路径导入
3. **性能优化**：组件使用懒加载，只在需要时才加载
4. **错误处理**：未找到的组件会输出警告信息，不会中断程序

## 测试

运行测试：

```bash
npm test src/utils/__tests__/routeTransform.test.ts
```

## 相关 Issue

- #65: 路由转换算法实现
- #59: 动态路由功能开发
