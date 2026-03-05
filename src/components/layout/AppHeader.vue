<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import { useAuthStore } from '@/stores/auth.store'
import { useLocale } from '@/composables/useLocale'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { locale, switchLocale, t } = useLocale()

const pageTitle = computed(() => {
  const metaTitle = route.meta?.title
  return metaTitle ? t(`nav.${metaTitle}`) : t('nav.dashboard')
})

const handleLogout = () => {
  authStore.user = null
  authStore.token = null
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  switchLocale(newLocale)
}
</script>

<template>
  <header class="app-header">
    <div class="app-header__left">
      <img src="@/assets/images/WFG_logo.svg" alt="WFG Logo" class="app-header__logo" />
      <span class="app-header__divider" />
      <span class="app-header__title">{{ pageTitle }}</span>
    </div>
    <div class="app-header__right">
      <button type="button" class="language-toggle" @click="toggleLanguage">
        {{ locale === 'en' ? 'العربية' : 'English' }}
      </button>
      <span class="app-header__user">{{ authStore.user?.name ?? 'Guest' }}</span>
      <AppButton size="sm" variant="secondary" @click="handleLogout">
        {{ t('common.logout') }}
      </AppButton>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--color-dark-navy);
}

.app-header__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-header__logo {
  height: 40px;
  width: auto;
}

.app-header__divider {
  width: 1px;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.2);
}

.app-header__title {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.app-header__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.language-toggle {
  padding: 0.5rem 0.85rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-orange);
  color: #FFFFFF;
}

.app-header__user {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.95);
}

@media (max-width: 1024px) {
  .app-header {
    padding: 1rem 1.5rem;
  }

  .app-header__logo {
    height: 36px;
  }

  .app-header__title {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .app-header {
    padding: 1rem;
  }

  .app-header__left {
    gap: 0.75rem;
  }

  .app-header__logo {
    height: 32px;
  }

  .app-header__divider {
    display: none;
  }

  .app-header__title {
    display: none;
  }

  .app-header__user {
    display: none;
  }

  .language-toggle {
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
  }
}
</style>
