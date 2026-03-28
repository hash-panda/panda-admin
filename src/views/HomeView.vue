<template>
  <div class="home-view">
    <div class="main-content">
      <div class="editor-section">
        <a-card title="编辑区域" :bordered="true" class="editor-card">
          <p>这里是主编辑区域</p>
          <a-space direction="vertical" style="width: 100%">
            <a-input placeholder="输入内容..." />
            <a-textarea placeholder="输入多行内容..." :rows="4" />
          </a-space>
        </a-card>
      </div>

      <div class="preview-section">
        <PreviewContainer
          v-model:visible="previewVisible"
          v-model:mode="previewMode"
          v-model:loading="previewLoading"
          @close="handlePreviewClose"
        >
          <template #content>
            <div class="preview-content">
              <h3>预览内容</h3>
              <p>这是预览容器的内容区域</p>
              <a-descriptions title="信息预览" bordered>
                <a-descriptions-item label="项目名称">Panda Admin</a-descriptions-item>
                <a-descriptions-item label="版本">1.0.0</a-descriptions-item>
                <a-descriptions-item label="状态">开发中</a-descriptions-item>
              </a-descriptions>
            </div>
          </template>
        </PreviewContainer>
      </div>
    </div>

    <div class="toolbar">
      <a-space>
        <a-button type="primary" @click="togglePreview">
          {{ previewVisible ? '关闭预览' : '开启预览' }}
        </a-button>
        <a-button @click="toggleMode">
          切换模式: {{ previewMode === 'split' ? '分屏' : '弹窗' }}
        </a-button>
        <a-button @click="toggleLoading">
          切换加载状态
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PreviewContainer from '@/components/PreviewContainer.vue'

const previewVisible = ref(true)
const previewMode = ref<'split' | 'modal'>('split')
const previewLoading = ref(false)

const togglePreview = () => {
  previewVisible.value = !previewVisible.value
}

const toggleMode = () => {
  previewMode.value = previewMode.value === 'split' ? 'modal' : 'split'
}

const toggleLoading = () => {
  previewLoading.value = !previewLoading.value
}

const handlePreviewClose = () => {
  previewVisible.value = false
}
</script>

<style scoped>
.home-view {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
}

.editor-section {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.editor-card {
  height: 100%;
}

.preview-section {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.preview-content {
  padding: 16px;
  height: 100%;
  overflow-y: auto;
}

.toolbar {
  height: 64px;
  background: white;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
