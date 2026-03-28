import { BaseAgent } from './base.agent';
import type { CodeGenAgentConfig, CodeGenerationRequest, CodeGenerationResponse, AIResponse } from '../types';

/**
 * 代码生成 Agent
 * 通过自然语言描述生成代码
 */
export class CodeGenAgent extends BaseAgent {
  protected config: CodeGenAgentConfig;

  constructor(config: CodeGenAgentConfig) {
    super(config);
    this.config = {
      codeStyle: 'functional',
      includeComments: true,
      includeTests: false,
      ...config
    };
  }

  /**
   * 执行代码生成任务
   */
  async execute(input: CodeGenerationRequest): Promise<AIResponse<CodeGenerationResponse>> {
    try {
      if (!this.validateInput(input)) {
        throw new Error('输入验证失败');
      }

      // 调用 AI API 生成代码
      const generatedCode = await this.generateCode(input);

      return {
        success: true,
        data: generatedCode,
        message: '代码生成成功'
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * 生成代码
   */
  private async generateCode(request: CodeGenerationRequest): Promise<CodeGenerationResponse> {
    const { description, type, framework, language, options } = request;

    // 模拟 AI 生成过程
    // 实际实现中，这里应该调用 OpenAI 或其他 AI API

    let code = '';
    let preview = '';
    let dependencies: string[] = [];

    if (type === 'component') {
      code = this.generateComponentCode(description, framework, language, options);
      dependencies = ['vue', 'ant-design-vue'];
    } else if (type === 'page') {
      code = this.generatePageCode(description, framework, language, options);
      dependencies = ['vue', 'vue-router', 'ant-design-vue'];
    }

    return {
      code,
      preview,
      dependencies,
      explanation: `基于描述"${description}"生成的${type}代码`
    };
  }

  /**
   * 生成组件代码
   */
  private generateComponentCode(description: string, framework: string, language: string, options?: any): string {
    const useTS = language === 'typescript';
    const useSetupScript = options?.useSetupScript;

    let code = '';

    if (useSetupScript) {
      code = `<script setup lang="${useTS ? 'ts' : 'js'}">
import { ref } from 'vue';

// ${description}
</script>

<template>
  <div class="generated-component">
    <!-- 组件内容 -->
  </div>
</template>

<style scoped lang="less">
.generated-component {
  /* 样式 */
}
</style>`;
    } else {
      code = `<template>
  <div class="generated-component">
    <!-- 组件内容 -->
  </div>
</template>

<script lang="${useTS ? 'ts' : 'js'}">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'GeneratedComponent',
  setup() {
    // ${description}
    return {};
  }
});
</script>

<style scoped lang="less">
.generated-component {
  /* 样式 */
}
</style>`;
    }

    return code;
  }

  /**
   * 生成页面代码
   */
  private generatePageCode(description: string, framework: string, language: string, options?: any): string {
    return `<template>
  <div class="generated-page">
    <a-card title="${description}">
      <!-- 页面内容 -->
    </a-card>
  </div>
</template>

<script setup lang="${language === 'typescript' ? 'ts' : 'js'}">
import { ref, onMounted } from 'vue';

// ${description}
onMounted(() => {
  console.log('页面已加载');
});
</script>

<style scoped lang="less">
.generated-page {
  padding: 24px;
}
</style>`;
  }

  /**
   * 验证输入
   */
  protected validateInput(input: any): boolean {
    return (
      input &&
      typeof input.description === 'string' &&
      input.description.trim().length > 0 &&
      ['component', 'page', 'hook', 'composable'].includes(input.type)
    );
  }
}
