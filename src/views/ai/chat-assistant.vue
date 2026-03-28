<template>
  <div class="chat-assistant">
    <a-card title="AI 聊天助手" class="chat-card">
      <div class="chat-container">
        <div class="chat-messages" ref="messagesContainer">
          <div
            v-for="msg in messages"
            :key="msg.id"
            :class="['message', msg.role]"
          >
            <div class="message-content">
              <div class="message-role">
                {{ msg.role === 'user' ? '你' : 'AI助手' }}
              </div>
              <div class="message-text">{{ msg.content }}</div>
            </div>
          </div>
          <div v-if="loading" class="message assistant">
            <div class="message-content">
              <div class="message-role">AI助手</div>
              <div class="message-text">正在思考中...</div>
            </div>
          </div>
        </div>
        <div class="chat-input">
          <a-input-search
            v-model:value="inputMessage"
            placeholder="输入你的问题..."
            :loading="loading"
            @search="handleSend"
          >
            <template #enterButton>
              <a-button type="primary">发送</a-button>
            </template>
          </a-input-search>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { message } from 'ant-design-vue';
import { chatAssistantService } from '@/ai';

const inputMessage = ref('');
const loading = ref(false);
const messages = ref<any[]>([]);
const messagesContainer = ref<HTMLElement>();

const handleSend = async () => {
  if (!inputMessage.value.trim()) {
    message.warning('请输入消息');
    return;
  }

  loading.value = true;
  try {
    const result = await chatAssistantService.sendMessage(inputMessage.value);
    messages.value = chatAssistantService.getHistory();
    inputMessage.value = '';
    scrollToBottom();
  } catch (error) {
    message.error('发送失败：' + error);
  } finally {
    loading.value = false;
  }
};

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
};
</script>

<style scoped lang="less">
.chat-assistant {
  padding: 24px;

  .chat-card {
    height: calc(100vh - 120px);

    :deep(.ant-card-body) {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    background: #f5f5f5;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .message {
    margin-bottom: 16px;

    &.user {
      .message-content {
        background: #1890ff;
        color: white;
        margin-left: auto;
      }
    }

    &.assistant {
      .message-content {
        background: white;
        color: #333;
        margin-right: auto;
      }
    }
  }

  .message-content {
    max-width: 70%;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .message-role {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 4px;
  }

  .message-text {
    line-height: 1.5;
  }

  .chat-input {
    margin-top: auto;
  }
}
</style>
