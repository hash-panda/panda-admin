<template>
  <div v-if="visible" class="preview-container">
    <div v-if="mode === 'split'" class="preview-split" :class="{ 'is-mobile': isMobile }">
      <div class="preview-header">
        <div class="preview-title">
          <span>预览</span>
          <a-tag v-if="loading" color="processing">加载中</a-tag>
        </div>
        <a-space>
          <a-button type="text" size="small" @click="handleRefresh">
            <template #icon>
              <ReloadOutlined />
            </template>
          </a-button>
          <a-button type="text" size="small" @click="handleClose">
            <template #icon>
              <CloseOutlined />
            </template>
          </a-button>
        </a-space>
      </div>
      <div class="preview-body">
        <a-spin :spinning="loading" tip="加载中...">
          <slot name="content">
            <div class="empty-content">
              <Empty description="暂无预览内容" />
            </div>
          </slot>
        </a-spin>
      </div>
    </div>
    <a-modal
      v-else
      v-model:open="modalVisible"
      title="预览"
      :width="800"
      :footer="null"
      :destroyOnClose="true"
      @cancel="handleClose"
    >
      <div class="preview-modal-content">
        <a-spin :spinning="loading" tip="加载中...">
          <slot name="content">
            <Empty description="暂无预览内容" />
          </slot>
        </a-spin>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Modal, Spin, Tag, Button, Space, Empty } from 'ant-design-vue'
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons-vue'

const AModal = Modal
const ASpin = Spin
const ATag = Tag
const AButton = Button
const ASpace = Space

interface Props {
  visible: boolean
  mode?: 'split' | 'modal'
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'split',
  loading: false
})

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'update:mode', value: 'split' | 'modal'): void
  (e: 'update:loading', value: boolean): void
  (e: 'close'): void
  (e: 'refresh'): void
}>()

const modalVisible = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value)
})

const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const handleClose = () => {
  emit('update:visible', false)
  emit('close')
}

const handleRefresh = () => {
  emit('refresh')
}

watch(() => props.visible, (newVal) => {
  if (newVal) {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  } else {
    window.removeEventListener('resize', checkMobile)
  }
}, { immediate: true })
</script>

<style scoped>
.preview-container {
  width: 100%;
  height: 100%;
}

.preview-split {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e8e8e8;
  background: #fafafa;
}

.preview-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  font-size: 14px;
}

.preview-body {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  min-height: 0;
}

.preview-modal-content {
  min-height: 400px;
  max-height: 60vh;
  overflow-y: auto;
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
}

.preview-split.is-mobile {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  border-radius: 0;
}

@media (max-width: 768px) {
  .preview-split {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    border-radius: 0;
  }
}
</style>

