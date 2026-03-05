import { ref } from 'vue'

export function useFetch(fetcher, options = {}) {
  const {
    immediate = true,
    initialData = null,
    onError = () => {},
    onSuccess = () => {},
  } = options

  const data = ref(initialData)
  const loading = ref(immediate)
  const error = ref(null)

  const execute = async (...args) => {
    loading.value = true
    error.value = null
    try {
      const result = await fetcher(...args)
      data.value = result
      onSuccess(result)
      return result
    } catch (err) {
      error.value = err
      onError(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  if (immediate) {
    execute()
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}
