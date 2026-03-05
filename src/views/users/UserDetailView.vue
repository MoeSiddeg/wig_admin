<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useUserStore } from '@/stores/user.store'

const { t } = useLocale()
const route = useRoute()
const userStore = useUserStore()

const state = reactive({
  loading: false,
})

onMounted(async () => {
  state.loading = true
  try {
    await userStore.getUser(route.params.id)
  } finally {
    state.loading = false
  }
})
</script>

<template>
  <section class="user-detail-view">
    <BaseCard title="User Details" description="View and manage user information">
      <div v-if="state.loading" class="loading">Loading...</div>
      <div v-else-if="userStore.selected" class="user-info">
        <div class="user-info__row">
          <strong>Name:</strong>
          <span>{{ userStore.selected.name }}</span>
        </div>
        <div class="user-info__row">
          <strong>Email:</strong>
          <span>{{ userStore.selected.email }}</span>
        </div>
        <div class="user-info__row">
          <strong>Status:</strong>
          <span>{{ userStore.selected.status }}</span>
        </div>
        <div class="user-info__row">
          <strong>Created:</strong>
          <span>{{ userStore.selected.createdAt }}</span>
        </div>
      </div>
    </BaseCard>
  </section>
</template>

<style scoped>
.user-detail-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: var(--color-text-medium);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-info__row {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.user-info__row strong {
  min-width: 120px;
  color: var(--color-text-dark);
}

.user-info__row span {
  color: var(--color-text-medium);
}

@media (max-width: 768px) {
  .user-info__row {
    flex-direction: column;
    gap: 0.25rem;
  }

  .user-info__row strong {
    min-width: auto;
  }
}
</style>
