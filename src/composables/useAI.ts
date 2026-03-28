/**
 * AI 组合式函数
 */
import { ref } from 'vue';
import { PageBuilderAgent } from '@/ai/agents';
import { CodeGenAgent } from '@/ai/agents';
import { ChatAssistantAgent } from '@/ai/agents';
import type { PageBuilderRequest, CodeGenerationRequest } from '@/ai/types/agent.types';

export function useAI(provider: 'openai' | 'claude' = 'openai', apiKey?: string) {
  const loading = ref(false);

  // 页面构建
  const pageBuilderAgent = new PageBuilderAgent(provider, apiKey);

  const generatePage = async (request: PageBuilderRequest) => {
    loading.value = true;
    try {
      const result = await pageBuilderAgent.generatePage(request);
      return result;
    } finally {
      loading.value = false;
    }
  };

  // 代码生成
  const codeGenAgent = new CodeGenAgent(provider, apiKey);

  const generateCode = async (request: CodeGenerationRequest) => {
    loading.value = true;
    try {
      const result = await codeGenAgent.generateCode(request);
      return result;
    } finally {
      loading.value = false;
    }
  };

  // 聊天助手
  const chatAgent = new ChatAssistantAgent(provider, apiKey);

  const chat = async (messages: any[]) => {
    loading.value = true;
    try {
      const result = await chatAgent.chat({ messages });
      return result;
    } finally {
      loading.value = false;
    }
  };

  const explainCode = async (code: string, language?: string) => {
    loading.value = true;
    try {
      const result = await chatAgent.explainCode(code, language);
      return result;
    } finally {
      loading.value = false;
    }
  };

  const diagnoseBug = async (code: string, error: string) => {
    loading.value = true;
    try {
      const result = await chatAgent.diagnoseBug(code, error);
      return result;
    } finally {
      loading.value = false;
    }
  };

  const optimizeCode = async (code: string) => {
    loading.value = true;
    try {
      const result = await chatAgent.optimizeCode(code);
      return result;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    generatePage,
    generateCode,
    chat,
    explainCode,
    diagnoseBug,
    optimizeCode,
  };
}
