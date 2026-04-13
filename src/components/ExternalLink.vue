<template>
  <a :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
</template>

<script setup lang="ts">
interface Props {
  to: string
}

defineProps<Props>()
</script>
