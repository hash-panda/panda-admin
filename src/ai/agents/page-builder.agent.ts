/**
 * 页面构建 Agent
 */
import { createAIService } from '../services';
import type { AIProvider } from '../types/agent.types';
import { PAGE_BUILDER_SYSTEM_PROMPT, buildPageBuilderPrompt } from '../prompts/page-builder.prompt';
import type { PageBuilderRequest, PageConfig } from '../types/agent.types';

export class PageBuilderAgent {
  private provider: AIProvider;
  private apiKey: string;

  constructor(provider: AIProvider = 'openai', apiKey: string = '') {
    this.provider = provider;
    this.apiKey = apiKey || import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  /**
   * 生成页面配置
   */
  async generatePage(request: PageBuilderRequest): Promise<PageConfig> {
    const service = createAIService({
      provider: this.provider,
      apiKey: this.apiKey,
      model: this.provider === 'openai' ? 'gpt-4-turbo-preview' : 'claude-3-opus',
      temperature: 0.7,
      maxTokens: 2000,
    });

    const messages = [
      { role: 'system' as const, content: PAGE_BUILDER_SYSTEM_PROMPT },
      { role: 'user' as const, content: buildPageBuilderPrompt(request) },
    ];

    try {
      const response = await service.chat(messages);
      const jsonMatch = response.content.match(/```json\n([\s\S]*?)\n```/) ||
                        response.content.match(/\{[\s\S]*\}/);

      if (!jsonMatch) {
        throw new Error('无法解析 AI 返回的 JSON');
      }

      const jsonStr = jsonMatch[1] || jsonMatch[0];
      const pageConfig = JSON.parse(jsonStr) as PageConfig;

      return pageConfig;
    } catch (error) {
      console.error('Page Builder Agent error:', error);
      throw new Error('页面配置生成失败');
    }
  }

  /**
   * 流式生成页面配置
   */
  async *generatePageStream(request: PageBuilderRequest): AsyncGenerator<string> {
    const service = createAIService({
      provider: this.provider,
      apiKey: this.apiKey,
      model: this.provider === 'openai' ? 'gpt-4-turbo-preview' : 'claude-3-opus',
      temperature: 0.7,
      maxTokens: 2000,
    });

    const messages = [
      { role: 'system' as const, content: PAGE_BUILDER_SYSTEM_PROMPT },
      { role: 'user' as const, content: buildPageBuilderPrompt(request) },
    ];

    try {
      yield* service.chatStream(messages);
    } catch (error) {
      console.error('Page Builder Agent stream error:', error);
      throw new Error('页面配置生成失败');
    }
  }
}
