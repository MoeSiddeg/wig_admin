<script setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
  },
  rows: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  emptyMessage: {
    type: String,
    default: 'No data available',
  },
})
</script>

<template>
  <div class="app-table">
    <table>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key" :style="{ width: column.width }">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading">
          <td :colspan="columns.length" class="app-table__loading">Loading…</td>
        </tr>
        <tr v-else-if="!rows.length">
          <td :colspan="columns.length" class="app-table__empty">{{ emptyMessage }}</td>
        </tr>
        <tr v-else v-for="row in rows" :key="row.id" class="app-table__row">
          <td v-for="column in columns" :key="column.key">
            <slot :name="column.key" :row="row">
              {{ row[column.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.app-table {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: white;
}

th,
td {
  padding: 0.9rem 1rem;
  text-align: left;
  font-size: 0.95rem;
}

th {
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: var(--color-muted);
  background: rgba(15, 23, 42, 0.02);
}

tr + tr {
  border-top: 1px solid rgba(15, 23, 42, 0.05);
}

.app-table__row:hover {
  background: rgba(79, 70, 229, 0.04);
}

.app-table__loading,
.app-table__empty {
  text-align: center;
  color: var(--color-muted);
}
</style>
