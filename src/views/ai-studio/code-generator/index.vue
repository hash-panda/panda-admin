<template>
  <div class="code-generator">
    <a-card title="AI 代码生成器" :bordered="false">
      <a-alert
        message="功能开发中"
        description="代码生成器正在开发中，即将上线..."
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-form layout="vertical">
        <a-form-item label="代码需求描述">
          <a-textarea
            v-model:value="requirement"
            placeholder="请描述您想要生成的代码，例如：生成一个 Vue 3 组件，包含表单验证功能"
            :rows="6"
          />
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="代码类型">
              <a-select v-model:value="codeType" placeholder="选择代码类型">
                <a-select-option value="component">Vue 组件</a-select-option>
                <a-select-option value="api">API 接口</a-select-option>
                <a-select-option value="store">Store 状态管理</a-select-option>
                <a-select-option value="router">路由配置</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="编程语言">
              <a-select v-model:value="language" placeholder="选择编程语言">
                <a-select-option value="typescript">TypeScript</a-select-option>
                <a-select-option value="javascript">JavaScript</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="handleGenerate">
              <template #icon>
                <CodeOutlined />
              </template>
              AI 生成代码
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <a-divider />

      <a-empty description="生成的代码将在这里显示" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CodeOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const requirement = ref('');
const codeType = ref('component');
const language = ref('typescript');
const loading = ref(false);

const handleGenerate = async () => {
  if (!requirement.value) {
    message.warning('请输入代码需求描述');
    return;
  }

  loading.value = true;
  try {
    // TODO: 调用 AI Agent 生成代码
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.success('代码生成成功！');
  } catch (error) {
    message.error('代码生成失败');
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  requirement.value = '';
  codeType.value = 'component';
  language.value = 'typescript';
};
</script>

<style scoped lang="less">
.code-generator {
  min-height: 600px;
}
</style>
