import { useAuthStore } from '@/stores/auth.store'

export function roleGuard(requiredRole) {
  return (to, from, next) => {
    const auth = useAuthStore()
    
    if (!auth.user) {
      return next({ name: 'login' })
    }

    if (auth.user.role !== requiredRole) {
      return next({ name: 'dashboard' })
    }

    return next()
  }
}
