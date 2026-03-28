<template>
  <div class="users">
    <a-card title="用户管理" :bordered="false">
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
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username'
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const data = ref([
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    role: '管理员',
    status: '正常'
  },
  {
    id: 2,
    username: 'user1',
    email: 'user1@example.com',
    role: '用户',
    status: '正常'
  },
  {
    id: 3,
    username: 'user2',
    email: 'user2@example.com',
    role: '用户',
    status: '禁用'
  }
])
</script>

<style scoped>
.users {
  padding: 16px;
}
</style>
