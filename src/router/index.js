import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from './routes/auth.routes'
import dashboardRoutes from './routes/dashboard.routes'
import userRoutes from './routes/user.routes'
import { authGuard } from '@/middleware/auth.middleware'

const baseRoutes = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/map/MapView.vue'),
    meta: {
      requiresAuth: true,
      title: 'map',
    },
  },
  {
    path: '/sports',
    name: 'sports',
    component: () => import('@/views/sports/SportsView.vue'),
    meta: {
      requiresAuth: true,
      title: 'sports',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/settings/SettingsView.vue'),
    meta: {
      requiresAuth: true,
      title: 'settings',
    },
  },
  {
    path: '/messages',
    name: 'messages',
    component: () => import('@/views/messages/MessagesView.vue'),
    meta: {
      requiresAuth: true,
      title: 'messages',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...baseRoutes, ...dashboardRoutes, ...userRoutes, ...authRoutes],
})

router.beforeEach(authGuard)

export default router
