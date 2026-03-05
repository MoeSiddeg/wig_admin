<script setup>
import { watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: Boolean,
  title: String,
  width: {
    type: String,
    default: '600px',
  },
})

const emit = defineEmits(['update:modelValue'])

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
)

const close = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="app-modal" @click.self="close">
        <div class="app-modal__backdrop" />
        <div class="app-modal__dialog" :style="{ width }">
          <div class="app-modal__header">
            <h3>{{ title }}</h3>
            <button type="button" class="app-modal__close" @click="close">
              <X :size="20" />
            </button>
          </div>
          <div class="app-modal__body">
            <slot />
          </div>
          <div v-if="$slots.footer" class="app-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<style scoped>
.app-modal {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem 1rem;
}

.app-modal__backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
}

.app-modal__dialog {
  position: relative;
  background: var(--color-white);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  z-index: 1;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 4rem);
  margin: auto;
}

.app-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;
}

.app-modal__header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-text-dark);
}

.app-modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.app-modal__footer {
  padding: 1.5rem;
  border-top: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.app-modal__close {
  border: none;
  background: transparent;
  cursor: pointer;
  line-height: 1;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-medium);
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.app-modal__close:hover {
  background: var(--color-surface-variant);
  color: var(--color-text-dark);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .app-modal {
    padding: 1rem 0.5rem;
  }

  .app-modal__dialog {
    max-height: calc(100vh - 2rem);
  }
}
</style>
