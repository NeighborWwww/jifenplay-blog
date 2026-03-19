<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppShell from '../layouts/AppShell.vue'
import { getPostBySlug, type Post } from '../api/directus'

const props = defineProps<{ slug: string }>()
const { t, locale } = useI18n()

const apiLocale = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))
const post = ref<Post | undefined>(undefined)
const loading = ref(true)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    post.value = await getPostBySlug(props.slug, apiLocale.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    post.value = undefined
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch([() => props.slug, apiLocale], load)
</script>

<template>
  <AppShell>
    <section>
      <RouterLink
        to="/posts"
        class="inline-flex items-center gap-2 rounded-full border border-[rgba(var(--border)/0.9)] bg-[rgba(var(--card)/0.55)] px-4 py-2 text-sm text-[rgba(var(--fg)/0.8)] hover:bg-[rgba(var(--fg)/0.05)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
      >
        <span aria-hidden="true">←</span>
        {{ t('posts.back') }}
      </RouterLink>

      <div v-if="error" class="mt-8 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6">
        <div class="text-sm font-medium">API error</div>
        <div class="mt-2 text-sm text-[rgba(var(--fg)/0.7)]">
          {{ error }}
        </div>
      </div>

      <div v-else-if="loading" class="mt-8 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.5)] p-6">
        <div class="text-sm text-[rgba(var(--fg)/0.6)]">Loading…</div>
      </div>

      <div v-else-if="!post" class="mt-8 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6">
        <div class="text-lg font-semibold tracking-tight">{{ t('posts.notFound') }}</div>
        <div class="mt-2 text-sm text-[rgba(var(--fg)/0.7)]">
          {{ t('posts.notFoundBody') }} <code class="font-mono">{{ slug }}</code>.
        </div>
      </div>

      <article v-else class="mt-8">
        <div class="text-xs font-medium text-[rgba(var(--fg)/0.65)]">
          {{ post.date || '—' }}
        </div>
        <h1 class="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          {{ post.title }}
        </h1>
        <div
          class="mt-8 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.55)] p-6 backdrop-blur-2xl sm:p-10"
        >
          <div
            class="prose prose-zinc max-w-none prose-headings:tracking-tight prose-a:decoration-[rgba(var(--accent)/0.6)] prose-a:underline-offset-4 dark:prose-invert"
            v-html="post.html"
          />
        </div>
      </article>
    </section>
  </AppShell>
</template>

