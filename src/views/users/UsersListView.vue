<script setup>
import { onMounted, reactive } from 'vue'
import { useLocale } from '@/composables/useLocale'
import BaseCard from '@/components/ui/BaseCard.vue'
import AppTable from '@/components/common/AppTable.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import { useUserStore } from '@/stores/user.store'

const { t } = useLocale()
const userStore = useUserStore()

const state = reactive({
  loading: false,
})

onMounted(async () => {
  state.loading = true
  try {
    await userStore.getUsers()
  } finally {
    state.loading = false
  }
})

const columns = [
  { key: 'name', label: 'Name', width: '30%' },
  { key: 'email', label: 'Email', width: '40%' },
  { key: 'status', label: 'Status', width: '30%' },
]
</script>

<template>
  <section class="users-view">
    <BaseCard :title="t('nav.users')" description="Manage platform users">
      <AppTable :columns="columns" :rows="userStore.list" :loading="state.loading" empty-message="No users found">
        <template #status="{ row }">
          <BaseBadge
            :label="row.status"
            :variant="row.status === 'active' ? 'success' : 'neutral'"
            pill
          />
        </template>
      </AppTable>
    </BaseCard>
  </section>
</template>

<style scoped>
.users-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .users-view {
    gap: 1.5rem;
  }
}
</style>
