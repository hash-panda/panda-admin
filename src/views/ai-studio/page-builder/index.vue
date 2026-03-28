<template>
  <div class="page-builder">
    <a-card title="AI 页面构建器" :bordered="false">
      <a-alert
        message="功能开发中"
        description="页面构建器正在开发中，即将上线..."
        type="info"
        show-icon
        style="margin-bottom: 24px"
      />

      <a-form layout="vertical">
        <a-form-item label="页面需求描述">
          <a-textarea
            v-model:value="requirement"
            placeholder="请描述您想要创建的页面，例如：创建一个用户管理页面，包含用户列表、搜索、新增、编辑、删除功能"
            :rows="6"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" :loading="loading" @click="handleGenerate">
              <template #icon>
                <RobotOutlined />
              </template>
              AI 生成页面
            </a-button>
            <a-button @click="handleReset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>

      <a-divider />

      <a-empty description="生成的页面将在这里显示" />
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RobotOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const requirement = ref('');
const loading = ref(false);

const handleGenerate = async () => {
  if (!requirement.value) {
    message.warning('请输入页面需求描述');
    return;
  }

  loading.value = true;
  try {
    // TODO: 调用 AI Agent 生成页面
    await new Promise((resolve) => setTimeout(resolve, 2000));
    message.success('页面生成成功！');
  } catch (error) {
    message.error('页面生成失败');
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  requirement.value = '';
};
</script>

<style scoped lang="less">
.page-builder {
  min-height: 600px;
}
</style>
