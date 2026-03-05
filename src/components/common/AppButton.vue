<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  block: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.loading) return
  emit('click', event)
}
</script>

<template>
  <button
    class="app-button"
    :class="[
      `app-button--${variant}`,
      `app-button--${size}`,
      { 'app-button--block': block },
    ]"
    :disabled="loading"
    @click="handleClick"
  >
    <span v-if="loading" class="app-button__spinner" aria-hidden="true"></span>
    <slot>{{ label }}</slot>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: var(--color-primary);
  color: white;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
  box-shadow: var(--shadow-sm);
}

.app-button--sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

.app-button--md {
  padding: 0.75rem 1.4rem;
}

.app-button--lg {
  padding: 1rem 1.8rem;
  font-size: 1.05rem;
}

.app-button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.app-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

.app-button--secondary {
  background: var(--color-secondary);
}

.app-button--danger {
  background: var(--color-danger);
}

.app-button--block {
  width: 100%;
}

.app-button__spinner {
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
