import { ref } from 'vue'
import { defineStore } from 'pinia'

const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)
  const updateLoading = bool => loading.value = bool

  return { loading, updateLoading }
})

export { useLoadingStore }
