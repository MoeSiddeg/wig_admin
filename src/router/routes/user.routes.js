export default [
  {
    path: '/users',
    name: 'users-list',
    component: () => import('@/views/users/UsersListView.vue'),
    meta: {
      requiresAuth: true,
      title: 'users',
    },
  },
  {
    path: '/users/:id',
    name: 'user-detail',
    component: () => import('@/views/users/UserDetailView.vue'),
    meta: {
      requiresAuth: true,
      title: 'users',
    },
  },
]
