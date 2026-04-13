<template>
  <div class="products">
    <a-card title="产品管理" :bordered="false">
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'price'">
            <span>¥{{ record.price }}</span>
          </template>
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
    title: '产品名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price'
  },
  {
    title: '库存',
    dataIndex: 'stock',
    key: 'stock'
  },
  {
    title: '操作',
    key: 'action'
  }
]

const data = ref([
  {
    id: 1,
    name: '产品A',
    category: '电子产品',
    price: 1999,
    stock: 100
  },
  {
    id: 2,
    name: '产品B',
    category: '办公用品',
    price: 99,
    stock: 500
  },
  {
    id: 3,
    name: '产品C',
    category: '电子产品',
    price: 2999,
    stock: 50
  }
])
</script>

<style scoped>
.products {
  padding: 16px;
}
</style>
