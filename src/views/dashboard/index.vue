<template>
  <div class="dashboard">
    <a-card title="欢迎使用 Panda Admin" :bordered="false">
      <p>Panda Admin 是一个基于 AI Agent 驱动的现代化前端管理后台框架。</p>
      <a-divider />
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon" style="background: #1890ff">
                <RobotOutlined style="font-size: 48px; color: white" />
              </div>
            </template>
            <a-card-meta title="页面构建器" description="通过 AI 快速构建页面" />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon" style="background: #52c41a">
                <CodeOutlined style="font-size: 48px; color: white" />
              </div>
            </template>
            <a-card-meta title="代码生成器" description="自动生成 Vue 组件代码" />
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable>
            <template #cover>
              <div class="card-icon" style="background: #722ed1">
                <MessageOutlined style="font-size: 48px; color: white" />
              </div>
            </template>
            <a-card-meta title="AI 助手" description="智能代码问答和辅助" />
          </a-card>
        </a-col>
      </a-row>
    </a-card>

    <a-card title="技术栈" style="margin-top: 24px" :bordered="false">
      <a-descriptions bordered :column="2">
        <a-descriptions-item label="Vue">3.4+</a-descriptions-item>
        <a-descriptions-item label="TypeScript">5.0+</a-descriptions-item>
        <a-descriptions-item label="Vite">5.0+</a-descriptions-item>
        <a-descriptions-item label="Ant Design Vue">4.x</a-descriptions-item>
        <a-descriptions-item label="Pinia">2.x</a-descriptions-item>
        <a-descriptions-item label="Vue Router">4.x</a-descriptions-item>
      </a-descriptions>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { RobotOutlined, CodeOutlined, MessageOutlined } from '@ant-design/icons-vue';
</script>

<style scoped lang="less">
.dashboard {
  .card-icon {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
