<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  hover: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <section class="base-card" :class="{ 'base-card--hover': hover }">
    <header v-if="title || $slots.header" class="base-card__header">
      <div>
        <p v-if="description" class="base-card__description">{{ description }}</p>
        <h3 v-if="title" class="base-card__title">{{ title }}</h3>
      </div>
      <slot name="header" />
    </header>
    <div class="base-card__body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="base-card__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.base-card {
  background: white;
  border-radius: var(--radius-md);
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: box-shadow var(--transition-base), transform var(--transition-base);
}

.base-card--hover:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.base-card__description {
  margin: 0;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.09em;
  color: var(--color-muted);
}

.base-card__title {
  margin: 0.15rem 0 0;
  font-size: 1.25rem;
}
</style>
