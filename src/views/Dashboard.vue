<template>
  <div class="dashboard">
    <a-card title="仪表盘" :bordered="false">
      <p>欢迎使用 Panda Admin 管理系统</p>
      <a-row :gutter="16">
        <a-col :span="8">
          <a-card title="总用户数" :bordered="false">
            <a-statistic :value="1128" style="margin-right: 50px">
              <template #suffix>
                <user-outlined />
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="今日访问" :bordered="false">
            <a-statistic :value="93" style="margin-right: 50px">
              <template #suffix>
                <span class="site-count-team-prefix">人</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card title="系统状态" :bordered="false">
            <a-badge status="processing" text="运行中" />
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
import { UserOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.dashboard {
  padding: 16px;
}
</style>
