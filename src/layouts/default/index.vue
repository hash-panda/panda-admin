<template>
  <a-layout class="layout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <h2 v-if="!collapsed">Panda Admin</h2>
        <h2 v-else>PA</h2>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
      >
        <a-menu-item key="/dashboard/home" @click="handleMenuClick('/dashboard/home')">
          <template #icon>
            <DashboardOutlined />
          </template>
          <span>首页</span>
        </a-menu-item>
        <a-sub-menu key="ai-studio">
          <template #icon>
            <RobotOutlined />
          </template>
          <template #title>AI 工作室</template>
          <a-menu-item key="/ai-studio/page-builder" @click="handleMenuClick('/ai-studio/page-builder')">
            页面构建器
          </a-menu-item>
          <a-menu-item key="/ai-studio/code-generator" @click="handleMenuClick('/ai-studio/code-generator')">
            代码生成器
          </a-menu-item>
          <a-menu-item key="/ai-studio/chat-assistant" @click="handleMenuClick('/ai-studio/chat-assistant')">
            AI 助手
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="layout-header">
        <div class="header-left">
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
        </div>
        <div class="header-right">
          <a-space>
            <a-button type="primary" @click="handleOpenAI">AI 助手</a-button>
            <a-avatar>U</a-avatar>
          </a-space>
        </div>
      </a-layout-header>
      <a-layout-content class="layout-content">
        <PageLoading :loading="pageLoading">
          <router-view />
        </PageLoading>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  DashboardOutlined,
  RobotOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useAppStore } from '@/store/modules/app';
import PageLoading from '@/components/layout/PageLoading.vue';

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

const collapsed = ref(false);
const selectedKeys = ref<string[]>([route.path]);
const openKeys = ref<string[]>(['ai-studio']);

const pageLoading = computed(() => appStore.getPageLoading);

const handleMenuClick = (path: string) => {
  router.push(path);
};

const handleOpenAI = () => {
  router.push('/ai-studio/chat-assistant');
};
</script>

<style scoped lang="less">
.layout {
  min-height: 100vh;

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.1);
    margin: 16px;
    border-radius: 4px;

    h2 {
      margin: 0;
    }
  }

  .layout-header {
    background: #fff;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

    .header-left {
      .trigger {
        font-size: 18px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }
    }

    .header-right {
      display: flex;
      align-items: center;
    }
  }

  .layout-content {
    margin: 24px;
    padding: 24px;
    background: #fff;
    border-radius: 4px;
    min-height: 280px;
  }
}
</style>
