/**
 * AI Agent 类型定义
 */

export type AIProvider = 'openai' | 'claude';

export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface PageBuilderRequest {
  requirement: string;
  pageInfo?: {
    title?: string;
    layout?: string;
  };
}

export interface PageConfig {
  pageTitle: string;
  layout: string;
  components: ComponentConfig[];
  api?: APIConfig;
}

export interface ComponentConfig {
  type: string;
  props?: Record<string, any>;
  events?: Record<string, string>;
  children?: ComponentConfig[];
}

export interface APIConfig {
  list?: string;
  create?: string;
  update?: string;
  delete?: string;
}

export interface CodeGenerationRequest {
  requirement: string;
  codeType: 'component' | 'api' | 'store' | 'router';
  language: 'typescript' | 'javascript';
  context?: string;
}

export interface GeneratedCode {
  code: string;
  fileName?: string;
  description?: string;
}

export interface ChatRequest {
  messages: AIMessage[];
  context?: string;
}
