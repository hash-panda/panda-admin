import type { RouteComponent } from 'vue-router';

export interface AppRouteModule {
  path: string;
  name: string;
  component?: RouteComponent;
  redirect?: string;
  meta?: RouteMeta;
  children?: AppRouteModule[];
  hideChildrenInMenu?: boolean;
}

export interface RouteMeta {
  title: string;
  icon?: string;
  hideMenu?: boolean;
  hideTab?: boolean;
  ignoreKeepAlive?: boolean;
  affix?: boolean;
  frameSrc?: string;
  frameLoading?: boolean;
  // AI 生成标记
  aiGenerated?: boolean;
  aiGeneratedAt?: string;
}
