<script setup>
import { reactive } from 'vue'
import AppInput from '@/components/common/AppInput.vue'
import AppButton from '@/components/common/AppButton.vue'
import BaseAlert from '@/components/ui/BaseAlert.vue'
import { useAuth } from '@/composables/useAuth'

const state = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  error: '',
})

const { register, loading } = useAuth()

const handleSubmit = async () => {
  state.error = ''
  if (state.password !== state.confirmPassword) {
    state.error = 'Passwords do not match.'
    return
  }

  try {
    await register({
      name: state.name,
      email: state.email,
      password: state.password,
    })
  } catch (err) {
    state.error = err?.response?.data?.message ?? 'Unable to create account.'
  }
}
</script>

<template>
  <section class="auth-view">
    <div class="auth-view__card">
      <h1>Create your account</h1>
      <p>Start managing the platform with a new admin profile.</p>

      <BaseAlert v-if="state.error" type="danger" :message="state.error" dismissible />

      <form class="auth-view__form" @submit.prevent="handleSubmit">
        <AppInput label="Name" v-model="state.name" placeholder="Jane Doe" required />
        <AppInput label="Email" v-model="state.email" type="email" placeholder="you@example.com" required />
        <AppInput label="Password" v-model="state.password" type="password" placeholder="••••••••" required />
        <AppInput
          label="Confirm password"
          v-model="state.confirmPassword"
          type="password"
          placeholder="••••••••"
          required
        />
        <AppButton :loading="loading" block type="submit" label="Create account" />
      </form>
    </div>
  </section>
</template>

<style scoped>
.auth-view {
  min-height: calc(100vh - 200px);
  display: grid;
  place-items: center;
  padding: 4rem 1rem;
}

.auth-view__card {
  width: min(420px, 100%);
  background: #fff;
  border-radius: var(--radius-md);
  padding: 2.5rem;
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
}

.auth-view__form {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
