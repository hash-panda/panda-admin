<template>
  <div>
    <a-typography-title :level="2">仪表盘</a-typography-title>
    <a-row :gutter="16" style="margin-top: 24px">
      <a-col :span="6">
        <a-card>
          <a-statistic title="总用户数" :value="11280" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="今日访问" :value="2156" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="活跃用户" :value="856" />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic title="订单数" :value="3421" />
        </a-card>
      </a-col>
    </a-row>
    <a-card title="最近活动" style="margin-top: 24px">
      <a-list :data-source="activities" :pagination="false">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta>
              <template #title>{{ item.title }}</template>
              <template #description>{{ item.time }}</template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activities = ref([
  { title: '用户 张三 完成了订单 #12345', time: '5 分钟前' },
  { title: '系统自动备份完成', time: '15 分钟前' },
  { title: '新用户 李四 注册成功', time: '30 分钟前' },
  { title: '数据同步完成', time: '1 小时前' },
  { title: '用户 王五 更新了个人资料', time: '2 小时前' }
])
</script>
