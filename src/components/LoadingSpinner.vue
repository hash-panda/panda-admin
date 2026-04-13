<template>
  <div class="loading-spinner" :class="{ 'loading-spinner--small': small, 'loading-spinner--large': large }">
    <a-spin :size="size" :tip="tip">
      <div class="loading-spinner__content">
        <slot />
      </div>
    </a-spin>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tip: {
    type: String,
    default: '加载中...'
  },
  small: {
    type: Boolean,
    default: false
  },
  large: {
    type: Boolean,
    default: false
  }
})

const size = computed(() => {
  if (props.small) return 'small'
  if (props.large) return 'large'
  return 'default'
})
</script>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
}

.loading-spinner--small {
  min-height: auto;
}

.loading-spinner--large {
  min-height: 400px;
}

.loading-spinner__content {
  width: 100%;
}
</style>
