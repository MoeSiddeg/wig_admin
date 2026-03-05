import { defineStore } from 'pinia'
import { login as loginService, register as registerService, logout as logoutService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
  }),
  actions: {
    async login(credentials) {
      this.loading = true
      try {
        const { user, token } = await loginService(credentials)
        this.user = user
        this.token = token
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        return user
      } finally {
        this.loading = false
      }
    },
    async register(payload) {
      this.loading = true
      try {
        const { user, token } = await registerService(payload)
        this.user = user
        this.token = token
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
        return user
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await logoutService()
      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
  },
})
