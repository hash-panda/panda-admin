import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  // Theme mode: 'light' or 'dark'
  const mode = ref<'light' | 'dark'>('light')

  // Primary color
  const primaryColor = ref('#1890ff')

  // Layout mode: 'side' (sidebar), 'top' (top menu), or 'mix' (mixed)
  const layoutMode = ref<'side' | 'top' | 'mix'>('side')

  // Sidebar collapsed state
  const sidebarCollapsed = ref(false)

  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('panda-admin-theme')
      if (savedSettings) {
        const settings = JSON.parse(savedSettings)
        if (settings.mode) mode.value = settings.mode
        if (settings.primaryColor) primaryColor.value = settings.primaryColor
        if (settings.layoutMode) layoutMode.value = settings.layoutMode
        if (typeof settings.sidebarCollapsed === 'boolean') {
          sidebarCollapsed.value = settings.sidebarCollapsed
        }
      }
    } catch (error) {
      console.error('Failed to load theme settings:', error)
    }
  }

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        mode: mode.value,
        primaryColor: primaryColor.value,
        layoutMode: layoutMode.value,
        sidebarCollapsed: sidebarCollapsed.value
      }
      localStorage.setItem('panda-admin-theme', JSON.stringify(settings))
    } catch (error) {
      console.error('Failed to save theme settings:', error)
    }
  }

  // Toggle theme mode
  const toggleMode = () => {
    mode.value = mode.value === 'light' ? 'dark' : 'light'
  }

  // Set theme mode
  const setMode = (newMode: 'light' | 'dark') => {
    mode.value = newMode
  }

  // Set primary color
  const setPrimaryColor = (color: string) => {
    primaryColor.value = color
  }

  // Set layout mode
  const setLayoutMode = (newMode: 'side' | 'top' | 'mix') => {
    layoutMode.value = newMode
  }

  // Toggle sidebar
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  // Set sidebar collapsed state
  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed
  }

  // Computed property for dark mode
  const isDark = computed(() => mode.value === 'dark')

  // Watch for changes and save to localStorage
  watch([mode, primaryColor, layoutMode, sidebarCollapsed], () => {
    saveSettings()
    applyTheme()
  }, { deep: true })

  // Apply theme to document
  const applyTheme = () => {
    const root = document.documentElement
    root.setAttribute('data-theme', mode.value)
    root.style.setProperty('--primary-color', primaryColor.value)
  }

  // Initialize
  loadSettings()
  applyTheme()

  return {
    mode,
    primaryColor,
    layoutMode,
    sidebarCollapsed,
    isDark,
    toggleMode,
    setMode,
    setPrimaryColor,
    setLayoutMode,
    toggleSidebar,
    setSidebarCollapsed,
    saveSettings
  }
})
