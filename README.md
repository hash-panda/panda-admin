# Panda Admin

基于 AI Agent 驱动的现代化前端管理后台框架，参考 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 架构设计。

## ✨ 特性

- 🤖 **AI 驱动开发**：通过 AI Agent 辅助/自动化前端页面开发
- 🎨 **现代化 UI**：基于 Ant Design Vue 的企业级 UI 组件库
- ⚡ **高性能**：基于 Vite 的极速构建和热更新
- 🔧 **类型安全**：完整的 TypeScript 支持
- 📦 **开箱即用**：提供丰富的业务组件和工具
- 🌐 **国际化**：内置 i18n 多语言支持

## 🛠️ 技术栈

- **框架**：Vue 3.4+、TypeScript 5.0+、Vite 5.0+
- **UI 组件**：Ant Design Vue 4.x
- **状态管理**：Pinia 2.x
- **路由**：Vue Router 4.x
- **HTTP 客户端**：Axios 1.x
- **AI 服务**：OpenAI API / Claude API

## 📦 安装

```bash
# 克隆项目
git clone https://github.com/hash-panda/panda-admin.git
cd panda-admin

# 安装依赖
pnpm install
```

## 🚀 开发

```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 📖 文档

详细的技术架构文档请查看 [docs/TECHNICAL_ARCHITECTURE.md](docs/TECHNICAL_ARCHITECTURE.md)

## 🗺️ 项目结构

```
panda-admin/
├── src/
│   ├── ai/                     # AI Agent 模块
│   │   ├── agents/             # AI Agent 定义
│   │   ├── prompts/            # 提示词模板
│   │   ├── services/           # AI 服务封装
│   │   └── types/              # AI 相关类型
│   ├── assets/                 # 资源文件
│   ├── components/             # 公共组件
│   │   ├── basic/              # 基础组件封装
│   │   ├── business/           # 业务组件
│   │   └── layout/             # 布局组件
│   ├── composables/            # 组合式函数
│   ├── config/                 # 配置文件
│   ├── layouts/                # 布局模板
│   ├── locales/                # 国际化
│   ├── router/                 # 路由配置
│   ├── store/                  # 状态管理
│   ├── utils/                  # 工具函数
│   └── views/                  # 页面视图
│       ├── dashboard/          # 仪表盘
│       ├── ai-studio/          # AI 工作室
│       │   ├── page-builder/    # 页面构建器
│       │   ├── code-generator/ # 代码生成器
│       │   └── chat-assistant/  # AI 助手
│       └── system/             # 系统管理
├── docs/                       # 文档
├── types/                      # 全局类型定义
└── public/                     # 静态资源
```

## 🎯 AI 功能

### 页面构建器
根据自然语言描述，AI 自动生成页面结构和代码。

### 代码生成器
通过 AI 快速生成 Vue 组件、API 接口、Store 等代码。

### AI 助手
智能代码问答、Bug 诊断、代码优化建议。

## 📄 许可证

[MIT](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📮 联系方式

- GitHub Issues: [https://github.com/hash-panda/panda-admin/issues](https://github.com/hash-panda/panda-admin/issues)
