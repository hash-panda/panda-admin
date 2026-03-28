<template>
  <div
    v-show="visible"
    class="tab-context-menu"
    :style="{ left: `${x}px`, top: `${y}px` }"
    @click.stop
  >
    <div class="menu-item" @click="handleRefresh">
      <ReloadOutlined />
      <span>刷新</span>
    </div>
    <div class="menu-divider"></div>
    <div class="menu-item" @click="handleClose">
      <CloseOutlined />
      <span>关闭</span>
    </div>
    <div class="menu-item" @click="handleCloseOthers" :class="{ disabled: tabs.length <= 1 }">
      <CloseCircleOutlined />
      <span>关闭其他</span>
    </div>
    <div class="menu-item" @click="handleCloseAll" :class="{ disabled: tabs.length === 0 }">
      <CloseSquareOutlined />
      <span>关闭所有</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useTabsStore } from '@/stores/tabs'
import {
  ReloadOutlined,
  CloseOutlined,
  CloseCircleOutlined,
  CloseSquareOutlined
} from '@ant-design/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  },
  tabKey: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])

const tabsStore = useTabsStore()
const { tabs, removeTab, removeOtherTabs, removeAllTabs, refreshTab } = tabsStore

const handleRefresh = () => {
  if (props.tabKey) {
    refreshTab(props.tabKey)
  }
  emit('close')
}

const handleClose = () => {
  if (props.tabKey) {
    removeTab(props.tabKey)
  }
  emit('close')
}

const handleCloseOthers = () => {
  if (props.tabKey && tabs.length > 1) {
    removeOtherTabs(props.tabKey)
  }
  emit('close')
}

const handleCloseAll = () => {
  if (tabs.length > 0) {
    removeAllTabs()
  }
  emit('close')
}

// 点击外部关闭菜单
const handleClickOutside = (e) => {
  const menu = document.querySelector('.tab-context-menu')
  if (menu && !menu.contains(e.target)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.tab-context-menu {
  position: fixed;
  z-index: 1000;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  padding: 4px 0;
  user-select: none;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background 0.2s;
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
}

.menu-item:hover:not(.disabled) {
  background: rgba(0, 0, 0, 0.06);
}

.menu-item.disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.menu-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.06);
  margin: 4px 0;
}
</style>
