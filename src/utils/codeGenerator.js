// AI Code Generator Utility
export class CodeGenerator {
  generateCode(prompt) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const code = this.generateTableCode(prompt)
          resolve(code)
        } catch (error) {
          reject(new Error("代码生成失败: " + error.message))
        }
      }, 1500)
    })
  }

  generateTableCode(prompt) {
    return `<template>
  <div class="user-table">
    <a-table 
      :columns="columns" 
      :data-source="dataSource" 
      :loading="loading"
      :pagination="{ pageSize: 10 }"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === \"action\"">
          <a-space>
            <a-button type="link" size="small">编辑</a-button>
            <a-button type="link" size="small" danger>删除</a-button>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const columns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "邮箱", dataIndex: "email", key: "email" },
  { title: "操作", key: "action" }
]

const dataSource = ref([])
const loading = ref(false)

onMounted(() => {
  loadData()
})

function loadData() {
  loading.value = true
  setTimeout(() => {
    dataSource.value = [
      { id: 1, name: "张三", email: "zhangsan@example.com" },
      { id: 2, name: "李四", email: "lisi@example.com" },
      { id: 3, name: "王五", email: "wangwu@example.com" }
    ]
    loading.value = false
  }, 500)
}
</script>

<style scoped>
.user-table {
  padding: 16px;
}
</style>`
  }
}

