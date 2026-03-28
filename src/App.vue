<template>
  <div id="app">
    <a-layout style="min-height: 100vh">
      <a-layout-header style="background: #001529; padding: 0 20px; display: flex; align-items: center;">
        <div style="color: white; font-size: 20px; font-weight: bold;">
          🐼 Panda Admin
        </div>
        <div style="color: #999; margin-left: 20px; font-size: 14px;">
          AI驱动的UI框架
        </div>
      </a-layout-header>
      <a-layout-content style="padding: 24px; background: #f0f2f5;">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
