import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface AIConfig {
  apiKey?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export const useAIStore = defineStore('ai', () => {
  // AI 配置
  const config = ref<AIConfig>({
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  });

  // 聊天历史
  const chatHistory = ref<ChatMessage[]>([]);

  // 正在生成
  const isGenerating = ref(false);

  // Actions
  const setConfig = (newConfig: Partial<AIConfig>) => {
    config.value = { ...config.value, ...newConfig };
    // 持久化配置
    localStorage.setItem('ai-config', JSON.stringify(config.value));
  };

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Date.now()
    };
    chatHistory.value.push(newMessage);
    return newMessage;
  };

  const clearHistory = () => {
    chatHistory.value = [];
  };

  const setGenerating = (generating: boolean) => {
    isGenerating.value = generating;
  };

  // 初始化时加载配置
  const loadConfig = () => {
    const savedConfig = localStorage.getItem('ai-config');
    if (savedConfig) {
      try {
        config.value = JSON.parse(savedConfig);
      } catch (e) {
        console.error('Failed to load AI config:', e);
      }
    }
  };

  // 初始化
  loadConfig();

  return {
    config,
    chatHistory,
    isGenerating,
    setConfig,
    addMessage,
    clearHistory,
    setGenerating,
    loadConfig
  };
});
