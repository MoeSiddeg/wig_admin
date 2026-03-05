export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/DashboardView.vue'),
    meta: {
      requiresAuth: true,
      title: 'dashboard',
    },
  },
]
