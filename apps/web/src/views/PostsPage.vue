<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AppShell from '../layouts/AppShell.vue'
import { listPosts, type PostMeta } from '../api/directus'

const { t, locale } = useI18n()
const posts = ref<PostMeta[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const apiLocale = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))

async function load() {
  loading.value = true
  error.value = null
  try {
    posts.value = await listPosts(apiLocale.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
    posts.value = []
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(apiLocale, load)
</script>

<template>
  <AppShell>
    <section>
      <h1 class="text-3xl font-semibold tracking-tight sm:text-5xl">{{ t('posts.title') }}</h1>
      <p class="mt-3 max-w-2xl text-sm leading-6 text-[rgba(var(--fg)/0.7)] sm:text-base">
        {{ t('posts.subtitle') }} <code class="font-mono">content/posts/</code>.
      </p>

      <div v-if="error" class="mt-8 rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6">
        <div class="text-sm font-medium">API error</div>
        <div class="mt-2 text-sm text-[rgba(var(--fg)/0.7)]">
          {{ error }}
        </div>
      </div>

      <div v-else class="mt-8 grid gap-4 sm:grid-cols-2">
        <RouterLink
          v-for="post in posts"
          :key="post.slug"
          :to="`/posts/${post.slug}`"
          class="group rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.65)] p-6 transition hover:bg-[rgba(var(--fg)/0.04)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent)/0.7)]"
        >
          <div class="text-xs font-medium text-[rgba(var(--fg)/0.65)]">
            {{ post.date || '—' }}
          </div>
          <div class="mt-2 text-lg font-semibold tracking-tight">
            {{ post.title }}
          </div>
          <div v-if="post.summary" class="mt-2 text-sm leading-6 text-[rgba(var(--fg)/0.7)]">
            {{ post.summary }}
          </div>
          <div v-if="post.tags?.length" class="mt-4 flex flex-wrap gap-2">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="rounded-full border border-[rgba(var(--border)/0.6)] bg-[rgba(var(--card2)/0.6)] px-2.5 py-1 text-xs text-[rgba(var(--fg)/0.75)]"
            >
              {{ tag }}
            </span>
          </div>
        </RouterLink>

        <div
          v-if="loading && posts.length === 0"
          class="rounded-3xl border border-[rgba(var(--border)/0.7)] bg-[rgba(var(--card)/0.5)] p-6 text-sm text-[rgba(var(--fg)/0.6)]"
        >
          Loading…
        </div>
      </div>
    </section>
  </AppShell>
</template>

