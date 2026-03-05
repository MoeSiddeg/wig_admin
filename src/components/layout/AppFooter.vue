<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <span>© {{ year }} WFG26 Admin. All rights reserved.</span>
    <div class="app-footer__links">
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Support</a>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  padding: 1.5rem 2rem;
  background: var(--color-dark-navy);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
}

.app-footer a {
  color: rgba(255, 255, 255, 0.7);
  margin-left: 1rem;
  transition: color 0.2s;
}

.app-footer a:hover {
  color: var(--color-orange);
}
</style>
