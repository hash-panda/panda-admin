<template>
  <a-config-provider :theme="themeConfig">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { theme } from 'ant-design-vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const themeConfig = computed(() => {
  return {
    algorithm: themeStore.isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: themeStore.primaryColor,
      borderRadius: 6
    }
  }
})
</script>
