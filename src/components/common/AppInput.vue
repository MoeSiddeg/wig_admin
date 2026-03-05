<script setup>
import { useAttrs } from 'vue'

defineOptions({ inheritAttrs: false })

const modelValue = defineModel()
const attrs = useAttrs()

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  helperText: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label class="app-input">
    <span v-if="label" class="app-input__label">{{ label }}</span>
    <div class="app-input__field" :class="{ 'app-input__field--error': !!error }">
      <span v-if="icon" class="app-input__icon">{{ icon }}</span>
      <input :type="type" v-model="modelValue" :placeholder="placeholder" v-bind="attrs" />
    </div>
    <small v-if="helperText && !error" class="app-input__helper">{{ helperText }}</small>
    <small v-if="error" class="app-input__error">{{ error }}</small>
  </label>
</template>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.95rem;
  color: var(--color-muted);
}

.app-input__label {
  font-weight: 600;
  color: #0f172a;
}

.app-input__field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: #fff;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
}

.app-input__field:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.1);
}

.app-input__field--error {
  border-color: var(--color-danger);
}

input {
  border: none;
  outline: none;
  font: inherit;
  flex: 1;
  background: transparent;
}

.app-input__helper {
  color: var(--color-muted);
}

.app-input__error {
  color: var(--color-danger);
}
</style>
