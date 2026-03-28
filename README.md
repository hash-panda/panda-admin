# Panda Admin

AI-driven UI framework based on Ant Design Vue

## Project Structure

```
panda-admin/
├── src/
│   ├── api/              # API 接口定义
│   │   ├── index.ts      # API 统一导出
│   │   └── route.ts      # 路由相关 API
│   ├── types/            # TypeScript 类型定义
│   │   ├── index.ts      # 类型统一导出
│   │   └── route.ts      # 路由类型定义
│   ├── utils/            # 工具函数
│   │   └── request.ts    # HTTP 请求封装
│   ├── views/            # 页面组件
│   ├── router/           # 路由配置
│   ├── App.vue           # 根组件
│   └── main.ts           # 入口文件
├── public/               # 静态资源
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目配置
```

## Features

- Vue 3 + TypeScript + Vite
- Ant Design Vue UI 组件库
- Axios HTTP 请求封装
- 路由权限管理

## Getting Started

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 类型检查
npm run type-check
```

## API Integration

本项目已完成后端 API 集成的基础设施：

### 1. 路由类型定义 (src/types/route.ts)

定义了与后端匹配的路由数据结构：
- `RouteMeta` - 路由元数据
- `BackendRoute` - 后端返回的路由结构
- `RoutePermission` - 权限定义

### 2. HTTP 请求封装 (src/utils/request.ts)

基于 Axios 的请求封装：
- 请求/响应拦截器
- 统一错误处理
- 自动 Token 注入
- 响应数据格式化

### 3. 路由 API (src/api/route.ts)

路由相关接口：
- `getUserRoutes()` - 获取用户路由列表
- `getRoutePermissions()` - 获取路由权限

## Environment Variables

创建 `.env.local` 文件配置环境变量：

```env
VITE_API_BASE_URL=http://your-api-server/api
```

## License

MIT
