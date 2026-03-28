<template>
  <div class="code-preview">
    <!-- Loading State -->
    <a-spin v-if="loading" tip="正在预览..." size="large">
      <div class="preview-placeholder"></div>
    </a-spin>

    <!-- Error State -->
    <a-alert
      v-else-if="error"
      type="error"
      :message="error"
      show-icon
      class="preview-error"
    >
      <template #description>
        <div class="error-details">
          <p>代码预览失败，请检查生成的代码是否有语法错误。</p>
          <a-button type="link" size="small" @click="retryPreview">
            重试预览
          </a-button>
        </div>
      </template>
    </a-alert>

    <!-- Empty State -->
    <a-empty
      v-else-if="!code"
      description="暂无代码预览"
      :image="Empty.PRESENTED_IMAGE_SIMPLE"
    />

    <!-- Preview Content -->
    <div v-else class="preview-content">
      <component :is="previewComponent" v-if="previewComponent" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { Empty } from 'ant-design-vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['retry'])

const previewComponent = ref(null)
const compilationError = ref(null)

const compileCode = async (codeString) => {
  try {
    // Create a component from the generated code
    const templateMatch = codeString.match(/<template>([\s\S]*?)<\/template>/)
    const scriptMatch = codeString.match(/<script setup>([\s\S]*?)<\/script>/)
    
    if (!templateMatch) {
      throw new Error('无法找到 template 标签')
    }

    const template = templateMatch[1]
    const scriptContent = scriptMatch ? scriptMatch[1] : ''
    
    // Create component definition
    const componentDef = {
      template,
      setup: () => {
        // Execute script content in a safe way
        try {
          const setupFn = new Function('ref', 'onMounted', scriptContent)
          return setupFn(ref, onMounted)
        } catch (e) {
          console.error('Script execution error:', e)
          return {}
        }
      }
    }
    
    previewComponent.value = componentDef
    compilationError.value = null
  } catch (error) {
    console.error('Code compilation error:', error)
    compilationError.value = error.message
    emit('retry', error)
  }
}

const retryPreview = () => {
  if (props.code) {
    compileCode(props.code)
  }
}

// Watch for code changes
watch(() => props.code, (newCode) => {
  if (newCode && !props.loading) {
    compileCode(newCode)
  }
}, { immediate: true })

// Cleanup
onUnmounted(() => {
  previewComponent.value = null
})
</script>

<style scoped>
.code-preview {
  min-height: 400px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background: #fafafa;
}

.preview-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-error {
  margin: 16px;
}

.error-details {
  margin-top: 8px;
}

.preview-content {
  padding: 16px;
  background: white;
  min-height: 400px;
}
</style>
