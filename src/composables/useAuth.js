import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

export function useAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  const route = useRoute()

  const isAuthenticated = computed(() => Boolean(authStore.token))

  const login = async (payload) => {
    await authStore.login(payload)
    const redirect = route.query.redirect ?? '/dashboard'
    router.replace(redirect)
  }

  const register = async (payload) => {
    await authStore.register(payload)
    router.replace('/dashboard')
  }

  const logout = async () => {
    await authStore.logout()
    router.push({ name: 'login' })
  }

  return {
    user: computed(() => authStore.user),
    token: computed(() => authStore.token),
    loading: computed(() => authStore.loading),
    isAuthenticated,
    login,
    register,
    logout,
  }
}
