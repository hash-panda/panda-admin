<template>
  <div>
    <a-typography-title :level="2">系统设置</a-typography-title>
    <a-card title="基本设置" style="margin-top: 24px">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
        <a-form-item label="系统名称">
          <a-input v-model:value="formState.systemName" />
        </a-form-item>
        <a-form-item label="系统描述">
          <a-textarea v-model:value="formState.systemDescription" :rows="4" />
        </a-form-item>
        <a-form-item label="管理员邮箱">
          <a-input v-model:value="formState.adminEmail" />
        </a-form-item>
        <a-form-item label="通知设置">
          <a-checkbox v-model:checked="formState.enableEmail">启用邮件通知</a-checkbox>
          <a-checkbox v-model:checked="formState.enableSms" style="margin-left: 16px">启用短信通知</a-checkbox>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 20 }">
          <a-button type="primary" @click="handleSave">保存设置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { message } from 'ant-design-vue'

const formState = ref({
  systemName: 'Panda Admin',
  systemDescription: '基于 AI 驱动的 UI 框架管理系统',
  adminEmail: 'admin@example.com',
  enableEmail: true,
  enableSms: false
})

const handleSave = () => {
  message.success('设置保存成功！')
}
</script>
