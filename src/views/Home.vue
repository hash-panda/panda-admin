<template>
  <div>
    <a-typography-title :level="2">首页</a-typography-title>
    <a-typography-paragraph>
      欢迎使用 Panda Admin 管理系统
    </a-typography-paragraph>
    <a-card title="系统信息" style="margin-top: 24px">
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="系统名称">Panda Admin</a-descriptions-item>
        <a-descriptions-item label="版本">v0.1.0</a-descriptions-item>
        <a-descriptions-item label="框架">Vue 3 + Ant Design Vue</a-descriptions-item>
        <a-descriptions-item label="状态">运行中</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup>
</script>
