// AI Agent 类型定义

export interface AIResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PageConfig {
  name: string;
  path: string;
  title: string;
  description?: string;
  components: ComponentConfig[];
  layout?: string;
  permissions?: string[];
}

export interface ComponentConfig {
  type: string;
  name: string;
  props?: Record<string, any>;
  slots?: Record<string, any>;
  events?: Record<string, any>;
  children?: ComponentConfig[];
}

export interface CodeGenerationRequest {
  description: string;
  type: 'component' | 'page' | 'hook' | 'composable';
  framework: 'vue3' | 'react';
  language: 'typescript' | 'javascript';
  options?: {
    useCompositionAPI?: boolean;
    useSetupScript?: boolean;
    includeStyles?: boolean;
    includeTests?: boolean;
  };
}

export interface CodeGenerationResponse {
  code: string;
  preview?: string;
  dependencies?: string[];
  explanation?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatRequest {
  messages: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  id: string;
  message: ChatMessage;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface AgentConfig {
  name: string;
  description: string;
  capabilities: string[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface PageBuilderAgentConfig extends AgentConfig {
  componentLibrary?: 'antd-vue' | 'element-plus' | 'naive-ui';
  outputFormat?: 'sfc' | 'tsx' | 'jsx';
}

export interface CodeGenAgentConfig extends AgentConfig {
  codeStyle?: 'functional' | 'class';
  includeComments?: boolean;
  includeTests?: boolean;
}

export interface ChatAssistantAgentConfig extends AgentConfig {
  knowledgeBase?: string[];
  contextWindow?: number;
}
