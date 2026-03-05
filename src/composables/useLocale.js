import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { locale, t } = useI18n()

  const isRTL = computed(() => locale.value === 'ar')

  const switchLocale = (newLocale) => {
    locale.value = newLocale
    localStorage.setItem('locale', newLocale)
    document.documentElement.setAttribute('lang', newLocale)
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr')
  }

  return {
    locale,
    isRTL,
    switchLocale,
    t,
  }
}
