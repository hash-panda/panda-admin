<template>
  <div class="home">
    <ChatWindow />
  </div>
</template>

<script setup lang="ts">
import ChatWindow from '@/components/Chat/ChatWindow.vue'
</script>

<style scoped>
.home {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
}
</style>
