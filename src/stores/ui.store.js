import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    sidebarOpen: false,
    loading: false,
    notifications: [],
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    closeSidebar() {
      this.sidebarOpen = false
    },
    openSidebar() {
      this.sidebarOpen = true
    },
    setLoading(value) {
      this.loading = value
    },
    addNotification(notification) {
      this.notifications.push({
        id: Date.now(),
        ...notification,
      })
    },
    removeNotification(id) {
      const index = this.notifications.findIndex((n) => n.id === id)
      if (index > -1) {
        this.notifications.splice(index, 1)
      }
    },
  },
})
