<template>
  <div class="code-generator">
    <a-form layout="vertical">
      <a-form-item label="输入指令">
        <a-textarea
          v-model:value="prompt"
          placeholder="例如：创建一个包含用户列表的表格，支持分页和搜索功能"
          :rows="4"
          @input="handlePromptChange"
        />
      </a-form-item>
      
      <a-form-item>
        <a-space>
          <a-button 
            type="primary" 
            @click="generateCode"
            :loading="generating"
            :disabled="!prompt.trim()"
          >
            <template #icon>
              <ThunderboltOutlined />
            </template>
            生成代码
          </a-button>
          <a-button @click="clearPrompt">
            清空
          </a-button>
        </a-space>
      </a-form-item>
    </a-form>

    <a-divider />

    <div v-if="generatedCode" class="generated-code">
      <div style="margin-bottom: 8px;">
        <a-space>
          <span style="font-weight: bold;">生成的代码：</span>
          <a-button size="small" @click="copyCode">
            <template #icon>
              <CopyOutlined />
            </template>
            复制
          </a-button>
        </a-space>
      </div>
      <a-textarea
        :value="generatedCode"
        :rows="12"
        readonly
      />
    </div>

    <a-alert
      v-if="error"
      type="error"
      :message="error"
      show-icon
      style="margin-top: 16px;"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { message } from 'ant-design-vue'
import { ThunderboltOutlined, CopyOutlined } from '@ant-design/icons-vue'
import { CodeGenerator } from '../utils/codeGenerator'
import { useCodeStore } from '../store/code'

const emit = defineEmits(['code-generated', 'error'])

const prompt = ref('')
const generating = ref(false)
const generatedCode = ref('')
const error = ref('')

const codeStore = useCodeStore()
const codeGenerator = new CodeGenerator()

function handlePromptChange() {
  codeStore.setPrompt(prompt.value)
}

async function generateCode() {
  if (!prompt.value.trim()) {
    message.warning('请输入指令')
    return
  }

  generating.value = true
  error.value = ''
  
  try {
    const code = await codeGenerator.generateCode(prompt.value)
    generatedCode.value = code
    codeStore.setCode(code)
    emit('code-generated', code)
    message.success('代码生成成功！')
  } catch (err) {
    error.value = err.message
    codeStore.setError(err.message)
    emit('error', err)
    message.error('代码生成失败：' + err.message)
  } finally {
    generating.value = false
  }
}

function clearPrompt() {
  prompt.value = ''
  generatedCode.value = ''
  error.value = ''
  codeStore.clear()
  emit('code-generated', '')
}

function copyCode() {
  navigator.clipboard.writeText(generatedCode.value)
  message.success('已复制到剪贴板')
}

// Watch for code changes in store
watch(() => codeStore.code, (newCode) => {
  if (newCode && newCode !== generatedCode.value) {
    generatedCode.value = newCode
  }
})
</script>

<style scoped>
.code-generator {
  padding: 16px;
}

.generated-code {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
}
</style>
