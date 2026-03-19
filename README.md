# jifenplay

Personal blog website (Vue + Vite) with Markdown-in-repo posts and a clean, “high-tech” UI direction.

## Structure

- `apps/web/`: Vue 3 + Vite frontend
- `content/posts/`: Markdown posts (frontmatter + body)
- `infra/nginx/`: nginx config for SPA routing
- `docker-compose.yml`: local prod-like stack

## Local dev

```bash
cd apps/web
npm install
npm run dev
```

## Add a post

Create a new Markdown file in `content/posts/`:

```md
---
title: My post
date: 2026-03-19
summary: Short summary here.
tags:
  - tag1
  - tag2
---

Hello.
```

## Docker (prod-like)

```bash
docker compose up --build
```

Then open `http://localhost/`.

## CMS backend (Directus)

Directus provides an admin UI + API for managing blog content.
This deployment uses **SQLite** (a single DB file on a Docker volume) to keep costs low.

- Copy env template:

```bash
cp infra/directus/.env.example .env
```

- Start services:

```bash
docker compose up -d --build
```

- Open Directus admin:
  - `http://localhost:8055/admin`

### Configure schema + permissions

- Schema reference: `infra/directus/schema.md`
- Auth reference (local + GitHub OAuth): `infra/directus/auth.md`

### Frontend API config

The web app reads posts from Directus.

- Set `VITE_DIRECTUS_URL` at build time (defaults to `http://localhost:8055`).

