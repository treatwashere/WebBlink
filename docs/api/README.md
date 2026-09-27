# WebBlink API documentation

Authentication is GitHub OAuth backed by an HTTP-only JWT cookie. Authenticated endpoints accept either that cookie or an Authorization Bearer token.

All database queries are parameterized. Environment variable values are encrypted at rest and are never returned by the list endpoint.

The initial implementation stores deployment logs on the deployment record; production can move high-volume logs to object storage.