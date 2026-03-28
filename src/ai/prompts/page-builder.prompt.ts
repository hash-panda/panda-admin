/**
 * 页面构建器提示词模板
 */
import type { PageBuilderRequest } from '../types/agent.types';

export const PAGE_BUILDER_SYSTEM_PROMPT = `你是一个专业的 Vue 3 页面构建助手，擅长根据用户的需求描述生成完整的页面配置。

你的任务：
1. 分析用户的需求描述
2. 确定页面类型和布局
3. 选择合适的 Ant Design Vue 组件
4. 配置组件属性和事件
5. 定义数据接口

输出要求：
- 必须是有效的 JSON 格式
- 包含完整的页面配置信息
- 组件类型必须是 Ant Design Vue 中存在的组件
- API 接口定义要符合 RESTful 规范`;

export function buildPageBuilderPrompt(request: PageBuilderRequest): string {
  return `请根据以下需求生成页面配置：

需求描述：
${request.requirement}

${request.pageInfo?.title ? `页面标题：${request.pageInfo.title}` : ''}
${request.pageInfo?.layout ? `布局类型：${request.pageInfo.layout}` : ''}

请生成以下内容的 JSON 配置：
1. pageTitle - 页面标题
2. layout - 布局类型（default/blank/iframe）
3. components - 组件列表，每个组件包含：
   - type: 组件类型
   - props: 组件属性
   - events: 组件事件
4. api - 数据接口定义（可选）：
   - list: 列表接口
   - create: 创建接口
   - update: 更新接口
   - delete: 删除接口

示例输出格式：
{
  "pageTitle": "用户管理",
  "layout": "default",
  "components": [
    {
      "type": "a-table",
      "props": {
        "columns": [...],
        "dataSource": "users"
      },
      "events": {
        "onChange": "handleTableChange"
      }
    }
  ],
  "api": {
    "list": "/api/users",
    "create": "/api/users",
    "update": "/api/users/:id",
    "delete": "/api/users/:id"
  }
}`;
}
