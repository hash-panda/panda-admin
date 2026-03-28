<template>
  <div class="error-display">
    <a-result
      :status="status"
      :title="title"
      :sub-title="subTitle"
    >
      <template #icon>
        <component :is="iconComponent" />
      </template>
      <template #extra>
        <a-space direction="vertical" :size="8">
          <a-button 
            v-if="showRetry" 
            type="primary" 
            :loading="retrying"
            @click="handleRetry"
          >
            <template #icon>
              <ReloadOutlined />
            </template>
            {{ retryText }}
          </a-button>
          <a-button v-if="showCancel" @click="handleCancel">
            {{ cancelText }}
          </a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  CloseCircleOutlined,
  DisconnectOutlined,
  ClockCircleOutlined,
  WarningOutlined
} from '@ant-design/icons-vue'

const props = defineProps({
  error: {
    type: [Error, Object, String],
    default: null
  },
  errorType: {
    type: String,
    default: 'unknown'
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  showRetry: {
    type: Boolean,
    default: true
  },
  retrying: {
    type: Boolean,
    default: false
  },
  retryText: {
    type: String,
    default: '重试'
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  cancelText: {
    type: String,
    default: '取消'
  }
})

const emit = defineEmits(['retry', 'cancel'])

const displayTitle = computed(() => {
  if (props.title) return props.title
  
  const titles = {
    network: '网络连接失败',
    timeout: '请求超时',
    api: '服务器错误',
    validation: '数据验证失败',
    empty: '内容为空',
    unknown: '发生错误'
  }
  
  return titles[props.errorType] || titles.unknown
})

const displayMessage = computed(() => {
  if (props.message) return props.message
  
  if (typeof props.error === 'string') {
    return props.error
  }
  
  if (props.error?.message) {
    return props.error.message
  }
  
  const messages = {
    network: '请检查您的网络连接后重试',
    timeout: '请求时间过长，请稍后重试',
    api: '服务器暂时无法响应，请稍后重试',
    validation: '请检查输入内容是否符合要求',
    empty: '生成的内容为空，请重试',
    unknown: '发生未知错误，请稍后重试'
  }
  
  return messages[props.errorType] || messages.unknown
})

const status = computed(() => {
  const statusMap = {
    network: 'error',
    timeout: 'warning',
    api: 'error',
    validation: 'warning',
    empty: 'warning',
    unknown: 'error'
  }
  return statusMap[props.errorType] || 'error'
})

const iconComponent = computed(() => {
  const iconMap = {
    network: DisconnectOutlined,
    timeout: ClockCircleOutlined,
    api: CloseCircleOutlined,
    validation: WarningOutlined,
    empty: WarningOutlined,
    unknown: CloseCircleOutlined
  }
  return iconMap[props.errorType] || CloseCircleOutlined
})

const subTitle = computed(() => displayMessage.value)

const handleRetry = () => {
  emit('retry')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.error-display {
  padding: 40px 20px;
  text-align: center;
}
</style>
