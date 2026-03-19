<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const route = useRoute()
const isHome = computed(() => route.name === 'home')
const { isDark, toggle } = useTheme()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[rgba(var(--border)/0.7)]">
    <div class="glass">
      <div class="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-10">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2 rounded-full px-2 py-1 text-sm font-medium tracking-tight text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
          aria-label="Home"
        >
          <span
            class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(var(--accent)/0.18)] ring-1 ring-[rgba(var(--accent)/0.25)]"
          >
            <span class="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
          </span>
          <span class="hidden sm:inline">jifenplay</span>
        </RouterLink>

        <nav class="flex items-center gap-1 text-sm text-[rgba(var(--fg)/0.85)]">
          <RouterLink
            to="/posts"
            class="rounded-full px-3 py-1.5 hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
            :class="route.name === 'posts' || route.name === 'post' ? 'text-[rgb(var(--fg))]' : ''"
          >
            Posts
          </RouterLink>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full px-3 py-1.5 hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
            @click="toggle"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <span class="text-xs font-medium text-[rgba(var(--fg)/0.75)]">
              {{ isDark ? 'Dark' : 'Light' }}
            </span>
            <span
              class="inline-flex h-5 w-9 items-center rounded-full border border-[rgba(var(--border)/0.9)] bg-[rgba(var(--card2)/0.55)] p-[2px]"
              aria-hidden="true"
            >
              <span
                class="h-4 w-4 rounded-full bg-[rgba(var(--fg)/0.75)] transition-transform"
                :class="isDark ? 'translate-x-4' : 'translate-x-0'"
              />
            </span>
          </button>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
            class="rounded-full px-3 py-1.5 hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
          >
            GitHub
          </a>
        </nav>
      </div>

      <div v-if="isHome" class="mx-auto max-w-6xl px-6 pb-3 sm:px-10">
        <div
          class="rounded-2xl border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card2)/0.55)] px-4 py-3 text-xs text-[rgba(var(--fg)/0.7)]"
        >
          Minimal blog scaffold. Markdown posts live in <code class="font-mono">content/posts/</code>.
        </div>
      </div>
    </div>
  </header>
</template>

