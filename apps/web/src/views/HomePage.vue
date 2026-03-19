<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppShell from '../layouts/AppShell.vue'
import { useTypewriter } from '../composables/useTypewriter'

const { t, tm } = useI18n()
const heroStrings = computed(() => tm('home.hero') as unknown as string[])
const { text: heroText, cursor: heroCursor } = useTypewriter(heroStrings, {
  typeMs: 65,
  deleteMs: 35,
  pauseAfterTypeMs: 900,
  pauseAfterDeleteMs: 250,
})
</script>

<template>
  <AppShell>
    <section class="relative">
      <div class="mb-10">
        <h1 class="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
          <span class="relative inline-flex items-baseline">
            <span>{{ heroText }}</span>
            <span
              class="ml-1 inline-block w-[0.7ch] select-none text-[rgba(var(--fg)/0.6)]"
              aria-hidden="true"
            >
              {{ heroCursor }}
            </span>
          </span>
        </h1>
        <p class="mt-4 max-w-2xl text-pretty text-base leading-7 text-[rgba(var(--fg)/0.7)] sm:text-lg">
          {{ t('home.subtitle') }}
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <RouterLink
            to="/posts"
            class="inline-flex items-center justify-center rounded-full bg-[rgb(var(--fg))] px-5 py-2.5 text-sm font-medium text-[rgb(var(--bg))] shadow-sm shadow-black/10 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
          >
            {{ t('home.viewPosts') }}
          </RouterLink>
          <a
            href="#stack"
            class="inline-flex items-center justify-center rounded-full border border-[rgba(var(--border)/0.9)] bg-[rgba(var(--card)/0.55)] px-5 py-2.5 text-sm font-medium text-[rgb(var(--fg))] hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
          >
            {{ t('home.techStack') }}
          </a>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div
          class="rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6"
        >
          <div class="text-xs font-medium text-[rgba(var(--fg)/0.65)]">{{ t('home.designLabel') }}</div>
          <div class="mt-2 text-lg font-semibold tracking-tight">{{ t('home.designTitle') }}</div>
          <div class="mt-2 text-sm leading-6 text-[rgba(var(--fg)/0.7)]">
            {{ t('home.designBody') }}
          </div>
        </div>
        <div
          class="rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6"
        >
          <div class="text-xs font-medium text-[rgba(var(--fg)/0.65)]">{{ t('home.contentLabel') }}</div>
          <div class="mt-2 text-lg font-semibold tracking-tight">{{ t('home.contentTitle') }}</div>
          <div class="mt-2 text-sm leading-6 text-[rgba(var(--fg)/0.7)]">
            {{ t('home.contentBody') }}
          </div>
        </div>
      </div>

      <div
        id="stack"
        class="mt-10 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card2)/0.55)] p-6"
      >
        <div class="text-xs font-medium text-[rgba(var(--fg)/0.65)]">{{ t('home.stackLabel') }}</div>
        <ul class="mt-3 grid gap-2 text-sm text-[rgba(var(--fg)/0.75)] sm:grid-cols-2">
          <li class="rounded-2xl border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card)/0.5)] p-3">
            Vue 3 + TypeScript
          </li>
          <li class="rounded-2xl border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card)/0.5)] p-3">
            Vite + Vue Router
          </li>
          <li class="rounded-2xl border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card)/0.5)] p-3">
            TailwindCSS
          </li>
          <li class="rounded-2xl border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card)/0.5)] p-3">
            Docker + nginx (via compose)
          </li>
        </ul>
      </div>
    </section>
  </AppShell>
</template>

