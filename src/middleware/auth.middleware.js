import { useAuthStore } from '@/stores/auth.store'

export function authGuard(to, from, next) {
  try {
    const auth = useAuthStore()
    if (to.meta?.requiresAuth && !auth.token) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    if (to.meta?.guest && auth.token) {
      return next({ name: 'dashboard' })
    }

    return next()
  } catch (error) {
    console.error('Auth middleware error:', error)
    return next()
  }
}
