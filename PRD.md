# ZeroAbstraction — Product Requirements Document

**Version:** 3.0
**Status:** Active
**Last Updated:** 2026
**Classification:** Internal Engineering Reference

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Vision & Design Philosophy](#2-vision--design-philosophy)
3. [Tech Stack](#3-tech-stack)
4. [Design System & Tokens](#4-design-system--tokens)
5. [Information Architecture & Navigation](#5-information-architecture--navigation)
6. [Component Architecture](#6-component-architecture)
7. [Server Actions](#7-server-actions)
8. [Content Management System](#8-content-management-system)
9. [Backend Architecture](#9-backend-architecture)
10. [Authentication & Authorization Architecture](#10-authentication--authorization-architecture)
11. [Feature Specifications](#11-feature-specifications)
12. [Performance & SEO Requirements](#12-performance--seo-requirements)
13. [Self-Hosting & Infrastructure](#13-self-hosting--infrastructure)
14. [Phased Implementation Roadmap](#14-phased-implementation-roadmap)
15. [File & Folder Structure](#15-file--folder-structure)
16. [Engineering Standards](#16-engineering-standards)

---

## 1. Executive Summary

ZeroAbstraction is a technical publishing platform, engineering portfolio system, and research-oriented knowledge base built on a modern full-stack Next.js 14 App Router architecture.

The platform serves a dual purpose:

- **Public-facing:** A premium reading and research experience for technical articles, engineering projects, and long-form research publications.
- **Editorial-facing:** A private, protected content management and publishing system for drafts, revisions, and media.

The system prioritizes frontend fidelity, layered architecture, and long-term scalability without compromising the reading-first product philosophy.

---

## 2. Vision & Design Philosophy

### Core Mission

ZeroAbstraction exists to present technical knowledge with clarity, depth, and visual precision — bridging the gap between engineering rigor and accessible presentation.

### Design Principles

| Principle | Description |
|---|---|
| **Frontend Fidelity First** | The UI/UX is a primary system asset. Visual layouts, typography, spacing, animations, per-category backgrounds, and the MDX reading experience must remain stable across all refactors. |
| **Separation of Concerns** | Architecture follows strict layered boundaries: UI → Server Actions → API → Service → Data Access → Database/Filesystem. |
| **Scalable Full-Stack** | Designed for long-term maintainability, modular growth, and production-grade VPS deployment. |
| **Research Aesthetics** | Scientific, minimal, distraction-free reading experience modeled after high-quality technical publications. Cinematic developer minimalism. |

### Non-Negotiables

The following must never be altered without an explicit product decision:

- The reading-first frontend approach
- The research-focused visual language and per-category background system
- The design system tokens and typography hierarchy
- The MDX immersive reading experience
- The layered architecture separation

---

## 3. Tech Stack

### Current Stack

```
FRAMEWORK           Next.js 14 App Router (TypeScript strict mode)
STYLING             Tailwind CSS + CSS Variables
FONTS               Geist Variable Fonts (local — GeistVF.woff, GeistMonoVF.woff)
CONTENT             MDX filesystem + database editorial layer (hybrid)
MATH RENDERING      remark-math + rehype-katex
SYNTAX HIGHLIGHT    rehype-pretty-code
ANIMATIONS          Framer Motion
ICONS               Lucide React
ORM                 Prisma ORM (lib/db/prisma.ts)
DATABASE            PostgreSQL
AUTHENTICATION      Auth.js (auth.ts, auth.config.ts)
AUTHORIZATION       lib/authz/ (roles.ts, require-role.ts)
MEDIA               UploadThing (lib/uploadthing.ts, app/api/uploadthing/)
SEARCH              PostgreSQL-backed backend search API (lib/search/, app/api/search/)
CACHING             Multi-layer cache (lib/cache/ — memory, Redis, optional-cache)
ANALYTICS           Internal analytics foundation (lib/analytics/)
JOB QUEUE           Foundation implemented (lib/jobs/)
LINTING             ESLint + TypeScript strict
CONTAINERIZATION    Docker + Docker Compose
```

### Architecture Model

```
UI Components (components/)
    ↓
Server Actions (actions/)
    ↓
API Routes (app/api/)
    ↓
Service Layer (lib/editorial/, lib/posts/, lib/projects/, lib/homepage/)
    ↓
Data Access (lib/posts/, lib/projects/, lib/db/prisma.ts)
    ↓
Database (PostgreSQL via Prisma) / Filesystem (content/ MDX)
```

Each layer has isolated responsibilities. Cross-layer coupling is a defect.

### Content Architecture Model

```
Posts         →  Hybrid: MDX filesystem (content) + PostgreSQL (metadata, editorial)
Projects      →  Fully database-backed via Prisma + PostgreSQL
Media         →  UploadThing pipeline + database metadata persistence
Search        →  Backend API route + PostgreSQL search index
Revisions     →  Database-backed via Prisma (editorial revisions migration)
```

---

## 4. Design System & Tokens

### Typography

| Element | Stack | Role |
|---|---|---|
| Body / headings | Geist Variable (local) | Long-form reading surface |
| Code / metadata | Geist Mono Variable (local) | Code blocks, labels, badges |
| Math / equations | rehype-katex | Mathematical rendering |
| Syntax highlighting | rehype-pretty-code | Code block coloring |

### Color Philosophy

Dark atmospheric palette:

| Token | Usage |
|---|---|
| `#0a0a0a` | Body background |
| `#0d0d0d` | Admin sidebar |
| `#111111` | Card surfaces, code blocks |
| `#0f0f0f` | Table row alternating |
| `zinc-800` | Tag chips, borders |
| `zinc-700` | Hairline dividers, timeline line |
| `zinc-500` | Monospace metadata labels |
| `zinc-400` | Supporting paragraph text |
| `zinc-300` | Secondary body text |

### Per-Category Background System

Each content category has a dedicated atmospheric background component (`components/backgrounds/`):

| Component | Category |
|---|---|
| `astrophysics-bg.tsx` | Astrophysics articles |
| `electronics-bg.tsx` | Electronics articles |
| `physics-bg.tsx` | Physics / Math articles |
| `projects-bg.tsx` | Projects surfaces |
| `research-bg.tsx` | Research logs |
| `timeline-bg.tsx` | Timeline page |

These are ambient visual layers — never decorative noise. They reinforce category identity.

### Layout Philosophy

- Whitespace-first layouts
- Reading flow over content density
- Visual hierarchy over decoration
- Responsive by default — no breakpoint exceptions
- Navigation: globally accessible, fixed-position, persistent across all routes via `components/navbar.tsx`

### Frontend Stability Contract

The following are stable system assets and must not regress:

- Page layouts and grid structures
- Typography scale and weights
- Spacing and rhythm system
- Animation and transition behaviors
- MDX rendering output fidelity
- Navigation persistence and behavior
- Per-category background visual system

---

## 5. Information Architecture & Navigation

### Route Structure

```
PUBLIC ROUTES
/                               Homepage
/blog                           All writing
/[category]/[slug]              Category-first technical article reader
/projects                       Projects listing
/projects/[slug]                Project detail
/timeline                       Research timeline

AUTH ROUTES
/login                          Authentication page

ADMIN ROUTES (protected)
/admin                          Admin dashboard
/admin/posts                    Post management
/admin/projects                 Project management
/admin/media                    Media management

API ROUTES
/api/auth/[...nextauth]         Auth.js handler
/api/search                     Search API endpoint
/api/uploadthing                UploadThing media handler
/og/post/[category]             OG image — posts
/og/project/[slug]              OG image — projects
/rss.xml                        RSS feed
/sitemap.xml                    Sitemap
/robots.txt                     Robots
```

### Route Group Architecture

```
app/
├── (admin)/        Protected admin layout group
│   └── admin/      Admin pages (middleware-protected)
├── (auth)/         Authentication layout group
│   └── login/
├── (public)/       Public layout group
│   └── (site)/     Nested public site layout group
│       ├── blog/
│       ├── [category]/
│       └── projects/
└── api/            API route handlers (no layout)
```

### Route Protection

```
Public routes     →  No authentication required
/admin/*          →  Auth.js session + middleware.ts + lib/authz/require-role.ts
/api/mutations    →  Per-request auth validation
UploadThing       →  Authenticated upload pipeline (api/uploadthing/core.ts)
Server Actions    →  Auth guards in actions/*
```

---

## 6. Component Architecture

### Shared UI Primitives

**Location:** `components/ui/`

Stateless, reusable, style-consistent primitives:

| Component | Purpose |
|---|---|
| `badge.tsx` | Category and status tags |
| `button.tsx` | CTA and action buttons |
| `card.tsx` | Card container primitive |
| `input.tsx` | Form input field |
| `separator.tsx` | Horizontal dividers |

No business logic. No database access. No side effects.

---

### Public Feature Components

**Location:** `components/`

| Component | Surface |
|---|---|
| `navbar.tsx` | Global navigation — all public routes |
| `hero.tsx` | Shared hero blueprint — all pages |
| `Footer.tsx` | Global footer — all public routes |
| `ArticleCard.tsx` | Blog listing cards |
| `ArticleLayout.tsx` | Article reading column layout |
| `CategoryBadge.tsx` | Category tag display |
| `CopyButton.tsx` | Code block clipboard copy |
| `DistractionFreeProvider.tsx` | Distraction-free reading context |
| `DistractionFreeToggle.tsx` | Toggle control for distraction-free mode |
| `domain-cards.tsx` | Homepage domain category grid |
| `featured-posts.tsx` | Homepage featured editorial grid |
| `MDXRenderer.tsx` | MDX content renderer |
| `MobileTOC.tsx` | Mobile table of contents |
| `page-header.tsx` | Shared internal page header |
| `portfolio-grid.tsx` | Projects portfolio grid |
| `ProjectCard.tsx` | Project listing card |
| `ReadingProgressBar.tsx` | Scroll-driven reading progress bar |
| `SearchModal.tsx` | Instant search overlay |
| `TableOfContents.tsx` | Desktop sticky TOC with scroll-spy |
| `TimelineFilter.tsx` | Timeline category filter |
| `TimelineItem.tsx` | Individual timeline event entry |
| `mdx/MDXContent.tsx` | MDX content wrapper |
| `media/MediaUploader.tsx` | Media upload UI |
| `related/RelatedPosts.tsx` | Related articles block |
| `related/RelatedProjects.tsx` | Related projects block |

---

### Admin Components

**Location:** `components/admin/`

| Component | Purpose |
|---|---|
| `admin-sidebar.tsx` | Persistent left sidebar |
| `admin-nav.tsx` | Sidebar navigation links |
| `admin-page-header.tsx` | Internal dashboard page headers |
| `admin-action-button.tsx` | Contextual action CTAs |
| `admin-table.tsx` | Reusable data table |
| `delete-button.tsx` | Delete with inline confirmation |
| `form-input.tsx` | Labeled input field |
| `form-textarea.tsx` | Labeled textarea field |
| `content-post-form.tsx` | Full post editorial form |
| `project-form.tsx` | Full project editorial form |
| `editor/save-status.tsx` | Autosave status indicator |
| `editor/use-autosave-draft.ts` | Autosave draft hook |

---

### Custom Hooks

**Location:** `components/hooks/`

| Hook | Purpose |
|---|---|
| `useDebouncedValue.ts` | Debounced state for search inputs |
| `useInstantSearch.ts` | Instant search query handler |
| `useReadingProgress.ts` | Scroll-based reading progress |

---

### Per-Category Backgrounds

**Location:** `components/backgrounds/`

Ambient visual layers — one per content category. Used behind hero sections.

---

### Search System

```
Frontend:   SearchModal.tsx + hooks/useInstantSearch.ts + hooks/useDebouncedValue.ts
Backend:    app/api/search/route.ts
Logic:      lib/search/ (index.ts, query.ts, types.ts)
Indexing:   scripts/index-content.ts
```

---

## 7. Server Actions

**Location:** `actions/`

All mutation workflows are handled via typed Next.js Server Actions:

| Action File | Responsibility |
|---|---|
| `post-actions.ts` | Post CRUD operations |
| `content-post-actions.ts` | Content post mutations |
| `project-actions.ts` | Project CRUD operations |
| `revision-actions.ts` | Revision creation and management |
| `duplicate-actions.ts` | Content duplication workflow |
| `bulk-actions.ts` | Batch operations (bulk delete, update) |

Server Actions are auth-guarded. They invoke the service layer only — never Prisma directly.

---

## 8. Content Management System

### Hybrid Content Model

ZeroAbstraction uses a hybrid content strategy separating publishing from editorial concerns.

#### MDX Filesystem Layer

**Location:** `content/`

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

Used for: technical articles, research logs, math content, code-heavy long-form writing.

Advantages: Git versioning, markdown workflow, structured writing, fast rendering.

#### Database Editorial Layer

Used for: project records, media assets, post revisions, autosave drafts, search index entries, admin workflows.

Managed via Prisma (`prisma/schema.prisma`) with tracked migrations:

```
prisma/migrations/
├── 20260510073121_init/
├── 20260510073615_make_password_optional/
├── 20260511130000_search_and_media_foundations/
├── 20260511131500_media_assets/
└── 20260511140000_editorial_revisions_and_versions/
```

### MDX Processing Pipeline

**Location:** `lib/mdx/`

```
Raw MDX file
    → Frontmatter extraction
    → AST parsing
    → TOC extraction (lib/toc.ts)
    → Math rendering (rehype-katex via lib/mdx/mdx-options.ts)
    → Syntax highlighting (rehype-pretty-code via lib/mdx/mdx-options.ts)
    → Component mapping (lib/mdx/mdx-components.tsx)
    → Metadata indexing
    → Rendered output (components/MDXRenderer.tsx)
```

### Post Data Access

**Location:** `lib/posts/`

* `get-posts.ts` — list all posts
* `get-post-by-slug.ts` — single post by slug
* `write-post.ts` — write post data

Legacy adapter: `lib/public/legacy-post-adapter.ts`

Public card format: `lib/public/post-card.ts`

### Project Data Access

**Location:** `lib/projects/`

* `get-projects.ts`
* `get-project-by-slug.ts`
* `get-featured-projects.ts`
* `get-related-projects.ts`

---

## 9. Backend Architecture

### Service Layer

**Location:** `lib/editorial/`, `lib/homepage/`

**Editorial service:**

```
lib/editorial/
├── categories.ts               Category definitions
├── slug.ts                     Slug generation
├── posts/
│   └── content-post-service.ts Post business logic
├── projects/
│   └── project-service.ts      Project business logic
└── revisions/
    ├── revision-service.ts     Revision orchestration
    └── revision-types.ts       Revision type definitions
```

**Homepage service:**

```
lib/homepage/
├── homepage-service.ts         Homepage data orchestration
└── types.ts                    Homepage type definitions
```

---

### Search Layer

**Location:** `lib/search/`

```
lib/search/
├── index.ts                    Search entry point
├── query.ts                    Query builder
└── types.ts                    Search type definitions
```

API endpoint: `app/api/search/route.ts`
Indexing script: `scripts/index-content.ts`

---

---

### Cache Layer

### Cache Layer

**Location:** `lib/cache/`

```
lib/cache/
├── cache.ts                    Cache orchestrator
├── index.ts                    Cache entry point
├── memory.ts                   In-memory cache
├── optional-cache.ts           Graceful fallback cache
├── redis.ts                    Redis cache adapter
└── types.ts                    Cache type definitions
```

---

### Job Queue Foundation

**Location:** `lib/jobs/`

```
lib/jobs/
├── queue.ts                    Queue implementation
└── types.ts                    Job type definitions
```

---

### Analytics Foundation

**Location:** `lib/analytics/`

```
lib/analytics/
└── index.ts                    Analytics entry point
```

---

### Authorization Layer

**Location:** `lib/authz/`

```
lib/authz/
├── roles.ts                    Role definitions
└── require-role.ts             Role guard utility
```

---

### Validation Layer

**Location:** `lib/validations/`

```
lib/validations/
├── post.ts                     Post validation schemas
├── content-post.ts             Content post validation schemas
└── project.ts                  Project validation schemas
```

All validation centralized here. Never inline in components or route handlers.

---

### Database Layer

**Location:** `lib/db/prisma.ts`

Single Prisma client instance. Only accessed inside `lib/` service and data access files. Never accessed directly in components or Server Actions.

---

### OG Image Generation

**Location:** `lib/og/`, `app/og/`

```
lib/og/
├── template.tsx                OG image template component
└── utils.ts                    OG image utilities

app/og/
├── post/[category]/            OG image route — posts
└── project/[slug]/             OG image route — projects
```

---

### API Layer

**Location:** `app/api/`

| Route | Purpose |
|---|---|
| `auth/[...nextauth]/` | Auth.js session handler |
| `search/route.ts` | Full-text search endpoint |
| `uploadthing/core.ts` | UploadThing file router |
| `uploadthing/route.ts` | UploadThing route handler |

Standard API response format:

```ts
{
  success: boolean;
  data?: T;
  error?: string;
}
```

---

## 10. Authentication & Authorization Architecture

### Stack

| Component | File |
|---|---|
| Auth.js config | `auth.config.ts` |
| Auth.js handler | `auth.ts` |
| Middleware protection | `middleware.ts` |
| Role definitions | `lib/authz/roles.ts` |
| Role guards | `lib/authz/require-role.ts` |
| Admin seed | `scripts/seed-admin.ts` |

### Protected Surfaces

```
/admin/*              →  Auth.js session + middleware + role check
/api/mutations        →  Per-request auth validation
Media uploads         →  Authenticated UploadThing pipeline
Server Actions        →  Auth guards inside actions/*
```

### Future Expansion

- Full RBAC (role-based access control)
- Editor and contributor permission tiers
- Invitation-based team access

---

## 11. Feature Specifications

### Implemented Features

| Feature | Status |
|---|---|
| Auth.js authentication | ✅ Complete |
| Protected middleware | ✅ Complete |
| Role-based authorization layer | ✅ Complete |
| Admin dashboard | ✅ Complete |
| Prisma ORM infrastructure | ✅ Complete |
| PostgreSQL database | ✅ Complete |
| Database migrations (5 tracked) | ✅ Complete |
| Project CRUD system | ✅ Complete |
| Post publishing workflow | ✅ Complete |
| Content post service | ✅ Complete |
| Featured projects system | ✅ Complete |
| Revision infrastructure | ✅ Complete |
| Autosave draft support | ✅ Complete |
| UploadThing media pipeline | ✅ Complete |
| Backend search API | ✅ Complete |
| Search content indexing script | ✅ Complete |
| Multi-layer cache system | ✅ Complete |
| Job queue foundation | ✅ Complete |
| Analytics foundation | ✅ Complete |
| Dynamic OG image generation | ✅ Complete |
| RSS feed | ✅ Complete |
| Sitemap | ✅ Complete |
| Robots.txt | ✅ Complete |
| MDX ingestion pipeline | ✅ Complete |
| Per-category background system | ✅ Complete |
| Distraction-free reading mode | ✅ Complete |
| Related posts and projects | ✅ Complete |
| Duplicate content workflow | ✅ Complete |
| Bulk operations | ✅ Complete |
| Docker deployment foundation | ✅ Complete |
| JSON-LD structured data | ✅ Complete |

### Planned Features

| Feature | Priority |
|---|---|
| Advanced search UX (frontend) | High |
| Revision diff viewer | High |
| Analytics dashboards | Medium |
| Redis caching (adapter built) | Medium |
| Collaborative editing | Medium |
| Workflow approvals | Medium |
| Edge caching | Low |
| Queue system activation | Low |
| Content recommendations | Low |
| Research indexing | Low |
| Cloudflare R2 media scaling | Low |
| Meilisearch integration | Low |

---

## 12. Performance & SEO Requirements

### Rendering Strategy

```
Default:    Server Components
Exception:  Client Components only when interactivity requires it
Avoid:      Unnecessary hydration, oversized client bundles
```

### Caching Strategy

```
Use:    lib/cache/ layer (memory, Redis, optional-cache)
Use:    ISR + route revalidation
Use:    Optimized fetch caching with cache tags
Avoid:  Duplicated fetches, stale rendering, invalid invalidation
```

### SEO Requirements

- Dynamic OG image generation per post and project (`app/og/`)
- JSON-LD structured data (`lib/jsonld.ts`)
- Metadata generation (`lib/metadata.ts`)
- Sitemap auto-generation (`app/sitemap.ts`)
- RSS feed (`app/rss.xml/route.ts`)
- Robots.txt (`app/robots.ts`)
- Semantic HTML throughout
- Structured frontmatter for metadata extraction

### Performance Targets

- Core Web Vitals: green across all routes
- Time to First Byte: optimized via SSR + ISR
- Largest Contentful Paint: optimized via local fonts + image optimization
- No layout shift from dynamic content

---

## 13. Self-Hosting & Infrastructure

### Deployment Stack

```
Runtime:        Node.js (Docker container)
Database:       PostgreSQL (Docker container, volume-persisted)
Reverse proxy:  Nginx
TLS:            Certbot (Let's Encrypt)
Hosting:        VPS (custom domain — no platform subdomains)
Orchestration:  Docker Compose
```

### Infrastructure Components

```
- PostgreSQL database container with volume persistence
- Prisma migrations on deploy (5 tracked, migration_lock.toml)
- UploadThing media pipeline
- Auth.js session infrastructure
- Multi-layer cache (memory → Redis)
- Server-side protected admin routes (middleware.ts)
- Environment variable validation on startup
- Secure secrets management
- Admin seed script (scripts/seed-admin.ts)
- Content indexing script (scripts/index-content.ts)
- Runtime monitoring (planned)
```

### Production Requirements

- All secrets loaded from environment at runtime
- Prisma migration safety checks before deploy
- Zero-downtime deploy strategy
- Health check endpoints

---

## 14. Phased Implementation Roadmap

### Phase 1 — Foundation (Completed)

```
✅ Next.js 14 App Router architecture
✅ Prisma + PostgreSQL integration
✅ Database migrations (5 tracked)
✅ Auth.js authentication
✅ Role-based authorization layer
✅ Protected admin routes (middleware.ts)
✅ Reusable admin component architecture
✅ Server Actions layer (6 action files)
✅ Project CRUD workflows
✅ Content post service
✅ Publish / unpublish workflows
✅ Featured project system
✅ MDX ingestion pipeline
✅ Per-category background visual system
✅ Dynamic public rendering
✅ Revision infrastructure
✅ Autosave draft support
✅ UploadThing media integration
✅ Backend search foundation
✅ Multi-layer cache system
✅ Job queue foundation
✅ Analytics foundation
✅ OG image generation
✅ JSON-LD structured data
✅ Docker deployment foundation
✅ RSS + sitemap + robots routes
✅ Distraction-free reading mode
✅ Related content system
✅ Bulk operations + duplicate workflow
✅ Admin seed + content indexing scripts
```

### Phase 2 — Frontend & Editorial Polish (Active)

```
→ Advanced MDX rendering polish
→ Reading experience refinement
→ TOC improvements and scroll-spy behavior
→ Frontend visual refinement and design alignment
→ Search UX frontend implementation
→ Media workflow improvements
→ Editorial tooling stabilization
→ Per-category background polish
```

### Phase 3 — Production Hardening (Upcoming)

```
→ Production-grade MDX rendering audit
→ Complete frontend redesign alignment
→ Accessibility audit (WCAG compliance)
→ Analytics dashboards
→ Homepage orchestration
→ Advanced search UX
→ Revision diff viewer
→ CI/CD pipeline hardening
→ Performance optimization pass
→ Mobile polish
→ Redis caching activation
→ Production deployment verification
```

### Phase 4 — Scaling & Ecosystem (Roadmap)

```
→ Advanced research indexing
→ Content recommendations engine
→ Collaborative editorial workflows
→ Observability and monitoring
→ Job queue activation (lib/jobs/ built)
→ Redis layer activation (lib/cache/redis.ts built)
→ Edge caching
→ Meilisearch integration (optional)
→ Cloudflare R2 media scaling
```

---

## 15. File & Folder Structure

```
ZeroAbstraction/
├── actions/                        Server Actions (6 files)
│   ├── bulk-actions.ts
│   ├── content-post-actions.ts
│   ├── duplicate-actions.ts
│   ├── post-actions.ts
│   ├── project-actions.ts
│   └── revision-actions.ts
│
├── app/
│   ├── (admin)/                    Protected admin route group
│   │   ├── admin/
│   │   │   ├── page.tsx            Dashboard
│   │   │   ├── posts/
│   │   │   ├── projects/
│   │   │   └── media/
│   │   └── layout.tsx              Admin layout (sidebar)
│   ├── (auth)/                     Auth route group
│   │   └── login/
│   │       └── page.tsx
│   ├── (public)/                   Public route group
│   │   ├── layout.tsx              Public layout
│   │   ├── page.tsx                Homepage
│   │   ├── (site)/                 Nested site route group
│   │   │   ├── layout.tsx
│   │   │   ├── blog/
│   │   │   ├── [category]/
│   │   │   └── projects/
│   │   └── timeline/
│   │       └── page.tsx
│   ├── api/                        API route handlers
│   │   ├── auth/[...nextauth]/
│   │   ├── search/route.ts
│   │   └── uploadthing/
│   │       ├── core.ts
│   │       └── route.ts
│   ├── og/                         OG image generation
│   │   ├── post/[category]/
│   │   └── project/[slug]/
│   ├── fonts/                      Local font files
│   ├── layout.tsx                  Root layout
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   └── rss.xml/route.ts
│
├── components/
│   ├── ui/                         Shared primitives
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── separator.tsx
│   ├── admin/                      Admin-only components (11 files)
│   ├── backgrounds/                Per-category backgrounds (6 files)
│   ├── hooks/                      Custom hooks (3 files)
│   ├── mdx/MDXContent.tsx
│   ├── media/MediaUploader.tsx
│   ├── related/                    Related content (2 files)
│   └── [20+ public feature components]
│
├── content/                        MDX filesystem
│   ├── astrophysics/ (3 files)
│   ├── electronics/ (1 file)
│   ├── physics-math/ (1 file)
│   ├── posts/ (2 files)
│   ├── projects/ (3 files)
│   └── research-logs/ (3 files)
│
├── lib/                            Core logic layer
│   ├── analytics/
│   ├── authz/ (2 files)
│   ├── cache/ (6 files)
│   ├── db/prisma.ts
│   ├── editorial/ (6 files across 4 subdirs)
│   ├── homepage/ (2 files)
│   ├── jobs/ (2 files)
│   ├── mdx/ (2 files)
│   ├── og/ (2 files)
│   ├── posts/ (3 files)
│   ├── projects/ (4 files)
│   ├── public/ (3 files)
│   ├── related/ (2 files)
│   ├── search/ (3 files)
│   ├── validations/ (3 files)
│   └── [standalone utilities — cn.ts, jsonld.ts, metadata.ts, etc.]
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/ (5 tracked migrations)
│
├── scripts/
│   ├── index-content.ts
│   └── seed-admin.ts
│
├── public/images/                  Static assets (4 images)
│
├── middleware.ts                   Route protection
├── auth.ts
├── auth.config.ts
├── Dockerfile
├── docker-compose.yml
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── .eslintrc.json
```

---

## 16. Engineering Standards

### Required Standards

| Standard | Requirement |
|---|---|
| TypeScript | Strict mode — no implicit any |
| Architecture | Layered — no cross-layer leakage |
| Server Actions | Auth-guarded — invoke service layer only |
| APIs | Normalized response format across all routes |
| Validation | Centralized in `lib/validations/` — never inline |
| Async handling | Predictable — typed, error-bounded |
| Abstractions | Intentional — no random utility sprawl |
| Database access | Only via `lib/db/prisma.ts` through service layer |

### Prohibited Patterns

```
✗ Duplicated business logic across layers
✗ Direct Prisma access outside lib/db/prisma.ts
✗ Database access inside UI components
✗ Oversized files violating single-responsibility
✗ Frontend/backend coupling
✗ Uncontrolled client-side state
✗ Business logic inside API route handlers
✗ Inline validation in components or routes
✗ Server Actions calling Prisma directly (must go through lib/)
✗ Per-category background system bypassed or removed
```

### Refactor Policy

Any refactor touching frontend layout, typography, spacing, animation, navigation behavior, or the per-category background system must:

1. Be explicitly scoped in the PR description
2. Preserve visual fidelity verified by visual diff
3. Not alter design system tokens without a product decision
4. Be reviewed against this document before merge

---

*ZeroAbstraction PRD — Internal Engineering Reference. Do not distribute externally.*
