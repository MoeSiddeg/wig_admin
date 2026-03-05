export function formatCurrency(amount, currency = 'USD', locale = 'en') {
  if (amount == null) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}
