<template>
  <a-config-provider :locale="zhCN">
    <a-layout class="layout">
      <a-layout-header class="header">
        <div class="logo">Panda Admin</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            :items="menuItems"
            @click="handleMenuClick"
          />
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <Tabs />
          <a-layout-content class="content">
            <router-view v-slot="{ Component }">
              <keep-alive :include="cachedViews">
                <component :is="Component" :key="$route.fullPath" />
              </keep-alive>
            </router-view>
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<script setup>
import { ref, computed, h, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from './stores/tabs'
import Tabs from './components/Tabs.vue'
import * as Icons from '@ant-design/icons-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()

const selectedKeys = ref([route.name])

const menuItems = computed(() => {
  return router.getRoutes().filter(r => r.meta?.title).map(route => ({
    key: route.name,
    icon: h(Icons[route.meta.icon] || Icons.AppstoreOutlined),
    label: route.meta.title
  }))
})

const cachedViews = computed(() => tabsStore.cachedViews)

const handleMenuClick = ({ key }) => {
  selectedKeys.value = [key]
  router.push({ name: key })
}

// Watch route changes to automatically add tabs
watch(() => route.fullPath, (newPath) => {
  if (route.meta?.title) {
    tabsStore.addTab({
      path: route.fullPath,
      title: route.meta.title,
      name: route.name,
      closable: route.meta.closable !== false
    })
  }
}, { immediate: true })
</script>

<style scoped>
.layout {
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  background: #001529;
  padding: 0 24px;
}

.logo {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.content {
  background: #fff;
  padding: 24px;
  margin-top: 16px;
  min-height: 280px;
}
</style>
