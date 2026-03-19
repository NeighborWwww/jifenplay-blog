# Directus auth setup

## Local email/password (now)

Directus ships with built-in users/roles. On first run, the admin user is created from:

- `DIRECTUS_ADMIN_EMAIL`
- `DIRECTUS_ADMIN_PASSWORD`

Then inside Directus:

- Create an **Editor** role (optional) for content management.
- Create users with email/password under **User Directory**.
- Give the **Public** role read-only access to published posts only (see `infra/directus/schema.md`).

## GitHub OAuth (optional)

### 1) Create a GitHub OAuth App

In GitHub settings, create an OAuth App:\n\n- **Homepage URL**: your site URL (example: `https://yourdomain.com`)\n- **Authorization callback URL**: `https://YOUR_DIRECTUS_DOMAIN/auth/login/github/callback`\n\n(Use your Directus public URL/domain.)\n\n### 2) Configure Directus provider\n\nIn Directus Admin:\n\n- Settings → Authentication\n- Add provider **GitHub**\n\nOr via environment variables (already included as placeholders in `docker-compose.yml`):\n\n- `DIRECTUS_AUTH_PROVIDERS=github`\n- `DIRECTUS_AUTH_GITHUB_CLIENT_ID=...`\n- `DIRECTUS_AUTH_GITHUB_CLIENT_SECRET=...`\n\n### 3) Test\n\nOpen Directus login page and confirm **GitHub** appears as a login option.\n+
