<script setup>
import { onMounted, computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import AppTable from '@/components/common/AppTable.vue'
import { useFetch } from '@/composables/useFetch'
import { useTable } from '@/composables/useTable'
import { fetchDashboardStats, fetchRecentActivity } from '@/services/dashboard.service'

const { data: stats, loading: statsLoading, execute: loadStats } = useFetch(fetchDashboardStats, {
  initialData: {},
  immediate: false,
})

const {
  rows,
  displayedRows,
  loading: activityLoading,
  headerColumns,
  loadRows,
} = useTable({
  columns: [
    { key: 'name', label: 'User' },
    { key: 'action', label: 'Action' },
    { key: 'date', label: 'Date' },
  ],
  fetcher: fetchRecentActivity,
})

onMounted(() => {
  loadStats()
  loadRows()
})

const statCards = computed(() => [
  {
    title: 'Active users',
    description: 'Last 24 hours',
    value: stats.value?.activeUsers ?? '—',
    trend: stats.value?.activeUsersTrend,
  },
  {
    title: 'New signups',
    description: 'Today',
    value: stats.value?.newSignups ?? '—',
    trend: stats.value?.newSignupsTrend,
  },
  {
    title: 'Revenue',
    description: 'This month',
    value: stats.value?.revenue ?? '—',
    trend: stats.value?.revenueTrend,
  },
])
</script>

<template>
  <section class="dashboard-view">
    <div class="dashboard-grid">
      <BaseCard
        v-for="card in statCards"
        :key="card.title"
        :title="card.title"
        :description="card.description"
      >
        <div class="dashboard-stat">
          <h2>{{ card.value }}</h2>
          <BaseBadge
            v-if="card.trend"
            :label="`${card.trend > 0 ? '+' : ''}${card.trend}%`"
            :variant="card.trend >= 0 ? 'success' : 'danger'"
            pill
          />
        </div>
      </BaseCard>
    </div>

    <BaseCard title="Recent activity" description="Latest actions across the platform">
      <AppTable
        :columns="headerColumns"
        :rows="displayedRows"
        :loading="activityLoading"
        empty-message="No recent activity"
      />
    </BaseCard>
  </section>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.dashboard-stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-stat h2 {
  margin: 0;
  font-size: 2rem;
}
</style>
