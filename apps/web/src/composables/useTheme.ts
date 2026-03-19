import { computed, onMounted, ref, watch } from 'vue'

export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'jifenplay:theme'

function getSystemPrefersDark() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
}

export function useTheme() {
  const mode = ref<ThemeMode>('system')
  const systemDark = ref(false)

  const resolved = computed<'light' | 'dark'>(() => {
    if (mode.value === 'system') return systemDark.value ? 'dark' : 'light'
    return mode.value
  })

  function apply() {
    if (typeof document === 'undefined') return
    const isDark = resolved.value === 'dark'
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.dataset.theme = resolved.value
    document.documentElement.style.colorScheme = resolved.value
  }

  function setMode(next: ThemeMode) {
    mode.value = next
    if (typeof window !== 'undefined') {
      if (next === 'system') window.localStorage.removeItem(STORAGE_KEY)
      else window.localStorage.setItem(STORAGE_KEY, next)
    }
  }

  onMounted(() => {
    systemDark.value = getSystemPrefersDark()

    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved === 'light' || saved === 'dark' || saved === 'system') mode.value = saved

      const mql = window.matchMedia?.('(prefers-color-scheme: dark)')
      mql?.addEventListener?.('change', (e) => {
        systemDark.value = Boolean(e.matches)
      })
    }

    apply()
  })

  watch([mode, systemDark], apply)

  const isDark = computed(() => resolved.value === 'dark')
  const toggle = () => setMode(isDark.value ? 'light' : 'dark')

  return { mode, resolved, isDark, setMode, toggle }
}

