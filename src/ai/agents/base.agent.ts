import type { AgentConfig, AIResponse } from '../types';

/**
 * AI Agent 基类
 * 所有 AI Agent 都应该继承这个基类
 */
export abstract class BaseAgent {
  protected config: AgentConfig;

  constructor(config: AgentConfig) {
    this.config = config;
  }

  /**
   * 获取 Agent 配置
   */
  getConfig(): AgentConfig {
    return this.config;
  }

  /**
   * 更新 Agent 配置
   */
  updateConfig(config: Partial<AgentConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * 执行任务 - 子类必须实现
   */
  abstract execute(input: any): Promise<AIResponse>;

  /**
   * 验证输入 - 子类可以重写
   */
  protected validateInput(input: any): boolean {
    return true;
  }

  /**
   * 处理错误 - 子类可以重写
   */
  protected handleError(error: any): AIResponse {
    console.error(`[${this.config.name}] Error:`, error);
    return {
      success: false,
      data: null,
      message: error.message || '执行失败'
    };
  }

  /**
   * 构建系统提示词
   */
  protected buildSystemPrompt(): string {
    const { name, description, capabilities, systemPrompt } = this.config;

    let prompt = `你是一个 ${name}。\n`;
    prompt += `描述：${description}\n`;
    prompt += `能力：\n${capabilities.map(cap => `- ${cap}`).join('\n')}\n`;

    if (systemPrompt) {
      prompt += `\n${systemPrompt}`;
    }

    return prompt;
  }
}
