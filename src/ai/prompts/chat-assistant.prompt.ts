/**
 * 聊天助手提示词模板
 */
import type { ChatRequest } from '../types/agent.types';

export const CHAT_ASSISTANT_SYSTEM_PROMPT = `你是 Panda Admin 的 AI 助手，专门帮助开发者解决 Vue 3、TypeScript、Ant Design Vue 相关的问题。

你的专业领域：
1. Vue 3 Composition API
2. TypeScript 类型系统
3. Ant Design Vue 组件使用
4. Pinia 状态管理
5. Vue Router 路由配置
6. 前端性能优化
7. 代码最佳实践

回答要求：
1. 准确、专业、易懂
2. 提供代码示例时使用正确的语法高亮
3. 如果不确定，诚实地说明
4. 尽量提供可执行的解决方案
5. 保持友好和乐于助人的态度`;

export function buildChatPrompt(request: ChatRequest): string {
  let prompt = '';

  if (request.context) {
    prompt += `当前上下文：\n${request.context}\n\n`;
  }

  prompt += `对话历史：\n`;
  request.messages.forEach((msg, index) => {
    const role = msg.role === 'user' ? '用户' : '助手';
    prompt += `${role}: ${msg.content}\n`;
  });

  prompt += `\n请根据以上对话历史，给出专业、准确的回答。`;

  return prompt;
}
