<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo">
        <h2 v-if="!collapsed">Panda Admin</h2>
        <h2 v-else>Panda</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        theme="dark"
        mode="inline"
        @click="handleMenuClick"
      >
        <a-menu-item key="Home">
          <template #icon>
            <HomeOutlined />
          </template>
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="Dashboard">
          <template #icon>
            <DashboardOutlined />
          </template>
          <span>仪表盘</span>
        </a-menu-item>
        <a-menu-item key="Users">
          <template #icon>
            <UserOutlined />
          </template>
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="Analytics">
          <template #icon>
            <BarChartOutlined />
          </template>
          <span>数据分析</span>
        </a-menu-item>
        <a-menu-item key="Settings">
          <template #icon>
            <SettingOutlined />
          </template>
          <span>系统设置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <TabBar />
      <a-layout-content style="padding: 24px">
        <div class="content">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  HomeOutlined,
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons-vue'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)
const selectedKeys = ref(['Home'])

const handleMenuClick = ({ key }) => {
  router.push({ name: key })
}

// 监听路由变化，更新选中的菜单项
watch(() => route.name, (newName) => {
  if (newName) {
    selectedKeys.value = [newName]
  }
}, { immediate: true })
</script>

<style scoped>
.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  margin: 16px;
  border-radius: 8px;
}

.logo h2 {
  color: #fff;
  margin: 0;
  font-size: 18px;
  white-space: nowrap;
}

.content {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  min-height: calc(100vh - 200px);
}
</style>
