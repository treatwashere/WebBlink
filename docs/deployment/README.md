# WebBlink deployment

## Services
- PostgreSQL: Supabase, Neon or Railway
- Redis: Upstash or Redis Cloud
- API: Vercel, Railway or Render
- Dashboard/Web: Vercel
- Runtime: Cloudflare Workers
- Artifacts: S3-compatible storage such as Cloudflare R2

## Required secrets
Configure DATABASE_URL, REDIS_URL, GitHub OAuth credentials, GITHUB_WEBHOOK_SECRET, JWT_SECRET and storage credentials before production.

## Production checklist
- Run migrations and seed only development data.
- Configure GitHub OAuth callback URL.
- Configure webhook signing secret.
- Configure HTTPS and secure cookies.
- Configure Redis rate limits.
- Configure storage retention and backups.
- Verify Actions and deployment callbacks.
- Run the test suite and a real preview deployment before launch.