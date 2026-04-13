<template>
  <div class="settings-container">
    <a-page-header title="主题设置" sub-title="自定义您的系统外观" />

    <a-card title="主题模式" class="settings-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="setting-item">
          <span class="setting-label">主题模式</span>
          <a-radio-group v-model:value="themeMode" button-style="solid">
            <a-radio-button value="light">浅色模式</a-radio-button>
            <a-radio-button value="dark">深色模式</a-radio-button>
          </a-radio-group>
        </div>
      </a-space>
    </a-card>

    <a-card title="主题颜色" class="settings-card">
      <a-space direction="vertical" style="width: 100%">
        <div class="setting-item">
          <span class="setting-label">主色调</span>
          <div class="color-presets">
            <div
              v-for="color in presetColors"
              :key="color"
              class="color-preset"
              :class="{ active: themeStore.primaryColor === color }"
              :style="{ backgroundColor: color }"
              @click="themeStore.setPrimaryColor(color)"
            ></div>
          </div>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const themeMode = computed({
  get: () => themeStore.mode,
  set: (value: 'light' | 'dark') => {
    themeStore.setMode(value)
  }
})

const presetColors = [
  '#1677ff',
  '#52c41a',
  '#faad14',
  '#f5222d',
  '#722ed1',
  '#eb2f96',
  '#13c2c2',
  '#fa8c16'
]
</script>

<style scoped>
.settings-container {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.settings-card {
  margin-bottom: 24px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.setting-label {
  font-weight: 500;
  min-width: 100px;
}

.color-presets {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.color-preset {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.3s;
  position: relative;
}

.color-preset:hover {
  transform: scale(1.1);
}

.color-preset.active {
  border-color: currentColor;
}
</style>
