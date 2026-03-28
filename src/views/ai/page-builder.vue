<template>
  <div class="page-builder">
    <a-card title="AI 页面构建器">
      <a-form layout="vertical">
        <a-form-item label="页面描述">
          <a-textarea
            v-model:value="description"
            placeholder="请描述你想要创建的页面，例如：创建一个用户管理页面，包含表格和搜索功能"
            :rows="4"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="handleGenerate">
              生成页面
            </a-button>
            <a-button @click="handleClear">清空</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <a-divider />

      <div v-if="generatedPage" class="generated-content">
        <a-space style="margin-bottom: 16px">
          <a-button type="primary" @click="handlePreview">预览</a-button>
          <a-button @click="handleDownload">下载代码</a-button>
          <a-button @click="handleCopy">复制代码</a-button>
        </a-space>
        <a-card title="生成的页面配置">
          <pre>{{ JSON.stringify(generatedPage, null, 2) }}</pre>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { pageBuilderService } from '@/ai';

const description = ref('');
const loading = ref(false);
const generatedPage = ref<any>(null);

const handleGenerate = async () => {
  if (!description.value.trim()) {
    message.warning('请输入页面描述');
    return;
  }

  loading.value = true;
  try {
    const result = await pageBuilderService.generatePage(description.value);
    if (result.success) {
      generatedPage.value = result.data;
      message.success('页面生成成功');
    } else {
      message.error('页面生成失败：' + result.message);
    }
  } catch (error) {
    message.error('生成失败：' + error);
  } finally {
    loading.value = false;
  }
};

const handlePreview = () => {
  if (generatedPage.value) {
    const code = pageBuilderService.previewPage(generatedPage.value);
    console.log(code);
    message.info('预览代码已输出到控制台');
  }
};

const handleDownload = () => {
  if (generatedPage.value) {
    pageBuilderService.downloadCode(generatedPage.value);
    message.success('下载已开始');
  }
};

const handleCopy = async () => {
  if (generatedPage.value) {
    const code = pageBuilderService.previewPage(generatedPage.value);
    try {
      await navigator.clipboard.writeText(code);
      message.success('代码已复制到剪贴板');
    } catch (error) {
      message.error('复制失败');
    }
  }
};

const handleClear = () => {
  description.value = '';
  generatedPage.value = null;
};
</script>

<style scoped lang="less">
.page-builder {
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
