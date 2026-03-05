<script setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
  },
  title: {
    type: String,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
  dismissible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="base-alert" :class="`base-alert--${type}`">
    <div class="base-alert__content">
      <strong v-if="title">{{ title }}</strong>
      <p v-if="message">{{ message }}</p>
      <slot />
    </div>
    <button v-if="dismissible" class="base-alert__close" @click="emit('close')">×</button>
  </div>
</template>

<style scoped>
.base-alert {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  font-size: 0.95rem;
  border: 1px solid transparent;
}

.base-alert--info {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.4);
  color: #1d4ed8;
}

.base-alert--success {
  background: rgba(5, 150, 105, 0.12);
  border-color: rgba(5, 150, 105, 0.4);
  color: #047857;
}

.base-alert--warning {
  background: rgba(245, 158, 11, 0.12);
  border-color: rgba(245, 158, 11, 0.4);
  color: #b45309;
}

.base-alert--danger {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.4);
  color: #b91c1c;
}

.base-alert__close {
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
}
</style>
