export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      layout: 'auth',
      requiresAuth: false,
      title: 'Sign in',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/auth/RegisterView.vue'),
    meta: {
      layout: 'auth',
      requiresAuth: false,
      title: 'Create account',
    },
  },
]
