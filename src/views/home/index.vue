<template>
  <div class="home-container">
    <a-card title="Panda Admin" :bordered="false">
      <p>欢迎使用 Panda Admin 管理系统</p>
      <a-space>
        <a-button type="primary">主要按钮</a-button>
        <a-button>默认按钮</a-button>
        <a-button type="dashed">虚线按钮</a-button>
        <a-button type="link">链接按钮</a-button>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.home-container {
  padding: 24px;
}
</style>
