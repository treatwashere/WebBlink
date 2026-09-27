# Troubleshooting

## OAuth fails
Check GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET and GITHUB_REDIRECT_URI.

## Database connection fails
Check DATABASE_URL, network access and PostgreSQL availability.

## Rate limits
Set REDIS_URL and adjust RATE_LIMIT_REQUESTS/RATE_LIMIT_WINDOW.

## Webhooks fail
Check GITHUB_WEBHOOK_SECRET and the API's public HTTPS URL.

## Builds time out
Adjust BUILD_TIMEOUT and inspect deployment logs.