<template>
  <div class="tab-bar">
    <a-tabs
      v-model:activeKey="activeTab"
      type="editable-card"
      hide-add
      @edit="onEdit"
      @change="onChange"
    >
      <template #renderTabPane="{ tab }">
        <div
          class="tab-pane"
          @contextmenu.prevent="showContextMenu($event, tab.key)"
        >
          {{ tab.label }}
        </div>
      </template>
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.key"
        :tab="tab.label"
        :closable="tabs.length > 1"
      />
    </a-tabs>

    <TabContextMenu
      :visible="contextMenuVisible"
      :x="contextMenuX"
      :y="contextMenuY"
      :tab-key="contextMenuTabKey"
      @close="hideContextMenu"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '@/stores/tabs'
import TabContextMenu from './TabContextMenu.vue'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()
const { tabs, activeTab, addTab, setActiveTab, removeTab } = tabsStore

const contextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuTabKey = ref('')

// 显示右键菜单
const showContextMenu = (event, tabKey) => {
  contextMenuTabKey.value = tabKey
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  contextMenuVisible.value = true
}

// 隐藏右键菜单
const hideContextMenu = () => {
  contextMenuVisible.value = false
}

// 标签编辑（关闭）
const onEdit = (targetKey, action) => {
  if (action === 'remove') {
    removeTab(targetKey)
  }
}

// 标签切换
const onChange = (key) => {
  setActiveTab(key)
  const tab = tabs.value.find(t => t.key === key)
  if (tab) {
    router.push(tab.path)
  }
}

// 监听路由变化，自动添加标签
watch(() => route.path, (newPath) => {
  const routeName = route.name
  if (routeName) {
    addTab({
      key: routeName,
      label: getRouteLabel(routeName),
      path: newPath
    })
  }
}, { immediate: true })

// 获取路由标签文本
const getRouteLabel = (routeName) => {
  const labels = {
    Home: '首页',
    Dashboard: '仪表盘',
    Users: '用户管理',
    Settings: '系统设置',
    Analytics: '数据分析'
  }
  return labels[routeName] || routeName
}
</script>

<style scoped>
.tab-bar {
  background: #fff;
  padding: 8px 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.tab-pane {
  display: inline;
}

:deep(.ant-tabs-tab) {
  user-select: none;
}

:deep(.ant-tabs-tab-active) {
  background: #e6f7ff;
}
</style>
