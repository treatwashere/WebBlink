# WebBlink API

Next.js API service for authentication, site management, deployments, environment variables, webhooks and analytics.

## Local setup
1. Copy .env.example to .env.
2. Start PostgreSQL and Redis.
3. Run npm install from the repository root.
4. Run npm run db:migrate.
5. Run npm run db:seed.
6. Run npm run dev.

Sensitive values are encrypted before persistence. SQL queries use PostgreSQL parameters.

## Endpoints
- GET /api/health
- GET /api/auth/github
- GET /api/auth/callback
- POST /api/auth/logout
- GET/POST /api/sites
- GET/PATCH/DELETE /api/sites/:id
- POST /api/sites/:id/deploy
- GET /api/sites/:id/deployments
- GET/POST /api/sites/:id/env
- DELETE /api/sites/:id/env/:key
- POST/DELETE /api/sites/:id/domains
- GET /api/sites/:id/logs
- GET /api/deployments
- GET /api/deployments/:id
- POST /api/deployments/:id/rollback
- POST /api/webhooks/github/:siteId
- POST /api/webhooks/stripe