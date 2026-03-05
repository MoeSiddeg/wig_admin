<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

const route = useRoute()
const isAuthLayout = computed(() => route.meta?.layout === 'auth')
</script>

<template>
  <div v-if="isAuthLayout" class="auth-layout">
    <RouterView />
  </div>
  <div v-else class="app-shell">
    <AppHeader />
    <div class="app-body">
      <AppSidebar />
      <main class="app-main">
        <RouterView />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-background);
}

.app-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.app-main {
  flex: 1;
  padding: 2rem;
  background: var(--color-white);
  border-left: 1px solid var(--color-border);
  overflow-y: auto;
}

.auth-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, rgba(45, 27, 107, 0.05), rgba(246, 147, 32, 0.05));
}

@media (max-width: 1024px) {
  .app-main {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .app-main {
    padding: 1rem;
    border-left: none;
  }

  .app-body {
    flex-direction: column;
  }
}
</style>
