<template>
  <div class="chat-window">
    <!-- 头部 -->
    <div class="chat-header">
      <div class="chat-title">AI 助手</div>
      <div class="chat-actions">
        <a-button type="text" size="small" @click="handleClose">
          <template #icon>
            <CloseOutlined />
          </template>
        </a-button>
      </div>
    </div>

    <!-- 消息列表 -->
    <div class="chat-messages" ref="messagesRef">
      <div v-if="messages.length === 0" class="empty-state">
        <p>开始与 AI 助手对话吧</p>
      </div>
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message-item', message.role]"
      >
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input-area">
      <a-textarea
        v-model:value="inputValue"
        :auto-size="{ minRows: 1, maxRows: 4 }"
        placeholder="输入您的问题..."
        @keydown="handleKeyDown"
      />
      <a-button
        type="primary"
        :disabled="!inputValue.trim()"
        @click="handleSend"
      >
        发送
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const emit = defineEmits<{
  close: []
  send: [message: string]
}>()

const messages = ref<Message[]>([])
const inputValue = ref('')
const messagesRef = ref<HTMLElement>()

const handleClose = () => {
  emit('close')
}

const handleSend = () => {
  const content = inputValue.value.trim()
  if (!content) return

  // 添加用户消息
  messages.value.push({
    role: 'user',
    content
  })

  // 清空输入框
  inputValue.value = ''

  // 滚动到底部
  nextTick(() => {
    scrollToBottom()
  })

  // 触发发送事件
  emit('send', content)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}

const scrollToBottom = () => {
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

// 添加助手消息的方法（供外部调用）
const addAssistantMessage = (content: string) => {
  messages.value.push({
    role: 'assistant',
    content
  })
  nextTick(() => {
    scrollToBottom()
  })
}

defineExpose({
  addAssistantMessage
})
</script>

<style scoped>
.chat-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 头部样式 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e8e8e8;
  background-color: #fafafa;
}

.chat-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

.chat-actions {
  display: flex;
  gap: 8px;
}

/* 消息列表样式 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #999;
  font-size: 14px;
}

.message-item {
  display: flex;
  margin-bottom: 16px;
}

.message-item.user {
  justify-content: flex-end;
}

.message-item.assistant {
  justify-content: flex-start;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-item.user .message-content {
  background-color: #1890ff;
  color: #ffffff;
  border-bottom-right-radius: 2px;
}

.message-item.assistant .message-content {
  background-color: #ffffff;
  color: #262626;
  border: 1px solid #e8e8e8;
  border-bottom-left-radius: 2px;
}

/* 输入区域样式 */
.chat-input-area {
  display: flex;
  gap: 12px;
  padding: 16px 20px;
  border-top: 1px solid #e8e8e8;
  background-color: #fafafa;
}

.chat-input-area :deep(.ant-textarea) {
  flex: 1;
  resize: none;
}

.chat-input-area :deep(.ant-btn) {
  height: auto;
  min-height: 32px;
  align-self: flex-end;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .chat-header {
    padding: 12px 16px;
  }

  .chat-messages {
    padding: 16px;
  }

  .chat-input-area {
    padding: 12px 16px;
    gap: 8px;
  }

  .message-content {
    max-width: 85%;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .chat-header {
    padding: 10px 12px;
  }

  .chat-messages {
    padding: 12px;
  }

  .chat-input-area {
    padding: 10px 12px;
  }

  .message-content {
    max-width: 90%;
  }
}

/* 滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}
</style>
