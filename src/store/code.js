// Code Store
import { defineStore } from "pinia"
import { ref } from "vue"

export const useCodeStore = defineStore("code", () => {
  const code = ref("")
  const prompt = ref("")
  const isGenerating = ref(false)
  const error = ref(null)

  function setCode(newCode) {
    code.value = newCode
    error.value = null
  }

  function setPrompt(newPrompt) {
    prompt.value = newPrompt
  }

  function setGenerating(generating) {
    isGenerating.value = generating
  }

  function setError(err) {
    error.value = err
  }

  function clear() {
    code.value = ""
    prompt.value = ""
    error.value = null
    isGenerating.value = false
  }

  return {
    code,
    prompt,
    isGenerating,
    error,
    setCode,
    setPrompt,
    setGenerating,
    setError,
    clear
  }
})
