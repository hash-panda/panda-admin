<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" collapsible :width="240">
      <div class="logo">
        <h1 v-if="!collapsed">Panda Admin</h1>
        <h1 v-else>PA</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
      >
        <a-menu-item key="dashboard" @click="navigateTo('/dashboard')">
          <template #icon>
            <DashboardOutlined />
          </template>
          <span>仪表板</span>
        </a-menu-item>
        <a-menu-item key="ai-workspace" @click="navigateTo('/ai-workspace')">
          <template #icon>
            <RobotOutlined />
          </template>
          <span>AI 工作台</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="header">
        <div class="header-content">
          <MenuUnfoldOutlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <MenuFoldOutlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <div class="header-right">
            <a-space>
              <a-button type="text" shape="circle">
                <template #icon>
                  <BellOutlined />
                </template>
              </a-button>
              <a-dropdown>
                <a-button type="text">
                  <template #icon>
                    <UserOutlined />
                  </template>
                  Admin
                </a-button>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="profile">个人中心</a-menu-item>
                    <a-menu-item key="settings">设置</a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="logout">退出登录</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-space>
          </div>
        </div>
      </a-layout-header>

      <a-layout-content class="content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  DashboardOutlined,
  RobotOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();

const collapsed = ref(false);
const selectedKeys = ref<string[]>(['dashboard']);
const openKeys = ref<string[]>([]);

const navigateTo = (path: string) => {
  router.push(path);
};

watch(
  () => route.path,
  (path) => {
    const key = path.replace(/^\//, '') || 'dashboard';
    selectedKeys.value = [key];
  },
  { immediate: true },
);
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.logo {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 10;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1677ff;
}

.header-right {
  display: flex;
  align-items: center;
}

.content {
  margin: 24px;
  overflow: auto;
}

.content-wrapper {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  min-height: calc(100vh - 112px);
}
</style>
