import { marked } from 'marked'

export type Locale = 'en' | 'zh'

export type Tag = { slug: string; name: string }

export type PostMeta = {
  slug: string
  date?: string
  title: string
  summary?: string
  tags?: string[]
}

export type Post = PostMeta & {
  html: string
}

type DirectusPostRow = {
  slug: string
  published_at?: string
  title_en?: string
  title_zh?: string
  summary_en?: string
  summary_zh?: string
  content_en?: string
  content_zh?: string
  tags?: Tag[] | null
}

function baseUrl() {
  const url = import.meta.env.VITE_DIRECTUS_URL as string | undefined
  return (url && url.trim()) || 'http://localhost:8055'
}

function pickLocale(row: DirectusPostRow, locale: Locale) {
  const title = (locale === 'zh' ? row.title_zh : row.title_en) || row.title_en || row.title_zh || row.slug
  const summary =
    (locale === 'zh' ? row.summary_zh : row.summary_en) || row.summary_en || row.summary_zh || undefined
  const content = (locale === 'zh' ? row.content_zh : row.content_en) || row.content_en || row.content_zh || ''
  return { title, summary, content }
}

function tagsToStrings(tags: Tag[] | null | undefined): string[] | undefined {
  if (!tags?.length) return undefined
  return tags.map((t) => t.name || t.slug).filter(Boolean)
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl()}${path}`)
  if (!res.ok) throw new Error(`Directus request failed: ${res.status}`)
  return (await res.json()) as T
}

export async function listPosts(locale: Locale): Promise<PostMeta[]> {
  const params = new URLSearchParams()
  params.set('filter[status][_eq]', 'published')
  params.set('sort', '-published_at')
  params.set(
    'fields',
    [
      'slug',
      'published_at',
      'title_en',
      'title_zh',
      'summary_en',
      'summary_zh',
      'tags.slug',
      'tags.name',
    ].join(','),
  )

  const json = await getJson<{ data: DirectusPostRow[] }>(`/items/posts?${params.toString()}`)
  return (json.data ?? []).map((row) => {
    const { title, summary } = pickLocale(row, locale)
    return {
      slug: row.slug,
      date: row.published_at,
      title,
      summary,
      tags: tagsToStrings(row.tags),
    }
  })
}

export async function getPostBySlug(slug: string, locale: Locale): Promise<Post | undefined> {
  const params = new URLSearchParams()
  params.set('filter[status][_eq]', 'published')
  params.set('filter[slug][_eq]', slug)
  params.set(
    'fields',
    [
      'slug',
      'published_at',
      'title_en',
      'title_zh',
      'summary_en',
      'summary_zh',
      'content_en',
      'content_zh',
      'tags.slug',
      'tags.name',
    ].join(','),
  )
  params.set('limit', '1')

  const json = await getJson<{ data: DirectusPostRow[] }>(`/items/posts?${params.toString()}`)
  const row = json.data?.[0]
  if (!row) return undefined

  const { title, summary, content } = pickLocale(row, locale)
  const html = marked.parse(content, { async: false }) as string
  return {
    slug: row.slug,
    date: row.published_at,
    title,
    summary,
    tags: tagsToStrings(row.tags),
    html,
  }
}

