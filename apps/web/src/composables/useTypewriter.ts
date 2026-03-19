import { computed, onBeforeUnmount, onMounted, ref, toValue, watch, type MaybeRefOrGetter } from 'vue'

type TypewriterOptions = {
  typeMs?: number
  deleteMs?: number
  pauseAfterTypeMs?: number
  pauseAfterDeleteMs?: number
}

export function useTypewriter(stringsInput: MaybeRefOrGetter<string[]>, opts: TypewriterOptions = {}) {
  const typeMs = opts.typeMs ?? 70
  const deleteMs = opts.deleteMs ?? 35
  const pauseAfterTypeMs = opts.pauseAfterTypeMs ?? 900
  const pauseAfterDeleteMs = opts.pauseAfterDeleteMs ?? 250

  const reducedMotion = ref(false)
  const text = ref(toValue(stringsInput)[0] ?? '')
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

  function start() {
    const strings = toValue(stringsInput)
    if (reducedMotion.value || strings.length <= 1) {
      text.value = strings[0] ?? ''
      return
    }

    if (!cursorTimer) {
      cursorTimer = window.setInterval(() => {
        isCursorOn.value = !isCursorOn.value
      }, 520)
    }

    i = 0
    pos = 0
    mode = 'type'
    text.value = ''
    tick()
  }

  function tick() {
    const strings = toValue(stringsInput)
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

    start()
  })

  watch(
    () => toValue(stringsInput),
    () => {
      if (typeof window === 'undefined') return
      clearTimers()
      start()
    },
    { deep: true },
  )

  onBeforeUnmount(() => clearTimers())

  const cursor = computed(() => (reducedMotion.value ? '' : isCursorOn.value ? '|' : ' '))
  return { text, cursor, reducedMotion }
}

