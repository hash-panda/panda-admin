<template>
  <div class="default-layout">
    <a-layout style="min-height: 100vh">
      <a-layout-sider v-model:collapsed="collapsed" collapsible>
        <div class="logo">Panda Admin</div>
        <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="inline"
          @click="handleMenuClick"
        >
          <a-menu-item key="/dashboard">
            <template #icon>
              <DashboardOutlined />
            </template>
            <span>仪表盘</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <div class="header-content">
            <div class="breadcrumb">
              <a-breadcrumb>
                <a-breadcrumb-item>首页</a-breadcrumb-item>
                <a-breadcrumb-item>{{ currentTitle }}</a-breadcrumb-item>
              </a-breadcrumb>
            </div>
            <div class="user-info">
              <a-dropdown>
                <a class="ant-dropdown-link" @click.prevent>
                  <a-avatar size="small" :src="userStore.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'" />
                  <span>{{ userStore.username }}</span>
                  <DownOutlined />
                </a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="logout" @click="handleLogout">
                      <LogoutOutlined />
                      退出登录
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </a-layout-header>
        <a-layout-content class="content">
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  DashboardOutlined,
  DownOutlined,
  LogoutOutlined,
} from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const selectedKeys = ref<string[]>([route.path])

const currentTitle = computed(() => {
  return route.meta?.title || '仪表盘'
})

watch(
  () => route.path,
  (path) => {
    selectedKeys.value = [path]
  }
)

const handleMenuClick = ({ key }: { key: string }) => {
  router.push(key)
}

const handleLogout = () => {
  userStore.logout()
  message.success('退出登录成功')
  router.push('/login')
}
</script>

<style scoped >
.default-layout {
  .logo {
    height: 32px;
    margin: 16px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    overflow: hidden;
  }

  .header {
    background: white;
    padding: 0 24px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 100%;

      .user-info {
        .ant-dropdown-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(0, 0, 0, 0.85);
        }
      }
    }
  }

  .content {
    margin: 24px;
    padding: 24px;
    background: white;
    border-radius: 4px;
    min-height: 280px;
  }
}
</style>
