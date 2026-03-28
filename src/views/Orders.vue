<template>
  <div class="orders">
    <a-card title="订单管理" :bordered="false">
      <a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 10 }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="getStatusColor(record.status)">{{ record.status }}</a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">查看</a-button>
              <a-button type="link" size="small">发货</a-button>
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
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo'
  },
  {
    title: '客户',
    dataIndex: 'customer',
    key: 'customer'
  },
  {
    title: '金额',
    dataIndex: 'amount',
    key: 'amount'
  },
  {
    title: '下单时间',
    dataIndex: 'createTime',
    key: 'createTime'
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
    orderNo: 'ORD001',
    customer: '张三',
    amount: '¥1999',
    createTime: '2024-01-15 10:30',
    status: '待付款'
  },
  {
    orderNo: 'ORD002',
    customer: '李四',
    amount: '¥99',
    createTime: '2024-01-15 11:20',
    status: '已付款'
  },
  {
    orderNo: 'ORD003',
    customer: '王五',
    amount: '¥2999',
    createTime: '2024-01-15 14:00',
    status: '已发货'
  }
])

const getStatusColor = (status) => {
  const colors = {
    '待付款': 'orange',
    '已付款': 'blue',
    '已发货': 'green',
    '已完成': 'success',
    '已取消': 'default'
  }
  return colors[status] || 'default'
}
</script>

<style scoped>
.orders {
  padding: 16px;
}
</style>
