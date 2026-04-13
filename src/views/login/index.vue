<template>
  <div class="login-container">
    <div class="login-form">
      <h1>登录</h1>
      <a-form :model="formState" @finish="handleLogin">
        <a-form-item name="username" :rules="[{ required: true, message: '请输入用户名' }]">
          <a-input v-model:value="formState.username" placeholder="用户名" size="large" />
        </a-form-item>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }]">
          <a-input-password v-model:value="formState.password" placeholder="密码" size="large" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" size="large" block :loading="loading">
            登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const formState = reactive({
  username: '',
  password: '',
})

const handleLogin = async () => {
  loading.value = true
  try {
    // 模拟登录
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 设置用户信息
    userStore.setToken('mock-token-' + Date.now())
    userStore.setUserInfo({
      id: '1',
      username: formState.username,
      email: 'admin@example.com',
      roles: ['admin'],
      permissions: ['dashboard:view', 'user:view', 'user:edit'],
    })

    message.success('登录成功')

    // 重定向到目标页面或首页
    const redirect = (router.currentRoute.value.query.redirect as string) || '/dashboard'
    await router.push(redirect)
  } catch (error) {
    message.error('登录失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped >
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-form {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  h1 {
    text-align: center;
    margin-bottom: 32px;
    color: #333;
  }
}
</style>
