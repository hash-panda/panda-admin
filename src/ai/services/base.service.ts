/**
 * AI 服务基类
 */
import type { AIConfig, AIMessage, AIResponse } from '../types/agent.types';

export abstract class BaseAIService {
  protected config: AIConfig;

  constructor(config: AIConfig) {
    this.config = config;
  }

  /**
   * 发送消息到 AI
   */
  abstract chat(messages: AIMessage[]): Promise<AIResponse>;

  /**
   * 流式对话
   */
  abstract chatStream(messages: AIMessage[]): AsyncGenerator<string>;

  /**
   * 更新配置
   */
  updateConfig(config: Partial<AIConfig>) {
    this.config = { ...this.config, ...config };
  }

  /**
   * 获取配置
   */
  getConfig(): AIConfig {
    return { ...this.config };
  }
}
