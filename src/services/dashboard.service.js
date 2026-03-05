export async function fetchDashboardStats() {
  // Placeholder: replace with real API call
  await new Promise((resolve) => setTimeout(resolve, 400))
  return {
    activeUsers: 324,
    activeUsersTrend: 6.2,
    newSignups: 28,
    newSignupsTrend: -1.1,
    revenue: '$42.3K',
    revenueTrend: 3.4,
  }
}

export async function fetchRecentActivity() {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return [
    { id: 1, name: 'Hannah Lee', action: 'Created user', date: '2026-03-01' },
    { id: 2, name: 'Alan Smith', action: 'Updated plan', date: '2026-03-01' },
    { id: 3, name: 'Yuki Tanaka', action: 'Invited admin', date: '2026-02-28' },
  ]
}
