<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { Home, Map, Trophy, Users, Settings, MessageSquare } from 'lucide-vue-next'

const { t } = useLocale()
const route = useRoute()
const activePath = computed(() => route.path)

const navItems = computed(() => [
  { label: t('nav.home'), to: '/dashboard', icon: Home },
  { label: t('nav.map'), to: '/map', icon: Map },
  { label: t('nav.sports'), to: '/sports', icon: Trophy },
  { label: t('nav.users'), to: '/users', icon: Users },
  { label: t('nav.settings'), to: '/settings', icon: Settings },
  { label: t('nav.messages'), to: '/messages', icon: MessageSquare },
])
</script>

<template>
  <aside class="app-sidebar">
    <nav>
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="app-sidebar__link"
        :class="{ 'app-sidebar__link--active': activePath.startsWith(item.to) }"
      >
        <component :is="item.icon" :size="20" class="app-sidebar__icon" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 240px;
  padding: 2rem 1.25rem;
  background: var(--color-dark-navy);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.app-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  transition: all 0.2s;
  margin-bottom: 0.35rem;
}

.app-sidebar__link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.95);
}

.app-sidebar__link--active {
  background: var(--color-orange);
  color: #FFFFFF;
}

.app-sidebar__icon {
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .app-sidebar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .app-sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transform: translateX(-100%);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .app-sidebar.open {
    transform: translateX(0);
  }
}
</style>
