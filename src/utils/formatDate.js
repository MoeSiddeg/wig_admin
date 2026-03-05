export function formatDate(date, locale = 'en') {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d)
}

export function formatDateTime(date, locale = 'en') {
  if (!date) return ''
  const d = new Date(date)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}
