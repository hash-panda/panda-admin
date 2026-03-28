import { agentRegistry } from '../agents';
import type { PageConfig, AIResponse } from '../types';

/**
 * 页面构建服务
 * 提供页面构建相关的业务逻辑
 */
export class PageBuilderService {
  private agent = agentRegistry.getAgent('pageBuilder');

  /**
   * 根据描述生成页面
   */
  async generatePage(description: string): Promise<AIResponse<PageConfig>> {
    if (!this.agent) {
      throw new Error('PageBuilder Agent 未初始化');
    }

    return this.agent.execute({ description });
  }

  /**
   * 预览页面
   */
  previewPage(pageConfig: PageConfig): string {
    // 将页面配置转换为预览代码
    return this.convertConfigToCode(pageConfig);
  }

  /**
   * 下载页面代码
   */
  downloadCode(pageConfig: PageConfig, filename?: string): void {
    const code = this.convertConfigToCode(pageConfig);
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || `${pageConfig.name}.vue`;
    link.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 将页面配置转换为代码
   */
  private convertConfigToCode(pageConfig: PageConfig): string {
    const { name, title, components, description } = pageConfig;

    let code = `<template>
  <div class="${name}">
    <a-page-header title="${title}" :sub-title="${description || ''}" />
    <div class="page-content">
`;

    // 生成组件代码
    components.forEach(comp => {
      code += this.generateComponentCode(comp, 6);
    });

    code += `    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 页面数据
const loading = ref(false);

onMounted(() => {
  console.log('${title} 页面已加载');
});
</script>

<style scoped lang="less">
.${name} {
  padding: 24px;

  .page-content {
    margin-top: 16px;
  }
}
</style>`;

    return code;
  }

  /**
   * 生成组件代码
   */
  private generateComponentCode(comp: any, indent: number = 0): string {
    const spaces = ' '.repeat(indent);
    const { type, props, slots, children } = comp;

    let code = `${spaces}<${type}`;

    // 添加 props
    if (props && Object.keys(props).length > 0) {
      Object.entries(props).forEach(([key, value]) => {
        if (typeof value === 'string') {
          code += ` ${key}="${value}"`;
        } else if (typeof value === 'boolean') {
          if (value) code += ` ${key}`;
        } else {
          code += ` :${key}="${JSON.stringify(value)}"`;
        }
      });
    }

    // 处理子组件或插槽
    if (children && children.length > 0) {
      code += '>\n';
      children.forEach(child => {
        code += this.generateComponentCode(child, indent + 2);
      });
      code += `${spaces}</${type}>\n`;
    } else if (slots && Object.keys(slots).length > 0) {
      code += '>\n';
      Object.entries(slots).forEach(([slotName, slotValue]) => {
        code += `${spaces}  <template #${slotName}>${slotValue}</template>\n`;
      });
      code += `${spaces}</${type}>\n`;
    } else {
      code += ' />\n';
    }

    return code;
  }
}

// 导出单例
export const pageBuilderService = new PageBuilderService();
