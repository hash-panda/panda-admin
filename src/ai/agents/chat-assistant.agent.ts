import { BaseAgent } from './base.agent';
import type { ChatAssistantAgentConfig, ChatRequest, ChatResponse, AIResponse } from '../types';

/**
 * 聊天助手 Agent
 * 智能问答助手，帮助解决开发问题
 */
export class ChatAssistantAgent extends BaseAgent {
  protected config: ChatAssistantAgentConfig;

  constructor(config: ChatAssistantAgentConfig) {
    super(config);
    this.config = {
      contextWindow: 10,
      ...config
    };
  }

  /**
   * 执行聊天任务
   */
  async execute(input: ChatRequest): Promise<AIResponse<ChatResponse>> {
    try {
      if (!this.validateInput(input)) {
        throw new Error('输入验证失败');
      }

      // 调用 AI API 获取回复
      const response = await this.getChatResponse(input);

      return {
        success: true,
        data: response,
        message: '回复生成成功'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * 获取聊天回复
   */
  private async getChatResponse(request: ChatRequest): Promise<ChatResponse> {
    const { messages, model, temperature, maxTokens } = request;

    // 模拟 AI 响应
    // 实际实现中，这里应该调用 OpenAI 或其他 AI API

    const lastUserMessage = messages[messages.length - 1];
    const responseText = await this.generateResponse(lastUserMessage.content);

    return {
      id: Date.now().toString(),
      message: {
        id: Date.now().toString(),
        role: 'assistant',
        content: responseText,
        timestamp: Date.now()
      },
      usage: {
        promptTokens: messages.length * 100,
        completionTokens: responseText.length,
        totalTokens: messages.length * 100 + responseText.length
      }
    };
  }

  /**
   * 生成回复内容
   */
  private async generateResponse(userMessage: string): Promise<string> {
    // 简单的关键词匹配逻辑
    // 实际实现中应该使用真正的 AI 模型

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('vue') && lowerMessage.includes('组件')) {
      return 'Vue 3 组件可以使用 Composition API 或 Options API 来创建。推荐使用 Composition API 的 `<script setup>` 语法，它更简洁且类型推断更好。';
    }

    if (lowerMessage.includes('antd') || lowerMessage.includes('ant design')) {
      return 'Ant Design Vue 是一套企业级的 UI 组件库。你可以通过 npm 或 yarn 安装：`npm install ant-design-vue`。然后在 main.ts 中引入并使用。';
    }

    if (lowerMessage.includes('pinia')) {
      return 'Pinia 是 Vue 3 官方推荐的状态管理库。相比 Vuex，它更轻量、更简单，且对 TypeScript 支持更好。你可以通过 `defineStore` 来定义 store。';
    }

    if (lowerMessage.includes('typescript')) {
      return 'TypeScript 为 JavaScript 添加了静态类型检查，可以提高代码质量和开发体验。在 Vue 3 中，TypeScript 支持非常完善，推荐在项目中使用。';
    }

    // 默认回复
    return `我理解你的问题是："${userMessage}"。作为一个 AI 助手，我可以帮助你解决关于 Vue 3、TypeScript、Ant Design Vue、Pinia 等技术的问题。请告诉我你具体需要什么帮助？`;
  }

  /**
   * 验证输入
   */
  protected validateInput(input: any): boolean {
    return (
      input &&
      Array.isArray(input.messages) &&
      input.messages.length > 0 &&
      input.messages.every((msg: any) =>
        msg &&
        typeof msg.id === 'string' &&
        ['user', 'assistant', 'system'].includes(msg.role) &&
        typeof msg.content === 'string'
      )
    );
  }
}
