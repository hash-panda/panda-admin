<template>
  <div class="dashboard">
    <a-typography-title :level="2">仪表板</a-typography-title>
    <a-divider />

    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :md="6">
        <a-card hoverable>
          <a-statistic
            title="总访问量"
            :value="11280"
            :value-style="{ color: '#3f8600' }"
            prefix-icon="arrow-up"
          >
            <template #suffix>
              <user-outlined />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card hoverable>
          <a-statistic title="总销售额" :value="93000" prefix="¥">
            <template #suffix>
              <span style="font-size: 14px">/ 年</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card hoverable>
          <a-statistic title="活跃用户" :value="93">
            <template #suffix>
              <span style="font-size: 14px">%</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :md="6">
        <a-card hoverable>
          <a-statistic title="任务完成率" :value="87">
            <template #suffix>
              <span style="font-size: 14px">%</span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-divider />

    <a-card title="欢迎使用 Panda Admin">
      <p>Panda Admin 是一个基于 AI Agent 驱动的前端技术框架。</p>
      <a-typography-paragraph>
        <ul>
          <li>基于 Vue 3 + TypeScript + Vite 构建</li>
          <li>集成 Ant Design Vue 组件库</li>
          <li>AI Agent 驱动的代码生成</li>
          <li>智能化的开发体验</li>
        </ul>
      </a-typography-paragraph>
      <a-typography-paragraph>
        <a-typography-text strong>快速开始：</a-typography-text>
        <ul>
          <li>访问 <a href="#/ai-workspace">AI 工作台</a> 体验 AI 驱动的代码生成</li>
          <li>查看 <a href="https://github.com/hash-panda/panda-admin" target="_blank">GitHub 仓库</a> 了解更多</li>
        </ul>
      </a-typography-paragraph>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue';
</script>

<style scoped>
.dashboard {
  padding: 0;
}
</style>
