import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type TypewriterOptions = {
  typeMs?: number
  deleteMs?: number
  pauseAfterTypeMs?: number
  pauseAfterDeleteMs?: number
}

export function useTypewriter(strings: string[], opts: TypewriterOptions = {}) {
  const typeMs = opts.typeMs ?? 70
  const deleteMs = opts.deleteMs ?? 35
  const pauseAfterTypeMs = opts.pauseAfterTypeMs ?? 900
  const pauseAfterDeleteMs = opts.pauseAfterDeleteMs ?? 250

  const reducedMotion = ref(false)
  const text = ref(strings[0] ?? '')
  const isCursorOn = ref(true)

  let i = 0
  let pos = 0
  let mode: 'type' | 'pauseAfterType' | 'delete' | 'pauseAfterDelete' = 'type'
  let timer: number | undefined
  let cursorTimer: number | undefined

  function clearTimers() {
    if (timer) window.clearTimeout(timer)
    if (cursorTimer) window.clearInterval(cursorTimer)
    timer = undefined
    cursorTimer = undefined
  }

  function tick() {
    const current = strings[i] ?? ''

    if (mode === 'type') {
      pos = Math.min(pos + 1, current.length)
      text.value = current.slice(0, pos)
      if (pos >= current.length) mode = 'pauseAfterType'
      timer = window.setTimeout(tick, typeMs)
      return
    }

    if (mode === 'pauseAfterType') {
      mode = 'delete'
      timer = window.setTimeout(tick, pauseAfterTypeMs)
      return
    }

    if (mode === 'delete') {
      pos = Math.max(pos - 1, 0)
      text.value = current.slice(0, pos)
      if (pos <= 0) mode = 'pauseAfterDelete'
      timer = window.setTimeout(tick, deleteMs)
      return
    }

    mode = 'type'
    i = strings.length ? (i + 1) % strings.length : 0
    timer = window.setTimeout(tick, pauseAfterDeleteMs)
  }

  onMounted(() => {
    if (typeof window === 'undefined') return

    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    reducedMotion.value = Boolean(mql?.matches)

    if (reducedMotion.value || strings.length <= 1) {
      text.value = strings[0] ?? ''
      return
    }

    cursorTimer = window.setInterval(() => {
      isCursorOn.value = !isCursorOn.value
    }, 520)

    i = 0
    pos = 0
    mode = 'type'
    text.value = ''
    tick()
  })

  onBeforeUnmount(() => clearTimers())

  const cursor = computed(() => (reducedMotion.value ? '' : isCursorOn.value ? '|' : ' '))
  return { text, cursor, reducedMotion }
}

