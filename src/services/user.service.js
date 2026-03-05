import api from './api'

export async function fetchUsers(params = {}) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [
    { id: 1, name: 'Hannah Lee', email: 'hannah@example.com', status: 'active' },
    { id: 2, name: 'Alan Smith', email: 'alan@example.com', status: 'active' },
    { id: 3, name: 'Yuki Tanaka', email: 'yuki@example.com', status: 'inactive' },
  ]
}

export async function fetchUserDetail(id) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return {
    id,
    name: 'User ' + id,
    email: `user${id}@example.com`,
    status: 'active',
    createdAt: '2026-01-15',
  }
}

export async function updateUserStatus(id, status) {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return { id, status }
}
