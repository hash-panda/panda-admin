import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export function setupAntd() {
  // 全局配置 Ant Design Vue
  ConfigProvider.config({
    theme: {
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 2
      }
    }
  });
}

export const defaultLocale = zhCN;
