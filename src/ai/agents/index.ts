import { PageBuilderAgent } from './page-builder.agent';
import { CodeGenAgent } from './code-gen.agent';
import { ChatAssistantAgent } from './chat-assistant.agent';
import type { PageBuilderAgentConfig, CodeGenAgentConfig, ChatAssistantAgentConfig } from '../types';

/**
 * AI Agent 注册表
 * 统一管理所有 AI Agent
 */
export class AgentRegistry {
  private static instance: AgentRegistry;
  private agents: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  /**
   * 注册 PageBuilder Agent
   */
  registerPageBuilderAgent(config?: Partial<PageBuilderAgentConfig>) {
    const agentConfig: PageBuilderAgentConfig = {
      name: 'PageBuilder',
      description: '页面构建专家，能够根据自然语言描述生成页面配置和代码',
      capabilities: [
        '理解自然语言描述',
        '生成页面结构配置',
        '生成 Vue 组件代码',
        '支持 Ant Design Vue 组件库'
      ],
      componentLibrary: 'antd-vue',
      outputFormat: 'sfc',
      systemPrompt: '你是一个专业的页面构建专家，擅长将自然语言描述转换为可用的页面配置和代码。',
      ...config
    };

    const agent = new PageBuilderAgent(agentConfig);
    this.agents.set('pageBuilder', agent);
    return agent;
  }

  /**
   * 注册 CodeGen Agent
   */
  registerCodeGenAgent(config?: Partial<CodeGenAgentConfig>) {
    const agentConfig: CodeGenAgentConfig = {
      name: 'CodeGenerator',
      description: '代码生成专家，能够根据自然语言描述生成高质量的代码',
      capabilities: [
        '理解代码需求描述',
        '生成组件代码',
        '生成页面代码',
        '生成 Hooks 和 Composables',
        '支持 TypeScript'
      ],
      codeStyle: 'functional',
      includeComments: true,
      includeTests: false,
      systemPrompt: '你是一个专业的代码生成专家，擅长编写高质量、可维护的代码。',
      ...config
    };

    const agent = new CodeGenAgent(agentConfig);
    this.agents.set('codeGen', agent);
    return agent;
  }

  /**
   * 注册 ChatAssistant Agent
   */
  registerChatAssistantAgent(config?: Partial<ChatAssistantAgentConfig>) {
    const agentConfig: ChatAssistantAgentConfig = {
      name: 'ChatAssistant',
      description: '智能问答助手，帮助解决开发问题',
      capabilities: [
        '回答技术问题',
        '提供代码建议',
        '解释技术概念',
        '调试帮助'
      ],
      contextWindow: 10,
      systemPrompt: '你是一个专业的技术助手，擅长回答 Vue 3、TypeScript、前端开发等相关问题。',
      ...config
    };

    const agent = new ChatAssistantAgent(agentConfig);
    this.agents.set('chatAssistant', agent);
    return agent;
  }

  /**
   * 获取 Agent
   */
  getAgent(name: string) {
    return this.agents.get(name);
  }

  /**
   * 初始化所有 Agent
   */
  initializeAll() {
    this.registerPageBuilderAgent();
    this.registerCodeGenAgent();
    this.registerChatAssistantAgent();
  }

  /**
   * 获取所有已注册的 Agent
   */
  getAllAgents() {
    return Array.from(this.agents.entries()).map(([name, agent]) => ({
      name,
      config: agent.getConfig()
    }));
  }
}

// 导出单例实例
export const agentRegistry = AgentRegistry.getInstance();

// 导出 Agent 类
export { PageBuilderAgent, CodeGenAgent, ChatAssistantAgent };
export { BaseAgent } from './base.agent';
