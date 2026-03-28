<template>
  <div id="app">
    <router-view />
    <ChatWindow
      v-if="showChat"
      @close="showChat = false"
      @send="handleSendMessage"
    />
    <a-button
      type="primary"
      :style="chatButtonStyle"
      @click="showChat = true"
    >
      打开聊天
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ChatWindow from './components/Chat/ChatWindow.vue'

const showChat = ref(false)
const chatButtonStyle = {
  position: 'fixed' as const,
  bottom: '24px',
  right: '24px',
  zIndex: 1000
}

const handleSendMessage = (message: string) => {
  console.log('发送消息:', message)
  // 这里可以添加实际的发送逻辑
}
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
}
</style>
