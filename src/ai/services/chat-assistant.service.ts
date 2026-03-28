import { agentRegistry } from '../agents';
import type { ChatRequest, ChatResponse, AIResponse, ChatMessage } from '../types';

/**
 * 聊天助手服务
 * 提供聊天相关的业务逻辑
 */
export class ChatAssistantService {
  private agent = agentRegistry.getAgent('chatAssistant');
  private history: ChatMessage[] = [];

  /**
   * 发送消息
   */
  async sendMessage(content: string): Promise<AIResponse<ChatResponse>> {
    if (!this.agent) {
      throw new Error('ChatAssistant Agent 未初始化');
    }

    // 添加用户消息到历史
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };
    this.history.push(userMessage);

    // 调用 Agent
    const response = await this.agent.execute({
      messages: this.history.slice(-10) // 只保留最近 10 条消息
    });

    // 添加助手回复到历史
    if (response.success) {
      this.history.push(response.data.message);
    }

    return response;
  }

  /**
   * 获取聊天历史
   */
  getHistory(): ChatMessage[] {
    return this.history;
  }

  /**
   * 清空聊天历史
   */
  clearHistory(): void {
    this.history = [];
  }

  /**
   * 删除指定消息
   */
  removeMessage(messageId: string): void {
    this.history = this.history.filter(msg => msg.id !== messageId);
  }

  /**
   * 导出聊天记录
   */
  exportHistory(): string {
    return JSON.stringify(this.history, null, 2);
  }

  /**
   * 导入聊天记录
   */
  importHistory(json: string): void {
    try {
      const history = JSON.parse(json);
      if (Array.isArray(history)) {
        this.history = history;
      }
    } catch (error) {
      console.error('导入失败:', error);
      throw new Error('导入失败，格式不正确');
    }
  }

  /**
   * 设置系统提示
   */
  setSystemPrompt(prompt: string): void {
    if (this.agent) {
      this.agent.updateConfig({ systemPrompt: prompt });
    }
  }

  /**
   * 获取统计信息
   */
  getStats() {
    const totalMessages = this.history.length;
    const userMessages = this.history.filter(m => m.role === 'user').length;
    const assistantMessages = this.history.filter(m => m.role === 'assistant').length;
    const systemMessages = this.history.filter(m => m.role === 'system').length;

    return {
      totalMessages,
      userMessages,
      assistantMessages,
      systemMessages
    };
  }
}

// 导出单例
export const chatAssistantService = new ChatAssistantService();
