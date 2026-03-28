<template>
  <div class="chat-panel">
    <div class="chat-header">
      <h2>Panda AI Chat</h2>
    </div>
    
    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(message, index) in messages"
        :key="index"
        :class="['message-bubble', message.type]"
      >
        <div class="message-avatar">
          <span v-if="message.type === 'user'">👤</span>
          <span v-else>🐼</span>
        </div>
        <div class="message-content">
          <div class="message-role">{{ message.type === 'user' ? 'You' : 'Panda AI' }}</div>
          <div class="message-text">{{ message.content }}</div>
        </div>
      </div>
      
      <div v-if="messages.length === 0" class="empty-state">
        <p>Start a conversation with Panda AI</p>
      </div>
    </div>
    
    <div class="chat-input-area">
      <a-input
        v-model:value="inputText"
        placeholder="Type your message..."
        @keyup.enter="handleSendMessage"
        :disabled="isLoading"
        size="large"
        class="chat-input"
      >
        <template #suffix>
          <a-button
            type="primary"
            @click="handleSendMessage"
            :loading="isLoading"
            :disabled="!inputText.trim()"
          >
            <SendOutlined />
          </a-button>
        </template>
      </a-input>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { SendOutlined } from '@ant-design/icons-vue'

const messages = ref([])
const inputText = ref('')
const isLoading = ref(false)
const messagesContainer = ref(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const handleSendMessage = async () => {
  const text = inputText.value.trim()
  if (!text || isLoading.value) return

  // Add user message
  messages.value.push({
    type: 'user',
    content: text,
    timestamp: new Date()
  })
  
  inputText.value = ''
  scrollToBottom()
  
  // Simulate AI response (in a real app, this would be an API call)
  isLoading.value = true
  
  setTimeout(() => {
    messages.value.push({
      type: 'ai',
      content: 'I received your message. This is a demo response from Panda AI.',
      timestamp: new Date()
    })
    
    isLoading.value = false
    scrollToBottom()
  }, 1000)
}

// Watch for messages changes to auto-scroll
watch(messages, () => {
  scrollToBottom()
}, { deep: true })
</script>

<style scoped>
.chat-panel {
  width: 800px;
  height: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-bubble {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 80%;
}

.message-bubble.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-bubble.ai {
  align-self: flex-start;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.message-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-role {
  font-size: 12px;
  color: #999;
  font-weight: 500;
}

.message-bubble.user .message-role {
  text-align: right;
}

.message-text {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-bubble.user .message-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-bubble.ai .message-text {
  background: white;
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}

.chat-input-area {
  padding: 20px;
  border-top: 1px solid #e8e8e8;
  background: white;
}

.chat-input {
  width: 100%;
}

/* Scrollbar styling */
.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
