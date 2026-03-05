<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Select an option'
  },
  options: {
    type: Array,
    required: true,
    validator: (options) => {
      return options.every(option => 
        typeof option === 'object' && 
        'value' in option && 
        'label' in option
      )
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const selectedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const hasLabel = computed(() => props.label || props.required)
</script>

<template>
  <div class="base-select">
    <label v-if="hasLabel" class="base-select__label">
      {{ label }}
      <span v-if="required" class="base-select__required">*</span>
    </label>
    <select
      v-model="selectedValue"
      :disabled="disabled"
      :required="required"
      class="base-select__select"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.base-select__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-dark);
}

.base-select__required {
  color: var(--color-red);
  margin-left: 0.25rem;
}

.base-select__select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-text-dark);
  font-size: 0.875rem;
  transition: all 0.2s;
  cursor: pointer;
}

.base-select__select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 27, 107, 0.1);
}

.base-select__select:disabled {
  background: var(--color-surface-variant);
  color: var(--color-text-light);
  cursor: not-allowed;
}

.base-select__select:hover:not(:disabled) {
  border-color: var(--color-primary);
}
</style>
