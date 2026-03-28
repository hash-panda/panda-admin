import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useTabsStore = defineStore('tabs', () => {
  const tabs = ref([])
  const activeTab = ref('')
  const router = useRouter()

  // 添加标签
  const addTab = (tab) => {
    const existingTab = tabs.value.find(t => t.key === tab.key)
    if (!existingTab) {
      tabs.value.push(tab)
    }
    activeTab.value = tab.key
  }

  // 移除标签
  const removeTab = (targetKey) => {
    const targetIndex = tabs.value.findIndex(tab => tab.key === targetKey)
    if (targetIndex === -1) return

    const newTabs = tabs.value.filter(tab => tab.key !== targetKey)
    
    // 如果关闭的是当前激活的标签，需要跳转到其他标签
    if (activeTab.value === targetKey) {
      if (newTabs.length > 0) {
        // 跳转到列表中的最后一个标签
        const lastTab = newTabs[newTabs.length - 1]
        activeTab.value = lastTab.key
        router.push(lastTab.path)
      } else {
        // 如果没有标签了，跳转到首页
        activeTab.value = ''
        router.push('/')
      }
    }

    tabs.value = newTabs
  }

  // 移除其他标签
  const removeOtherTabs = (keepKey) => {
    const keepTab = tabs.value.find(tab => tab.key === keepKey)
    if (keepTab) {
      tabs.value = [keepTab]
      activeTab.value = keepKey
      router.push(keepTab.path)
    }
  }

  // 移除所有标签
  const removeAllTabs = () => {
    tabs.value = []
    activeTab.value = ''
    router.push('/')
  }

  // 刷新当前标签（重新加载页面）
  const refreshTab = (key) => {
    const tab = tabs.value.find(t => t.key === key)
    if (tab) {
      router.push(tab.path)
      window.location.reload()
    }
  }

  // 设置激活标签
  const setActiveTab = (key) => {
    activeTab.value = key
  }

  // 获取当前标签
  const currentTab = computed(() => {
    return tabs.value.find(tab => tab.key === activeTab.value)
  })

  return {
    tabs,
    activeTab,
    addTab,
    removeTab,
    removeOtherTabs,
    removeAllTabs,
    refreshTab,
    setActiveTab,
    currentTab
  }
})
