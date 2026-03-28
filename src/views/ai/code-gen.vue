<template>
  <div class="code-gen">
    <a-card title="AI 代码生成器">
      <a-form layout="vertical">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="代码类型">
              <a-select v-model:value="type" placeholder="选择代码类型">
                <a-select-option value="component">组件</a-select-option>
                <a-select-option value="page">页面</a-select-option>
                <a-select-option value="hook">Hook</a-select-option>
                <a-select-option value="composable">Composable</a-select-option>
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
        <a-form-item label="代码描述">
          <a-textarea
            v-model:value="description"
            placeholder="请描述你想要生成的代码"
            :rows="4"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="handleGenerate">
              生成代码
            </a-button>
            <a-button @click="handleClear">清空</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <a-divider />

      <div v-if="generatedCode" class="generated-content">
        <a-space style="margin-bottom: 16px">
          <a-button type="primary" @click="handleCopy">复制代码</a-button>
          <a-button @click="handleDownload">下载代码</a-button>
        </a-space>
        <a-card title="生成的代码">
          <pre>{{ generatedCode }}</pre>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { codeGenService } from '@/ai';

const type = ref('component');
const language = ref('typescript');
const description = ref('');
const loading = ref(false);
const generatedCode = ref('');

const handleGenerate = async () => {
  if (!description.value.trim()) {
    message.warning('请输入代码描述');
    return;
  }

  loading.value = true;
  try {
    const result = await codeGenService.generateCode({
      type: type.value,
      language: language.value,
      description: description.value,
      framework: 'vue3'
    });
    if (result.success) {
      generatedCode.value = result.data.code;
      message.success('代码生成成功');
    } else {
      message.error('代码生成失败：' + result.message);
    }
  } catch (error) {
    message.error('生成失败：' + error);
  } finally {
    loading.value = false;
  }
};

const handleCopy = async () => {
  if (generatedCode.value) {
    try {
      await codeGenService.copyToClipboard(generatedCode.value);
      message.success('代码已复制到剪贴板');
    } catch (error) {
      message.error('复制失败');
    }
  }
};

const handleDownload = () => {
  if (generatedCode.value) {
    const ext = language.value === 'typescript' ? 'ts' : 'js';
    codeGenService.downloadCode(generatedCode.value, `generated.${ext}`);
    message.success('下载已开始');
  }
};

const handleClear = () => {
  description.value = '';
  generatedCode.value = '';
};
</script>

<style scoped lang="less">
.code-gen {
  padding: 24px;

  .generated-content {
    margin-top: 24px;
  }

  pre {
    background: #f5f5f5;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
  }
}
</style>
