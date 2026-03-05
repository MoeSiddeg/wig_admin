<script setup>
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'neutral',
  },
  pill: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <span class="base-badge" :class="[`base-badge--${variant}`, { 'base-badge--pill': pill }]">
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
.base-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  padding: 0.15rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(15, 23, 42, 0.06);
  color: #0f172a;
}

.base-badge--pill {
  border-radius: 999px;
}

.base-badge--success {
  background: rgba(5, 150, 105, 0.15);
  color: #047857;
}

.base-badge--warning {
  background: rgba(245, 158, 11, 0.18);
  color: #b45309;
}

.base-badge--danger {
  background: rgba(239, 68, 68, 0.18);
  color: #b91c1c;
}
</style>
