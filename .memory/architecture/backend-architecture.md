# Backend Architecture

* Next.js Route Handlers and Server Actions strictly handle mutations.
* Prisma ORM (`@prisma/client`) handles data modeling. Enum types must be imported directly from `@prisma/client` to avoid TypeScript mismatches.
* Security hardened with Redis rate-limiting, account lockouts (5 attempts), and password policies.
* Admin dashboard integrates Media Manager, Messages, and Communications (formerly Research Logs).
