export function isEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(value)
}

export function isRequired(value) {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value != null
}

export function minLength(value, min) {
  if (typeof value === 'string') {
    return value.length >= min
  }
  return false
}

export function maxLength(value, max) {
  if (typeof value === 'string') {
    return value.length <= max
  }
  return false
}
