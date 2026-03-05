import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './plugins/i18n'
import './assets/styles/main.css'

console.log('Starting app...')

// Set initial direction based on locale
const locale = localStorage.getItem('locale') || 'ar'
document.documentElement.lang = locale
document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')

console.log('App mounted!')
