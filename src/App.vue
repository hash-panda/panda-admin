<template>
  <div id="app" style="padding: 24px;">
    <a-layout>
      <a-layout-header style="background: #001529; padding: 0 24px;">
        <h1 style="color: white; line-height: 64px; margin: 0;">Panda Admin</h1>
      </a-layout-header>
      <a-layout-content style="padding: 24px; min-height: calc(100vh - 64px);">
        <a-card title="Markdown 渲染与代码高亮演示">
          <template #extra>
            <a-tag color="green">功能演示</a-tag>
          </template>
          
          <a-space direction="vertical" style="width: 100%;" size="large">
            <div>
              <h3>AI 输出示例</h3>
              <MarkdownRenderer :content="aiContent" />
            </div>
            
            <a-divider />
            
            <div>
              <h3>自定义 Markdown 输入测试</h3>
              <a-textarea
                v-model:value="customContent"
                placeholder="在此输入 Markdown 内容..."
                :rows="6"
                style="margin-bottom: 16px;"
              />
              <MarkdownRenderer :content="customContent" />
            </div>
          </a-space>
        </a-card>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownRenderer from './components/MarkdownRenderer.vue'

const aiContent = ref(`# AI 助手回答

您好！我是您的 AI 助手。以下是一个代码示例：

## JavaScript 示例

\`\`\`javascript
// 这是一个 JavaScript 代码示例
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

## Python 示例

\`\`\`python
# 这是一个 Python 代码示例
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
\`\`\`

## 功能列表

- 支持 Markdown 渲染
- 支持代码语法高亮
- 支持代码块一键复制
- 支持多种编程语言

### 表格示例

| 特性 | 状态 |
|------|------|
| Markdown 解析 | ✅ |
| 代码高亮 | ✅ |
| 一键复制 | ✅ |

希望这些示例对您有帮助！`)

const customContent = ref(`## 测试区域

在这里输入您自己的 Markdown 内容来测试渲染效果。

\`\`\`javascript
const test = "Hello World";
console.log(test);
\`\`\`
`)
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}
</style>
