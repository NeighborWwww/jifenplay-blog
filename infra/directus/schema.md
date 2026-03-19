# Directus schema (blog)

This project uses Directus as a headless CMS. Create the following collections in Directus.

## Collection: `posts`

**Purpose**: One row per blog post (bilingual fields + publish workflow).

- `id` (UUID, primary key)
- `slug` (String, unique, required)
- `status` (String, required)
  - Suggested values: `draft`, `published`
- `published_at` (Datetime)
- `title_en` (String, required)
- `title_zh` (String)
- `summary_en` (String)
- `summary_zh` (String)
- `content_en` (Text, Markdown)
- `content_zh` (Text, Markdown)
- `tags` (Many-to-many relation to `tags`)

**Permissions**:
- Public role:
  - Read only
  - Filter: `status = published`
  - Expose only needed fields
- Admin/editor:
  - Full CRUD

## Collection: `tags`

- `id` (UUID, primary key)
- `name` (String, required)
- `slug` (String, unique, required)

## Publish workflow (recommended)

- Drafts: `status = draft` (not visible publicly)
- Published posts: `status = published` and set `published_at`

## API queries (what the frontend expects)

### List posts

- Filter: `status=published`
- Sort: `-published_at` (fallback `-date` if you prefer)
- Fields:
  - `slug`, `published_at`
  - `title_en`, `title_zh`
  - `summary_en`, `summary_zh`
  - `tags.slug`, `tags.name`

### Get post by slug

- Filter: `slug=<slug>` and `status=published`
- Fields:
  - `slug`, `published_at`
  - `title_en`, `title_zh`
  - `content_en`, `content_zh`
  - `tags.slug`, `tags.name`

