<template>
  <div class="settings">
    <a-card title="系统设置" :bordered="false">
      <a-form :model="formState" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
        <a-form-item label="系统名称">
          <a-input v-model:value="formState.systemName" />
        </a-form-item>
        <a-form-item label="管理员邮箱">
          <a-input v-model:value="formState.adminEmail" />
        </a-form-item>
        <a-form-item label="开启通知">
          <a-switch v-model:checked="formState.notifications" />
        </a-form-item>
        <a-form-item label="主题颜色">
          <a-select v-model:value="formState.theme" style="width: 120px">
            <a-select-option value="light">浅色</a-select-option>
            <a-select-option value="dark">深色</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 4, span: 14 }">
          <a-button type="primary" @click="onSubmit">保存设置</a-button>
          <a-button style="margin-left: 10px">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { message } from 'ant-design-vue'

const formState = reactive({
  systemName: 'Panda Admin',
  adminEmail: 'admin@example.com',
  notifications: true,
  theme: 'light'
})

const onSubmit = () => {
  message.success('设置保存成功')
}
</script>

<style scoped>
.settings {
  padding: 16px;
}
</style>
