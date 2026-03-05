import { ref, computed } from 'vue'

export function useTable({ columns = [], fetcher }) {
  const rows = ref([])
  const loading = ref(false)
  const error = ref(null)

  const headerColumns = computed(() => columns)
  const displayedRows = computed(() => rows.value)

  const loadRows = async (...args) => {
    loading.value = true
    error.value = null
    try {
      const data = await fetcher(...args)
      rows.value = Array.isArray(data) ? data : data?.items ?? []
    } catch (err) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    rows,
    displayedRows,
    headerColumns,
    loading,
    error,
    loadRows,
  }
}
