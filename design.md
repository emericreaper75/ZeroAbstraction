# ZeroAbstraction Design System & Architecture Documentation

**Version:** 3.0
**Status:** Active
**Last Updated:** 2026
**Classification:** Internal Engineering Reference

---

# Overview

ZeroAbstraction is a technical publishing platform, engineering portfolio system, and research-oriented knowledge platform built on a modern full-stack Next.js 14 App Router architecture.

The platform combines:

* technical blogging and research publishing
* engineering project showcasing
* editorial workflows with revision history
* dynamic MDX content rendering
* backend-driven search infrastructure
* media management pipeline
* analytics foundation

while preserving a premium frontend reading experience across all surfaces.

---

# Core Design Principles

## 1. Frontend Fidelity First

The frontend UI/UX is treated as a primary system asset.

The following must remain stable across all refactors:

* layouts and grid structures
* typography scale and weights
* spacing rhythm and visual hierarchy
* animations and transitions
* responsiveness and breakpoint behavior
* MDX reading experience
* navigation persistence and behavior
* per-category background visual systems

---

## 2. Separation of Concerns

Architecture follows strict layered responsibility boundaries:

```
UI Components (components/)
    ↓
Feature Layer (components/[feature])
    ↓
Server Actions (actions/)
    ↓
API Routes (app/api/)
    ↓
Service Layer (lib/editorial/, lib/posts/, lib/projects/)
    ↓
Data Access (lib/db/prisma.ts + lib/posts/, lib/projects/)
    ↓
Database (PostgreSQL via Prisma) / Filesystem (content/ MDX)
```

Each layer has isolated responsibilities. Cross-layer coupling is a defect.

---

## 3. Scalable Full-Stack Architecture

The system is designed for:

* long-term maintainability
* modular growth
* editorial scalability
* performance optimization
* production VPS deployment

Avoid:

* tightly coupled frontend/backend logic
* duplicated queries
* business logic inside UI components
* direct Prisma access outside `lib/db/`
* uncontrolled client-side state

---

# Technology Stack

## Frontend

* Next.js 14 App Router
* TypeScript (strict mode)
* TailwindCSS + CSS Variables
* Server Components (default)
* Client Components (interactive surfaces only)
* MDX Rendering with remark-math, rehype-katex, rehype-pretty-code
* Framer Motion (animations)
* Lucide React (icons)
* Geist Variable Fonts (local — GeistVF.woff, GeistMonoVF.woff)

## Backend

* Prisma ORM (`lib/db/prisma.ts`)
* PostgreSQL
* Auth.js (`auth.ts`, `auth.config.ts`)
* API Route Handlers (`app/api/`)
* Server Actions (`actions/`)
* UploadThing (`lib/uploadthing.ts`, `app/api/uploadthing/`)
* Cache layer (`lib/cache/` — memory, Redis, optional-cache)
* Job queue foundation (`lib/jobs/`)
* Analytics foundation (`lib/analytics/`)
* Authorization (`lib/authz/require-role.ts`, `lib/authz/roles.ts`)

## Infrastructure

* Docker + Docker Compose
* VPS Deployment (custom domain, no platform subdomains)
* PostgreSQL (containerized)
* Nginx reverse proxy
* Certbot TLS
* ISR + Cache Revalidation

---

# Application Structure

```
actions/                        Server Actions
app/
├── (admin)/                    Protected admin routes
├── (auth)/                     Authentication routes
├── (public)/                   Public-facing routes
│   └── (site)/                 Nested public site routes
├── api/                        API route handlers
│   ├── auth/
│   ├── search/
│   └── uploadthing/
└── og/                         OG image generation
components/
├── ui/                         Shared UI primitives
├── admin/                      Admin-only components
├── backgrounds/                Per-category background visuals
├── hooks/                      Custom React hooks
├── mdx/                        MDX rendering components
├── media/                      Media management components
└── related/                    Related content components
content/                        MDX filesystem
lib/
├── analytics/                  Analytics foundation
├── authz/                      Authorization layer
├── cache/                      Caching layer
├── db/                         Prisma client
├── editorial/                  Editorial service layer
├── homepage/                   Homepage service
├── jobs/                       Job queue foundation
├── mdx/                        MDX processing pipeline
├── og/                         OG image utilities
├── posts/                      Post data access
├── projects/                   Project data access
├── public/                     Public content adapters
├── related/                    Related content logic
├── search/                     Search layer
└── validations/                Centralized validation schemas
prisma/                         Prisma schema + migrations
scripts/                        Admin scripts (seed, index-content)
public/                         Static assets
```

---

# Route Architecture

## Public Routes

```
/                               Homepage
/blog                           All writing
/[category]/[slug]              Category-first article reader
/projects                       Projects listing
/projects/[slug]                Project detail
/timeline                       Research timeline
```

Handled inside `app/(public)/(site)/` — nested layout group preserving shared public layout.

---

## Auth Routes

```
/login                          Authentication page
```

Handled inside `app/(auth)/login/`.

---

## Admin Routes

```
/admin                          Dashboard
/admin/posts                    Post management
/admin/projects                 Project management
/admin/media                    Media management
```

Handled inside `app/(admin)/admin/`. Protected via `middleware.ts` + Auth.js session + `lib/authz/require-role.ts`.

---

## API Routes

```
/api/auth/[...nextauth]         Auth.js handler
/api/search                     Search API endpoint
/api/uploadthing                UploadThing handler
/og/post/[category]             OG image — posts
/og/project/[slug]              OG image — projects
/rss.xml                        RSS feed
/sitemap.ts                     Sitemap
/robots.ts                      Robots.txt
```

---

# Frontend Design System

## Design Goals

The frontend emphasizes:

* readability and long-form immersion
* technical clarity and scientific aesthetics
* minimal distraction
* research-publication visual language
* cinematic developer minimalism

---

## Typography

Fonts: Geist Variable (body) + Geist Mono Variable (code, metadata, labels) — loaded locally.

Typography priorities:

* long-form readability optimized line-height and measure
* code readability via rehype-pretty-code
* mathematical rendering via rehype-katex
* structured heading hierarchy from MDX AST

---

## Layout Philosophy

Layouts prioritize:

* whitespace-first composition
* reading flow over content density
* visual hierarchy over decoration
* responsive by default — no breakpoint exceptions

Navigation:

* globally accessible via `components/navbar.tsx`
* persists across all public routes
* fixed-position
* preserves reading flow

---

## Per-Category Background System

Located in `components/backgrounds/`:

Each content category has a dedicated atmospheric background component:

* `astrophysics-bg.tsx`
* `electronics-bg.tsx`
* `physics-bg.tsx`
* `projects-bg.tsx`
* `research-bg.tsx`
* `timeline-bg.tsx`

These render as subtle ambient visual layers behind hero sections, reinforcing category identity without distracting from content.

---

# Component Architecture

## Shared UI Primitives

Located in `components/ui/`:

* `badge.tsx`
* `button.tsx`
* `card.tsx`
* `input.tsx`
* `separator.tsx`

Purpose: reusable stateless primitives. No business logic. No database access.

---

## Feature Components

Located in `components/`:

Public-facing:

* `navbar.tsx` — global navigation
* `hero.tsx` — shared hero blueprint
* `Footer.tsx` — shared footer
* `ArticleCard.tsx` — blog listing cards
* `ArticleLayout.tsx` — article reading layout
* `CategoryBadge.tsx` — category tag display
* `CopyButton.tsx` — code block copy
* `DistractionFreeProvider.tsx` + `DistractionFreeToggle.tsx` — distraction-free reading mode
* `domain-cards.tsx` — homepage domain grid
* `featured-posts.tsx` — homepage featured editorial grid
* `MDXRenderer.tsx` — MDX content renderer
* `MobileTOC.tsx` — mobile table of contents
* `page-header.tsx` — shared internal page header
* `portfolio-grid.tsx` — project portfolio grid
* `ProjectCard.tsx` — project listing card
* `ReadingProgressBar.tsx` — scroll progress bar
* `SearchModal.tsx` — instant search overlay
* `TableOfContents.tsx` — desktop sticky TOC
* `TimelineFilter.tsx` — timeline category filter
* `TimelineItem.tsx` — individual timeline entry

Related content:

* `related/RelatedPosts.tsx`
* `related/RelatedProjects.tsx`

MDX:

* `mdx/MDXContent.tsx`

Media:

* `media/MediaUploader.tsx`

---

## Admin Components

Located in `components/admin/`:

* `admin-sidebar.tsx` — persistent left sidebar
* `admin-nav.tsx` — sidebar navigation links
* `admin-page-header.tsx` — internal page headers
* `admin-action-button.tsx` — contextual action CTAs
* `admin-table.tsx` — reusable data tables
* `delete-button.tsx` — delete with confirmation
* `form-input.tsx` — reusable labeled input
* `form-textarea.tsx` — reusable labeled textarea
* `content-post-form.tsx` — post editorial form
* `project-form.tsx` — project editorial form
* `editor/save-status.tsx` — autosave status indicator
* `editor/use-autosave-draft.ts` — autosave draft hook

---

## Custom Hooks

Located in `components/hooks/`:

* `useDebouncedValue.ts` — debounced state for search inputs
* `useInstantSearch.ts` — instant search query handler
* `useReadingProgress.ts` — scroll-based reading progress

---

# Server Actions

Located in `actions/`:

All mutation workflows are handled via typed Server Actions:

* `post-actions.ts` — post CRUD
* `content-post-actions.ts` — content post mutations
* `project-actions.ts` — project CRUD
* `revision-actions.ts` — revision creation and management
* `duplicate-actions.ts` — content duplication
* `bulk-actions.ts` — batch operations

---

# Backend Architecture

## Service Layer

Located in `lib/editorial/`, `lib/posts/`, `lib/projects/`, `lib/homepage/`:

**Editorial service (`lib/editorial/`):**

* `posts/content-post-service.ts` — post business logic
* `projects/project-service.ts` — project business logic
* `revisions/revision-service.ts` — revision orchestration
* `revisions/revision-types.ts` — revision type definitions
* `categories.ts` — category definitions
* `slug.ts` — slug generation

**Post access (`lib/posts/`):**

* `get-posts.ts`
* `get-post-by-slug.ts`
* `write-post.ts`

**Project access (`lib/projects/`):**

* `get-projects.ts`
* `get-project-by-slug.ts`
* `get-featured-projects.ts`
* `get-related-projects.ts`

**Homepage (`lib/homepage/`):**

* `homepage-service.ts`
* `types.ts`

**Public adapters (`lib/public/`):**

* `content-posts.ts`
* `legacy-post-adapter.ts`
* `post-card.ts`

---

## Search Layer

Located in `lib/search/`:

* `index.ts` — search entry point
* `query.ts` — query builder
* `types.ts` — search type definitions

API endpoint: `app/api/search/route.ts`

Content indexing script: `scripts/index-content.ts`

---

---

## Cache Layer

## Cache Layer

Located in `lib/cache/`:

* `cache.ts` — cache orchestrator
* `index.ts` — cache entry point
* `memory.ts` — in-memory cache
* `optional-cache.ts` — graceful cache fallback
* `redis.ts` — Redis cache adapter
* `types.ts` — cache type definitions

---

## Authorization Layer

Located in `lib/authz/`:

* `roles.ts` — role definitions
* `require-role.ts` — role guard utility

---

## Validation Layer

Located in `lib/validations/`:

* `post.ts`
* `content-post.ts`
* `project.ts`

All validation centralized here. Never inline in components or route handlers.

---

## API Layer

Located in `app/api/`:

* `auth/[...nextauth]/` — Auth.js handler
* `search/route.ts` — search endpoint
* `uploadthing/core.ts` + `uploadthing/route.ts` — media upload pipeline

Standard API response format:

```ts
{
  success: boolean;
  data?: T;
  error?: string;
}
```

---

# Content Architecture

## Hybrid Content Model

### MDX Filesystem Layer

Located in `content/`:

```
content/
├── astrophysics/
│   ├── dark-matter-bayesian-halos.mdx
│   ├── dark-matter-beyond-wimp.mdx
│   └── pulsar-timing-array-analysis.mdx
├── electronics/
│   └── fir-filter-parks-mcclellan.mdx
├── physics-math/
│   └── fourier-transform-derivation.mdx
├── posts/
│   ├── hello.mdx
│   └── heye.mdx
├── projects/
│   ├── fir-filter-designer.mdx
│   ├── mems-calibration-suite.mdx
│   └── quantum-circuit-simulator.mdx
└── research-logs/
    ├── 002-sensor-calibration-field-campaign.mdx
    ├── 003-msc-thesis-gnss-anti-jamming.mdx
    └── mems-gyroscope-noise-characterisation.mdx
```

Used for: long-form technical articles, research logs, equations, code-heavy writing.

MDX processing pipeline (`lib/mdx/`):

```
Raw MDX
    → Frontmatter extraction
    → AST parsing
    → TOC extraction (lib/toc.ts)
    → Math rendering (rehype-katex)
    → Syntax highlighting (rehype-pretty-code)
    → Metadata indexing
    → Rendered output
```

---

## Database Layer

Used for: projects, media, revisions, drafts, autosave, search index, editorial workflows.

Managed via Prisma schema (`prisma/schema.prisma`) with tracked migrations:

```
prisma/migrations/
├── 20260510073121_init/
├── 20260510073615_make_password_optional/
├── 20260511130000_search_and_media_foundations/
├── 20260511131500_media_assets/
└── 20260511140000_editorial_revisions_and_versions/
```

---

# Authentication Architecture

Stack:

* Auth.js (`auth.ts`, `auth.config.ts`)
* Middleware protection (`middleware.ts`)
* Role-based authorization (`lib/authz/`)
* SSR session validation

Protected surfaces:

* `/admin/*` — full session + role validation
* `/api/` mutation routes — per-request auth
* UploadThing pipeline — authenticated
* Server Actions — auth-guarded

Seed script: `scripts/seed-admin.ts`

---

# Performance Strategy

## Rendering Strategy

* Server Components by default
* Client Components only when interactivity requires it
* No unnecessary hydration
* Optimized client bundle size

## Caching Strategy

* Cache tags and ISR (`lib/cache/`)
* Route revalidation
* Redis adapter ready (`lib/cache/redis.ts`)
* Optional graceful cache fallback (`lib/cache/optional-cache.ts`)

---

# SEO & Metadata

* Dynamic OG image generation per post and project (`app/og/`, `lib/og/`)
* JSON-LD structured data (`lib/jsonld.ts`)
* Metadata generation (`lib/metadata.ts`)
* Sitemap (`app/sitemap.ts`)
* RSS feed (`app/rss.xml/route.ts`)
* Robots (`app/robots.ts`)

---

# Media Architecture

Media pipeline:

* UploadThing integration (`app/api/uploadthing/`, `lib/uploadthing.ts`)
* `components/media/MediaUploader.tsx` — upload UI component
* Database metadata persistence via Prisma

Future scaling:

* Cloudflare R2
* Image transformations
* CDN optimization

---

# Editorial Architecture

Editorial system:

* Drafts and publishing states
* Revision history (`lib/editorial/revisions/`)
* Autosave (`components/admin/editor/use-autosave-draft.ts`)
* Duplicate content workflow (`actions/duplicate-actions.ts`)
* Bulk operations (`actions/bulk-actions.ts`)

Future expansion:

* Revision diff viewer
* Collaborative editing
* Workflow approvals

---

# Deployment Architecture

Deployment stack:

* Docker + Docker Compose (`Dockerfile`, `docker-compose.yml`)
* PostgreSQL (containerized, volume-persisted)
* Nginx reverse proxy
* Certbot TLS (Let's Encrypt)
* VPS hosting (custom domain)

Production requirements:

* All secrets from environment at runtime
* Prisma migration safety on deploy
* Zero-downtime deploy strategy
* Health check endpoints

---

# Engineering Standards

## Required Standards

* Strict TypeScript — no implicit any
* Layered architecture — no cross-layer leakage
* Normalized API responses across all routes
* Centralized validation in `lib/validations/`
* Predictable async handling — typed, error-bounded
* Intentional abstractions — no random utility sprawl

## Prohibited Patterns

```
✗ Duplicated business logic across layers
✗ Direct Prisma access outside lib/db/prisma.ts
✗ Database access inside UI components
✗ Oversized files violating single-responsibility
✗ Frontend/backend coupling
✗ Uncontrolled client-side state
✗ Business logic inside API route handlers
✗ Inline validation in components or routes
```

---

# Long-Term Scaling Goals

Phase 4 roadmap:

* Advanced analytics dashboards
* Advanced search UX
* Research indexing
* Content recommendations engine
* Collaborative editorial workflows
* Observability and monitoring
* Job queue systems (`lib/jobs/` foundation built)
* Redis layer (`lib/cache/redis.ts` foundation built)
* Edge caching
* Meilisearch integration (optional)
* Cloudflare R2 media scaling

---

# Final Philosophy

ZeroAbstraction is:

* a technical publishing platform
* a research presentation system
* an engineering knowledge base
* a scalable editorial architecture

The platform prioritizes:

* clarity
* scalability
* maintainability
* frontend fidelity
* technical reading experience
* production-grade architecture
