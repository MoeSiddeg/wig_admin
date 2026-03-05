import { defineStore } from 'pinia'
import { fetchUsers, fetchUserDetail, updateUserStatus } from '@/services/user.service'

export const useUserStore = defineStore('users', {
  state: () => ({
    list: [],
    selected: null,
    loadingList: false,
    loadingDetail: false,
  }),
  actions: {
    async getUsers(params = {}) {
      this.loadingList = true
      try {
        const data = await fetchUsers(params)
        this.list = data
        return data
      } finally {
        this.loadingList = false
      }
    },
    async getUser(id) {
      this.loadingDetail = true
      try {
        const data = await fetchUserDetail(id)
        this.selected = data
        return data
      } finally {
        this.loadingDetail = false
      }
    },
    async setStatus(id, status) {
      const updated = await updateUserStatus(id, status)
      this.list = this.list.map((user) => (user.id === id ? { ...user, status: updated.status } : user))
      if (this.selected?.id === id) {
        this.selected = { ...this.selected, status: updated.status }
      }
      return updated
    },
  },
})
