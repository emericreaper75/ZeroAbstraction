# Changelog: Initial Memory Bootstrap
**Date**: 2026-05-22

## Extracted Systems
* **Progressive Reading Mode**: Documented the hybrid Server/Client MDX splitting architecture.
* **Admin Dashboard**: Extracted constraints for premium design migration and Prisma integration.
* **Security Hardening**: Logged rate limiting, lockouts, and header policies.
* **UI/UX Consistency**: Recorded strict adherence to CSS tokens, accessibility (ARIA, skip links), and animation preservation.

## Imported Architecture Knowledge
* Next.js App Router boundaries.
* Flight stream payload optimization techniques for MDX.
* TOC IntersectionObserver logic.

## Imported Debugging Intelligence
* Prisma Enum TypeScript mismatch fixes.
* TOC drift graceful failure in Focus Mode.

## Normalization Decisions
* Excluded verbose error stack traces.
* Merged security hardening into `auth-rules.md`.
* Standardized component rules around CSS tokens instead of hardcoded tailwind classes.

## Ignored Low-Value Context
* Temporary brainstorming during Stage 1-4 UI implementation.
* Raw DOM tree dumps from `tree-to-be-implemented.md`.

## Assumptions Made
* Existing Framer Motion hero animations are considered immutable by future agents unless explicitly authorized.
* Prisma remains the source of truth for metadata indexing, while filesystem remains truth for MDX content.
