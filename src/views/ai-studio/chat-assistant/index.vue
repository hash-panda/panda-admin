<template>
  <div class="chat-assistant">
    <a-card title="AI 助手" :bordered="false">
      <a-alert
        message="功能开发中"
        description="AI 助手正在开发中，即将上线..."
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <div class="chat-container">
        <div class="chat-messages">
          <div v-for="(message, index) in messages" :key="index" class="message" :class="message.role">
            <div class="message-avatar">
              <a-avatar v-if="message.role === 'user'">U</a-avatar>
              <a-avatar v-else style="background: #1890ff">AI</a-avatar>
            </div>
            <div class="message-content">
              <div class="message-text">{{ message.content }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <a-input-search
            v-model:value="inputMessage"
            placeholder="输入您的问题..."
            enter-button="发送"
            size="large"
            :loading="loading"
            @search="handleSend"
          />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const inputMessage = ref('');
const loading = ref(false);
const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: '您好！我是 Panda Admin 的 AI 助手，有什么可以帮助您的吗？',
    time: new Date().toLocaleTimeString(),
  },
]);

const handleSend = async () => {
  if (!inputMessage.value.trim()) {
    message.warning('请输入消息');
    return;
  }

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content: inputMessage.value,
    time: new Date().toLocaleTimeString(),
  });

  const userMessage = inputMessage.value;
  inputMessage.value = '';
  loading.value = true;

  try {
    // TODO: 调用 AI Agent 获取回复
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 添加 AI 回复
    messages.value.push({
      role: 'assistant',
      content: `您的问题是："${userMessage}"。AI 助手正在开发中，即将为您提供智能回复！`,
      time: new Date().toLocaleTimeString(),
    });
  } catch (error) {
    message.error('发送失败');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="less">
.chat-assistant {
  height: calc(100vh - 200px);

  .chat-container {
    display: flex;
    flex-direction: column;
    height: 600px;

    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      background: #f5f5f5;
      border-radius: 4px;
      margin-bottom: 16px;

      .message {
        display: flex;
        margin-bottom: 16px;

        &.user {
          flex-direction: row-reverse;

          .message-content {
            align-items: flex-end;
          }

          .message-text {
            background: #1890ff;
            color: white;
          }
        }

        .message-avatar {
          margin: 0 12px;
        }

        .message-content {
          display: flex;
          flex-direction: column;
          max-width: 70%;

          .message-text {
            padding: 12px 16px;
            border-radius: 8px;
            background: white;
            word-break: break-word;
          }

          .message-time {
            font-size: 12px;
            color: #999;
            margin-top: 4px;
          }
        }
      }
    }

    .chat-input {
      padding-top: 16px;
    }
  }
}
</style>
