<template>
  <div class="tabs-container">
    <a-tabs
      v-model:activeKey="activeTab"
      type="editable-card"
      hide-add
      @tabClick="handleTabClick"
      @edit="handleTabEdit"
    >
      <a-tab-pane
        v-for="tab in tabs"
        :key="tab.path"
        :tab="renderTab(tab)"
        :closable="tab.closable"
      />
    </a-tabs>
  </div>
</template>

<script setup>
import { computed, watch, onMounted, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTabsStore } from '../stores/tabs'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const tabsStore = useTabsStore()

const tabs = computed(() => tabsStore.tabs)
const activeTab = computed({
  get: () => tabsStore.activeTab,
  set: (value) => tabsStore.setActiveTab(value)
})

const renderTab = (tab) => {
  return h('a-dropdown', {
    trigger: ['contextmenu']
  }, {
    default: () => h('span', {}, tab.title),
    overlay: () => h('a-menu', {
      onClick: ({ key }) => handleContextMenuClick(key, tab)
    }, {
      default: () => [
        h('a-menu-item', { key: 'refresh' }, '刷新'),
        tab.closable ? h('a-menu-item', { key: 'close' }, '关闭') : null,
        h('a-menu-divider'),
        h('a-menu-item', { key: 'closeOthers' }, '关闭其他'),
        h('a-menu-item', { key: 'closeLeft' }, '关闭左侧'),
        h('a-menu-item', { key: 'closeRight' }, '关闭右侧'),
        h('a-menu-divider'),
        h('a-menu-item', { key: 'closeAll' }, '关闭全部')
      ]
    })
  })
}

const handleTabClick = (key) => {
  const tab = tabs.value.find(t => t.path === key)
  if (tab) {
    router.push(tab.path)
  }
}

const handleTabEdit = (targetKey, action) => {
  if (action === 'remove') {
    tabsStore.removeTab(targetKey)
  }
}

const handleContextMenuClick = (key, tab) => {
  switch (key) {
    case 'refresh':
      router.replace({ path: tab.path, query: { _t: Date.now() } })
      message.success('刷新成功')
      break
    case 'close':
      tabsStore.removeTab(tab.path)
      break
    case 'closeOthers':
      tabsStore.closeOtherTabs(tab.path)
      break
    case 'closeLeft':
      tabsStore.closeLeftTabs(tab.path)
      break
    case 'closeRight':
      tabsStore.closeRightTabs(tab.path)
      break
    case 'closeAll':
      tabsStore.closeAllTabs()
      router.push('/')
      break
  }
}

watch(() => route.path, (newPath) => {
  tabsStore.addTab(route)
}, { immediate: true })

watch(() => activeTab.value, (newActiveTab) => {
  if (newActiveTab && newActiveTab !== route.path) {
    router.push(newActiveTab)
  }
})

onMounted(() => {
  tabsStore.addTab(route)
})
</script>

<style scoped>
.tabs-container {
  background: #fff;
  margin-top: 16px;
}

:deep(.ant-tabs-nav) {
  margin-bottom: 0;
}
</style>
