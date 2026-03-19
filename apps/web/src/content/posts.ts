import fm from 'front-matter'
import { marked } from 'marked'

export type PostMeta = {
  slug: string
  title: string
  date: string
  summary?: string
  tags?: string[]
}

export type Post = PostMeta & {
  html: string
  raw: string
}

function slugFromPath(path: string) {
  const name = path.split('/').pop() ?? path
  return name.replace(/\.md$/i, '')
}

function normalizeTags(tags: unknown): string[] | undefined {
  if (!tags) return undefined
  if (Array.isArray(tags)) return tags.map(String)
  if (typeof tags === 'string') return tags.split(',').map((t) => t.trim()).filter(Boolean)
  return undefined
}

const rawModules = import.meta.glob('../../../content/posts/*.md', {
  eager: true,
  as: 'raw',
}) as Record<string, string>

const allPosts: Post[] = Object.entries(rawModules).map(([path, raw]) => {
  const slug = slugFromPath(path)
  const parsed = fm<Record<string, unknown>>(raw)
  const data = parsed.attributes ?? {}

  const title = typeof data.title === 'string' && data.title.trim() ? data.title : slug
  const date = typeof data.date === 'string' ? data.date : ''
  const summary = typeof data.summary === 'string' ? data.summary : undefined
  const tags = normalizeTags(data.tags)

  const html = marked.parse(parsed.body, { async: false }) as string

  return { slug, title, date, summary, tags, html, raw }
})

export function listPosts(): PostMeta[] {
  return allPosts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)))
    .map(({ slug, title, date, summary, tags }) => ({ slug, title, date, summary, tags }))
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug)
}

