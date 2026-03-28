<template>
  <div class="home-view">
    <a-card title="AI 代码生成与预览" :bordered="false">
      <a-row :gutter="16">
        <a-col :span="12">
          <!-- AI Code Generation Section -->
          <a-card title="代码生成" style="margin-bottom: 16px;">
            <CodeGenerator @code-generated="handleCodeGenerated" @error="handleGenerationError" />
          </a-card>
        </a-col>
        <a-col :span="12">
          <!-- Preview Section -->
          <a-card title="实时预览">
            <CodePreview 
              :code="codeStore.code" 
              :error="previewError || codeStore.error"
              :loading="codeStore.isGenerating || previewLoading"
              @retry="handlePreviewRetry"
            />
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CodeGenerator from '@/components/CodeGenerator.vue'
import CodePreview from '@/components/CodePreview.vue'
import { useCodeStore } from '@/store/code'
import { message } from 'ant-design-vue'

const codeStore = useCodeStore()
const previewError = ref(null)
const previewLoading = ref(false)

const handleCodeGenerated = (code) => {
  // Update store with generated code
  codeStore.setCode(code)
  
  // Trigger preview update
  previewLoading.value = true
  previewError.value = null
  
  // Allow preview to process the code
  setTimeout(() => {
    previewLoading.value = false
  }, 300)
  
  message.success('代码生成成功，预览已更新')
}

const handleGenerationError = (error) => {
  previewError.value = error.message
  message.error('代码生成失败：' + error.message)
}

const handlePreviewRetry = (error) => {
  // Retry preview compilation
  previewError.value = null
  previewLoading.value = true
  
  setTimeout(() => {
    previewLoading.value = false
    message.info('预览已刷新')
  }, 500)
}
</script>

<style scoped>
.home-view {
  max-width: 1400px;
  margin: 0 auto;
}
</style>
