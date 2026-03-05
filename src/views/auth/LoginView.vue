<script setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import { useLocale } from '@/composables/useLocale'
import { useAuthStore } from '@/stores/auth.store'

const { locale, switchLocale, t } = useLocale()
const router = useRouter()
const authStore = useAuthStore()

const state = reactive({
  email: '',
  password: '',
  error: '',
  loading: false,
})

onMounted(() => {
  const savedLocale = localStorage.getItem('locale') || 'en'
  document.documentElement.setAttribute('lang', savedLocale)
  document.documentElement.setAttribute('dir', savedLocale === 'ar' ? 'rtl' : 'ltr')
})

const handleSubmit = async () => {
  state.error = ''
  
  if (state.email === 'admin@wfg26.com' && state.password === 'admin12345678@') {
    state.loading = true
    try {
      const user = { name: 'Admin', email: state.email }
      const token = 'mock-token-' + Date.now()
      
      // Set in store (which will also set in localStorage)
      authStore.user = user
      authStore.token = token
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      
      await new Promise((resolve) => setTimeout(resolve, 500))
      router.push('/dashboard')
    } finally {
      state.loading = false
    }
  } else {
    state.error = locale.value === 'ar' 
      ? 'بيانات الدخول غير صحيحة. يرجى المحاولة مرة أخرى.'
      : 'Invalid credentials. Please try again.'
  }
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'en' ? 'ar' : 'en'
  switchLocale(newLocale)
}
</script>

<template>
  <section class="auth-view">
    <div class="auth-view__card">
      <div class="auth-view__header">
        <img src="@/assets/images/WFG_logo.svg" alt="WFG Logo" class="auth-view__logo" />
        <button type="button" class="language-toggle" @click="toggleLanguage">
          {{ locale === 'en' ? 'العربية' : 'English' }}
        </button>
      </div>

      <h1>{{ t('auth.welcomeBack') }}</h1>
      <p>{{ t('auth.loginSubtitle') }}</p>

      <BaseAlert v-if="state.error" type="danger" :message="state.error" dismissible @close="state.error = ''" />

      <form class="auth-view__form" @submit.prevent="handleSubmit">
        <AppInput 
          :label="t('auth.email')" 
          v-model="state.email" 
          type="email" 
          placeholder="admin@wfg26.com" 
          required 
        />
        <AppInput 
          :label="t('auth.password')" 
          v-model="state.password" 
          type="password" 
          placeholder="••••••••" 
          required 
        />
        <AppButton :loading="state.loading" block type="submit" :label="t('auth.signIn')" />
      </form>

      <div class="auth-view__hint">
        <small>{{ locale === 'en' ? 'Demo credentials:' : 'بيانات التجربة:' }}</small>
        <small><strong>admin@wfg26.com</strong> / <strong>admin12345678@</strong></small>
      </div>
    </div>
  </section>
</template>

<style scoped>
.auth-view {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, rgba(45, 27, 107, 0.05), rgba(246, 147, 32, 0.05));
}

.auth-view__card {
  width: min(460px, 100%);
  background: var(--color-white);
  border-radius: var(--radius-md);
  padding: 2.5rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.auth-view__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.auth-view__logo {
  height: 48px;
  width: auto;
}

.language-toggle {
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background: transparent;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.language-toggle:hover {
  background: var(--color-surface-variant);
  border-color: var(--color-primary);
}

h1 {
  margin: 0 0 0.5rem;
  color: var(--color-text-dark);
  font-size: 1.75rem;
}

p {
  margin: 0 0 1.5rem;
  color: var(--color-text-gray);
}

.auth-view__form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-view__hint {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;
  color: var(--color-text-medium);
}

@media (max-width: 640px) {
  .auth-view {
    padding: 1rem;
  }

  .auth-view__card {
    padding: 2rem 1.5rem;
  }

  .auth-view__logo {
    height: 40px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
