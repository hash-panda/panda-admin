/**
 * 代码生成器提示词模板
 */
import type { CodeGenerationRequest } from '../types/agent.types';

export const CODE_GEN_SYSTEM_PROMPT = `你是一个专业的 Vue 3 和 TypeScript 代码生成助手，擅长根据需求描述生成高质量的代码。

代码风格要求：
1. 使用 Vue 3 Composition API（<script setup>）
2. 使用 TypeScript 进行类型定义
3. 遵循 Vue 3 最佳实践
4. 代码要有良好的可读性和可维护性
5. 添加必要的注释

输出要求：
- 代码必须是完整可运行的
- 包含必要的导入语句
- 类型定义要准确
- Props 和 Emits 要正确定义`;

export function buildCodeGenPrompt(request: CodeGenerationRequest): string {
  const codeTypeMap = {
    component: 'Vue 3 组件（.vue 文件）',
    api: 'API 接口代码（TypeScript）',
    store: 'Pinia Store 代码（TypeScript）',
    router: 'Vue Router 配置代码（TypeScript）',
  };

  return `请根据以下需求生成${codeTypeMap[request.codeType]}代码：

需求描述：
${request.requirement}

编程语言：${request.language === 'typescript' ? 'TypeScript' : 'JavaScript'}

${request.context ? `上下文信息：\n${request.context}` : ''}

请生成完整的代码，包括：
1. 必要的导入语句
2. 类型定义（如果使用 TypeScript）
3. 完整的实现代码
4. 必要的注释

代码应该：
- 遵循最佳实践
- 有良好的可读性
- 包含错误处理（如果需要）
- 有适当的类型定义（如果使用 TypeScript）`;
}
