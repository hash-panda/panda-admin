import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTabsStore = defineStore('tabs', () => {
  // 所有的标签页
  const tabs = ref([])
  
  // 当前激活的标签页
  const activeTab = ref('')
  
  // 缓存的视图名称（用于 keep-alive）
  const cachedViews = computed(() => {
    return tabs.value.map(tab => tab.name)
  })
  
  // 添加标签页
  const addTab = (route) => {
    // 检查标签是否已存在
    const existTab = tabs.value.find(tab => tab.path === route.path)
    
    if (!existTab) {
      tabs.value.push({
        name: route.name,
        path: route.path,
        title: route.meta?.title || '未命名',
        closable: route.meta?.closable !== false // 默认可关闭
      })
    }
    
    // 设置当前激活的标签
    activeTab.value = route.path
  }
  
  // 删除标签页
  const removeTab = (targetPath) => {
    const index = tabs.value.findIndex(tab => tab.path === targetPath)
    if (index === -1) return
    
    // 如果删除的是当前激活的标签
    if (activeTab.value === targetPath) {
      // 尝试跳转到下一个标签
      if (index < tabs.value.length - 1) {
        activeTab.value = tabs.value[index + 1].path
      } else if (tabs.value.length > 1) {
        // 如果没有下一个标签，跳转到前一个标签
        activeTab.value = tabs.value[index - 1].path
      } else {
        // 如果是最后一个标签，清空
        activeTab.value = ''
      }
    }
    
    // 从数组中移除
    tabs.value.splice(index, 1)
  }
  
  // 关闭其他标签
  const closeOtherTabs = (targetPath) => {
    tabs.value = tabs.value.filter(tab => tab.path === targetPath)
    activeTab.value = targetPath
  }
  
  // 关闭所有标签
  const closeAllTabs = () => {
    tabs.value = []
    activeTab.value = ''
  }
  
  // 关闭左侧标签
  const closeLeftTabs = (targetPath) => {
    const index = tabs.value.findIndex(tab => tab.path === targetPath)
    if (index === -1) return
    
    tabs.value = tabs.value.slice(index)
  }
  
  // 关闭右侧标签
  const closeRightTabs = (targetPath) => {
    const index = tabs.value.findIndex(tab => tab.path === targetPath)
    if (index === -1) return
    
    tabs.value = tabs.value.slice(0, index + 1)
  }
  
  // 设置当前激活的标签
  const setActiveTab = (path) => {
    activeTab.value = path
  }
  
  return {
    tabs,
    activeTab,
    cachedViews,
    addTab,
    removeTab,
    closeOtherTabs,
    closeAllTabs,
    closeLeftTabs,
    closeRightTabs,
    setActiveTab
  }
})
