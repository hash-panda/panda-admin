<template>
  <div v-if="loading" class="page-loading">
    <a-spin size="large" tip="加载中..." />
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  loading: boolean;
}

defineProps<Props>();
</script>

<style scoped lang="less">
.page-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
</style>
