import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import { setupI18n } from './locales';
import { setupAntd } from './config/antd';
import './assets/styles/index.less';

const app = createApp(App);

// 状态管理
const pinia = createPinia();
app.use(pinia);

// 路由
app.use(router);

// 国际化
const i18n = setupI18n();
app.use(i18n);

// Ant Design Vue 配置
setupAntd();

app.mount('#app');

export default app;
