import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { persistLocale, type Locale } from '../i18n'

export function useLocale() {
  const { locale } = useI18n()

  const current = computed<Locale>(() => (locale.value === 'zh' ? 'zh' : 'en'))

  function set(next: Locale) {
    locale.value = next
    persistLocale(next)
    if (typeof document !== 'undefined') document.documentElement.lang = next === 'zh' ? 'zh-CN' : 'en'
  }

  function toggle() {
    set(current.value === 'zh' ? 'en' : 'zh')
  }

  return { locale: current, set, toggle }
}

