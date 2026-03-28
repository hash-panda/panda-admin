<template>
  <div class="ai-workspace">
    <a-typography-title :level="2">AI 工作台</a-typography-title>
    <a-divider />

    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :lg="14">
        <a-card title="AI 助手">
          <div class="chat-messages">
            <div v-for="(msg, index) in messages" :key="index" class="message">
              <div class="message-content">
                <div class="message-text">{{ msg.content }}</div>
              </div>
            </div>
          </div>

          <div class="chat-input">
            <a-textarea
              v-model:value="inputMessage"
              placeholder="描述您需要创建的页面或组件..."
              :auto-size="{ minRows: 2, maxRows: 6 }"
            />
            <div class="input-actions">
              <a-space>
                <a-button @click="handleClear">清空</a-button>
                <a-button type="primary" @click="handleSend">发送</a-button>
              </a-space>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="10">
        <a-card title="AI 能力">
          <a-typography-paragraph>
            <strong>Prompt Engineer Agent</strong><br />
            优化和生成高质量的 Prompt
          </a-typography-paragraph>
          <a-typography-paragraph>
            <strong>Code Generator Agent</strong><br />
            根据需求生成页面和组件代码
          </a-typography-paragraph>
          <a-typography-paragraph>
            <strong>Test Generator Agent</strong><br />
            自动生成测试用例
          </a-typography-paragraph>
          <a-typography-paragraph>
            <strong>Code Review Agent</strong><br />
            代码质量审查
          </a-typography-paragraph>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '欢迎使用 Panda Admin AI 工作台！我可以帮助您创建页面、组件和代码。',
  },
]);

const inputMessage = ref('');
const loading = ref(false);

const handleSend = () => {
  if (!inputMessage.value.trim()) {
    message.warning('请输入内容');
    return;
  }

  messages.value.push({
    role: 'user',
    content: inputMessage.value,
  });

  // 模拟 AI 响应
  loading.value = true;
  setTimeout(() => {
    messages.value.push({
      role: 'assistant',
      content: 'AI Agent 正在处理您的请求...\n\n当前为演示版本，完整功能将在后续版本中实现。',
    });
    loading.value = false;
    inputMessage.value = '';
  }, 1000);
};

const handleClear = () => {
  messages.value = [
    {
      role: 'assistant',
      content: '欢迎使用 Panda Admin AI 工作台！我可以帮助您创建页面、组件和代码。',
    },
  ];
};
</script>

<style scoped>
.ai-workspace {
  padding: 0;
}

.chat-messages {
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 4px;
}

.message {
  margin-bottom: 16px;
}

.message-content {
  display: inline-block;
  max-width: 80%;
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-text {
  white-space: pre-wrap;
  word-break: break-word;
}

.chat-input {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
}

.input-actions {
  margin-top: 12px;
  text-align: right;
}
</style>
