<template>
  <a-config-provider :locale="antdLocale">
    <router-view />
  </a-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

const { locale } = useI18n();

const antdLocale = computed(() => {
  const localeMap: Record<string, any> = {
    'zh-CN': zhCN,
    'en-US': enUS
  };
  const antdLocaleValue = localeMap[locale.value] || zhCN;

  // 设置 dayjs 语言
  dayjs.locale(locale.value === 'zh-CN' ? 'zh-cn' : 'en');

  return antdLocaleValue;
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
