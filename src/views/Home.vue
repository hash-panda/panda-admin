<template>
  <div class="home">
    <a-card title="异常处理与状态反馈演示" :bordered="false">
      <a-space direction="vertical" :size="24" style="width: 100%">
        
        <!-- 加载状态演示 -->
        <a-card size="small" title="1. 加载状态">
          <a-space>
            <a-button 
              type="primary" 
              :loading="loadingStates.basic"
              @click="handleBasicLoading"
            >
              基础加载
            </a-button>
            <LoadingSpinner 
              v-if="loadingStates.spinner" 
              tip="加载中..." 
              :small="true"
            />
          </a-space>
        </a-card>

        <!-- 网络错误演示 -->
        <a-card size="small" title="2. 网络错误处理">
          <a-space>
            <a-button 
              danger 
              :loading="networkLoading"
              @click="handleNetworkError"
            >
              模拟网络错误
            </a-button>
            <a-button 
              :loading="networkLoading"
              @click="handleSuccessRequest"
            >
              正常请求
            </a-button>
          </a-space>
          
          <ErrorDisplay
            v-if="networkError"
            :error="networkError"
            :error-type="networkError.type"
            :retrying="networkLoading"
            @retry="handleRetryNetwork"
          />
        </a-card>

        <!-- 超时错误演示 -->
        <a-card size="small" title="3. 请求超时处理">
          <a-space>
            <a-button 
              warning 
              :loading="timeoutLoading"
              @click="handleTimeoutError"
            >
              模拟超时
            </a-button>
          </a-space>
          
          <ErrorDisplay
            v-if="timeoutError"
            :error="timeoutError"
            :error-type="timeoutError.type"
            :retrying="timeoutLoading"
            @retry="handleRetryTimeout"
          />
        </a-card>

        <!-- 防重复提交演示 -->
        <a-card size="small" title="4. 防止重复提交">
          <a-form :model="formData" layout="inline">
            <a-form-item label="用户名">
              <a-input v-model:value="formData.username" placeholder="请输入用户名" />
            </a-form-item>
            <a-form-item>
              <a-button 
                type="primary" 
                :loading="debounceState.submitting"
                :disabled="!debounceState.canSubmit"
                @click="handleDebounceSubmit"
              >
                {{ debounceState.submitting ? '提交中...' : `提交 (${submitCount})` }}
              </a-button>
            </a-form-item>
          </a-form>
          <a-alert 
            v-if="debounceState.submitting"
            message="防止重复提交已启用" 
            type="info" 
            show-icon 
            style="margin-top: 8px"
          />
        </a-card>

        <!-- 空内容处理 -->
        <a-card size="small" title="5. 空内容处理">
          <a-space>
            <a-button 
              :loading="emptyLoading"
              @click="handleEmptyContent"
            >
              模拟空内容
            </a-button>
          </a-space>
          
          <ErrorDisplay
            v-if="emptyError"
            :error="emptyError"
            error-type="empty"
            :retrying="emptyLoading"
            @retry="handleRetryEmpty"
          />
        </a-card>

        <!-- Toast 消息演示 -->
        <a-card size="small" title="6. Toast 消息提示">
          <a-space>
            <a-button @click="showSuccessMsg">成功消息</a-button>
            <a-button @click="showErrorMsg">错误消息</a-button>
            <a-button @click="showWarningMsg">警告消息</a-button>
            <a-button @click="showInfoMsg">信息消息</a-button>
          </a-space>
        </a-card>

      </a-space>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorDisplay from '../components/ErrorDisplay.vue'
import useAsyncOperation from '../composables/useAsyncOperation'
import useDebounceSubmit from '../composables/useDebounceSubmit'
import { showSuccess, showError, showWarning, showInfo } from '../utils/message'

// 加载状态
const loadingStates = reactive({
  basic: false,
  spinner: false
})

// 网络错误处理
const networkLoading = ref(false)
const networkError = ref(null)

const networkOperation = useAsyncOperation(async () => {
  // 模拟网络错误
  throw new Error('Network Error')
}, {
  showErrorMessage: false
})

const handleNetworkError = async () => {
  networkLoading.value = true
  networkError.value = null
  try {
    await networkOperation.execute()
  } catch (err) {
    networkError.value = err
  } finally {
    networkLoading.value = false
  }
}

const handleSuccessRequest = async () => {
  networkLoading.value = true
  networkError.value = null
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    showSuccess('请求成功')
  } catch (err) {
    networkError.value = err
  } finally {
    networkLoading.value = false
  }
}

const handleRetryNetwork = async () => {
  networkLoading.value = true
  try {
    await handleSuccessRequest()
    networkError.value = null
  } catch (err) {
    networkError.value = err
  } finally {
    networkLoading.value = false
  }
}

// 超时错误处理
const timeoutLoading = ref(false)
const timeoutError = ref(null)

const timeoutOperation = useAsyncOperation(async () => {
  // 模拟超时
  await new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'))
    }, 2000)
  })
}, {
  showErrorMessage: false
})

const handleTimeoutError = async () => {
  timeoutLoading.value = true
  timeoutError.value = null
  try {
    await timeoutOperation.execute()
  } catch (err) {
    timeoutError.value = err
  } finally {
    timeoutLoading.value = false
  }
}

const handleRetryTimeout = async () => {
  handleTimeoutError()
}

// 防重复提交
const formData = reactive({
  username: ''
})
const submitCount = ref(0)

const debounceState = useDebounceSubmit({
  debounceTime: 2000,
  onSuccess: () => {
    submitCount.value++
    showSuccess('提交成功')
  }
})

const handleDebounceSubmit = () => {
  if (!formData.username) {
    showWarning('请输入用户名')
    return
  }
  debounceState.submit(async () => {
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000))
  })
}

// 空内容处理
const emptyLoading = ref(false)
const emptyError = ref(null)

const handleEmptyContent = async () => {
  emptyLoading.value = true
  emptyError.value = null
  try {
    // 模拟空内容
    await new Promise(resolve => setTimeout(resolve, 500))
    throw new Error('生成内容为空')
  } catch (err) {
    emptyError.value = { type: 'empty', message: err.message }
  } finally {
    emptyLoading.value = false
  }
}

const handleRetryEmpty = async () => {
  emptyLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    showSuccess('重试成功')
    emptyError.value = null
  } catch (err) {
    emptyError.value = { type: 'empty', message: err.message }
  } finally {
    emptyLoading.value = false
  }
}

// 基础加载演示
const handleBasicLoading = () => {
  loadingStates.basic = true
  setTimeout(() => {
    loadingStates.basic = false
    showSuccess('加载完成')
  }, 2000)
}

// Toast 消息演示
const showSuccessMsg = () => showSuccess('操作成功')
const showErrorMsg = () => showError('操作失败')
const showWarningMsg = () => showWarning('请注意')
const showInfoMsg = () => showInfo('提示信息')
</script>

<style scoped>
.home {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
