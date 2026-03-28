<template>
  <div>
    <a-typography-title :level="2">用户管理</a-typography-title>
    <a-card style="margin-top: 24px">
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '用户名', dataIndex: 'name', key: 'name' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action' }
]

const data = ref([
  { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', status: '正常' },
  { id: 2, name: '李四', email: 'lisi@example.com', role: '用户', status: '正常' },
  { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', status: '禁用' },
  { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户', status: '正常' },
  { id: 5, name: '钱七', email: 'qianqi@example.com', role: '用户', status: '正常' }
])
</script>
