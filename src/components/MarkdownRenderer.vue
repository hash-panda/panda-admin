<template>
  <div class="markdown-renderer">
    <div 
      ref="markdownContent" 
      class="markdown-content"
      v-html="renderedHtml"
    ></div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { marked } from 'marked'
import Prism from 'prismjs'

// Import Prism.js languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-swift'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-xml-doc'

// Import Prism.js theme
import 'prismjs/themes/prism-tomorrow.css'

const props = defineProps({
  content: {
    type: String,
    default: ''
  }
})

const markdownContent = ref(null)
const renderedHtml = ref('')

marked.setOptions({
  breaks: true,
  gfm: true
})

const renderMarkdown = () => {
  renderedHtml.value = marked.parse(props.content || '')
  nextTick(() => {
    highlightCode()
    addCopyButtons()
  })
}

const highlightCode = () => {
  if (markdownContent.value) {
    const codeBlocks = markdownContent.value.querySelectorAll('pre code')
    codeBlocks.forEach((block) => {
      Prism.highlightElement(block)
    })
  }
}

const addCopyButtons = () => {
  if (markdownContent.value) {
    const preElements = markdownContent.value.querySelectorAll('pre')
    preElements.forEach((pre) => {
      if (!pre.querySelector('.copy-button')) {
        const button = document.createElement('button')
        button.className = 'copy-button'
        button.textContent = '复制'
        button.onclick = () => {
          const code = pre.querySelector('code').textContent
          navigator.clipboard.writeText(code).then(() => {
            button.textContent = '已复制'
            setTimeout(() => {
              button.textContent = '复制'
            }, 2000)
          })
        }
        pre.style.position = 'relative'
        pre.appendChild(button)
      }
    })
  }
}

watch(() => props.content, () => {
  renderMarkdown()
}, { immediate: true })
</script>

<style scoped>
.markdown-renderer {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
}

.markdown-content {
  color: #333;
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
}

.markdown-content :deep(p) {
  margin-bottom: 16px;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 2em;
  margin-bottom: 16px;
}

.markdown-content :deep(code) {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-content :deep(pre) {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 6px;
  margin-bottom: 16px;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 12px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.copy-button:hover {
  background-color: #40a9ff;
}

.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
}

.markdown-content :deep(table th),
.markdown-content :deep(table td) {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.markdown-content :deep(table th) {
  background-color: #f6f8fa;
  font-weight: 600;
}

.markdown-content :deep(blockquote) {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin-bottom: 16px;
}

.markdown-content :deep(a) {
  color: #0366d6;
  text-decoration: none;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
}

.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
}
</style>

