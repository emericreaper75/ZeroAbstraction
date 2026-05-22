# ZeroAbstraction: Engineering Governance & AI Memory

This document outlines the mandatory operational conventions, security compliance guidelines, and the structure of the persistent AI memory system of ZeroAbstraction.

---

## 1. Persistent AI Memory Architecture

ZeroAbstraction features a structured engineering memory system stored under the `.memory/` directory (referred to in agent scripts and config history as `.ai` or `.memory`). This system ensures architectural and policy consistency across sessions.

### Memory Directory Structure
- **`index.json`**: Master index mapping memory domains to target markdown and JSON files.
- **`architecture/`**: Solidified blueprints (e.g. `system-overview.md`, `frontend-architecture.md`, `backend-architecture.md`).
- **`decisions/`**: Historic log of technical choices and justifications (e.g., standardizing on Next.js 14 App Router, choosing Prisma v6).
- **`patterns/`**: Accepted templates and coding rules (e.g. `server-actions.md`, `component-rules.md`, `prisma-rules.md`).
- **`errors/`**: JSON tracking logs of hydration bugs, Prisma client type mismatches, and NextAuth redirects. Used to prevent agents from repeating past errors.
- **`critical_rules/`**: Safety constraints, including `auth-rules.md` and `api-security.md`.
- **`runtime/`**: Operational telemetry updated dynamically by agents during execution (e.g., `memory-access-log.json`, `execution-trace.json`).

---

## 2. Non-Negotiable Development Guidelines

Every autonomous developer or agent working in this codebase must adhere to the following rules:

1. **Strict TypeScript (No Implicit Any)**: All files must parse successfully under TypeScript's strict checks. Run `npx tsc --noEmit` to validate.
2. **Layer Separation**: Never write direct database queries or Prisma commands within UI components. Components must trigger state transitions via **Server Actions** (`actions/`) or local API endpoints.
3. **No Hardcoded Design Elements**: Adhere strictly to Tailwind configurations and the HSL tokens defined in `app/globals.css`. Do not introduce arbitrary colors (e.g., `bg-zinc-900`) or layout offsets.
4. **Validation Isolation**: Centralize all Zod schemas in `lib/validations/`. Do not define validation rules inline inside routes or handlers.
5. **No Placeholders**: Never write incomplete components or placeholder templates. All mock assets must be properly referenced or procedurally created.

---

## 3. Server Actions & Mutation Standards

All database mutations must be implemented as Server Actions using the following patterns:
- **Input Validation**: Validate every argument using the appropriate Zod schema from `lib/validations/` before database execution.
- **Normalized Response Format**: All server actions must return a standardized JSON structure:
  ```ts
  export async function someMutationAction(data: InputSchemaType) {
    const validation = someSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: "Validation failed" };
    }
    try {
      // Execute DB operation
      return { success: true, data: result };
    } catch (e) {
      return { success: false, error: "Database error occurred" };
    }
  }
  ```
- **Error Boundary Safety**: Catch and wrap internal Prisma exceptions. Never expose raw SQL exceptions or stack traces to the public UI.

---

## 4. Security & Hardening Policies

- **Auth Route Guards**: Secure layouts and routes starting with `/admin` using Next.js `middleware.ts` matched against Auth.js session variables.
- **Role Guards**: Use the `require-role.ts` helper in server actions and API route handlers to verify user permissions (e.g. `ADMIN`, `EDITOR`, `AUTHOR`) before execution.
- **Upload Restrictions**: Validate uploaded files by checking file headers, sizes, and MIME types inside the UploadThing core pipeline config before reserving storage buckets.
- **Rate Limiting**: Rate limit public API endpoints (such as `/api/search` and the contact message endpoint) using a Redis caching client or local memory bucket caches.
- **SQL Injection Prevention**: Write queries using Prisma's standard ORM methods. If raw SQL queries are necessary, parameterize values to block SQL injection.
- **XSS Protections**: Sanitize all client-supplied MDX frontmatter metadata (titles, tags, descriptions) before rendering.
- **Security Headers**: Ensure HTTP response headers are set to protect against framing, sniffing, and scripting vulnerabilities.
