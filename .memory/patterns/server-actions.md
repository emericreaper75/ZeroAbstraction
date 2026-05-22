# Server Actions Rules

* Place in `/actions` directory or at the top of a Server Component.
* Always validate inputs (using Zod or similar).
* Handle exceptions gracefully and return structured error objects.
* Do not return the raw database errors to the client.
* Use for mutations, not just data fetching (use Server Components for fetching).
