<template>
  <div class="exception-container">
    <div class="exception-content">
      <div class="exception-image">
        <img src="@/assets/images/404.png" alt="404" />
      </div>
      <div class="exception-details">
        <h1>404</h1>
        <p>抱歉，您访问的页面不存在</p>
        <a-button type="primary" @click="goBack">返回上一页</a-button>
        <a-button @click="goHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.exception-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f0f2f5;
}

.exception-content {
  text-align: center;
}

.exception-image {
  margin-bottom: 24px;

  img {
    max-width: 400px;
    height: auto;
  }
}

.exception-details {
  h1 {
    font-size: 72px;
    font-weight: 600;
    color: #1890ff;
    margin-bottom: 16px;
  }

  p {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.45);
    margin-bottom: 32px;
  }

  .ant-btn {
    margin: 0 8px;
  }
}
</style>
