import { defineStore } from 'pinia';

interface AppState {
  pageLoading: boolean;
  projectConfig: {
    themeColor: string;
    showSettingButton: boolean;
  };
  menuSetting: {
    collapsed: boolean;
  };
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: {
      themeColor: '#1890ff',
      showSettingButton: false,
    },
    menuSetting: {
      collapsed: false,
    },
  }),

  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getThemeColor(): string {
      return this.projectConfig.themeColor;
    },
    getMenuCollapsed(): boolean {
      return this.menuSetting.collapsed;
    },
  },

  actions: {
    setPageLoading(loading: boolean) {
      this.pageLoading = loading;
    },
    setThemeColor(color: string) {
      this.projectConfig.themeColor = color;
    },
    setMenuCollapsed(collapsed: boolean) {
      this.menuSetting.collapsed = collapsed;
    },
  },
});
