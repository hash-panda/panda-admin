<template>
  <div class="home-container">
    <a-card title="欢迎使用 Panda Admin" class="welcome-card">
      <p>这是一个基于 Vue 3 + Ant Design Vue 的管理系统模板。</p>
      <p>主题系统已集成，支持深色/浅色模式切换。</p>
      <div class="feature-list">
        <a-tag color="blue">Vue 3</a-tag>
        <a-tag color="green">TypeScript</a-tag>
        <a-tag color="purple">Ant Design Vue</a-tag>
        <a-tag color="orange">Pinia</a-tag>
      </div>
    </a-card>

    <a-row :gutter="16" class="demo-section">
      <a-col :span="12">
        <a-card title="主题演示">
          <p>当前主题: {{ themeStore.mode === 'dark' ? '深色模式' : '浅色模式' }}</p>
          <p>主题色: {{ themeStore.primaryColor }}</p>
          <a-button type="primary" @click="handleClick">主要按钮</a-button>
          <a-button style="margin-left: 8px">默认按钮</a-button>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="布局演示">
          <p>侧边栏宽度: {{ themeStore.sidebarCollapsed ? 64 : 200 }}px</p>
          <p>侧边栏模式: {{ themeStore.sidebarCollapsed ? '收起' : '展开' }}</p>
          <a-button @click="themeStore.toggleSidebar">
            {{ themeStore.sidebarCollapsed ? '展开侧边栏' : '收起侧边栏' }}
          </a-button>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { message } from 'ant-design-vue'

const themeStore = useThemeStore()

const handleClick = () => {
  message.success('按钮点击成功！')
}
</script>

<style scoped>
.home-container {
  padding: 24px;
}

.welcome-card {
  margin-bottom: 24px;
}

.feature-list {
  margin-top: 16px;
}

.demo-section {
  margin-top: 24px;
}
</style>
