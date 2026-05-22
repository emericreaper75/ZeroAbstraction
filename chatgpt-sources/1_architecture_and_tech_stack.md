# ZeroAbstraction: Architecture & Tech Stack

This document details the core architecture, full technology stack, routing maps, and data flow of the ZeroAbstraction technical publishing and portfolio platform.

---

## 1. Vision & Architecture Overview
ZeroAbstraction is a premium technical publishing platform, engineering portfolio, and research timeline built around a **"Cinematic Developer Minimalism"** aesthetic. The codebase uses Next.js 14 (App Router) to achieve high-performance rendering, secure editorial administration, and deeply immersive, category-specific visual atmospheres.

### Layered Concern Model
The system enforces strict boundaries between layers. Cross-layer coupling is treated as an architectural defect.

```text
UI Primitives (components/ui/*)
       ↓ (State & Props)
Feature Components (components/*)
       ↓ (Triggers)
Server Actions (actions/*)  OR  API Route Handlers (app/api/*)
       ↓ (Orchestration)
Service Layer (lib/editorial/*, lib/homepage/*, lib/search/*)
       ↓ (Adaptation)
Data Access & Client Wrapper (lib/posts/*, lib/projects/*, lib/db/prisma.ts)
       ↓
Database (PostgreSQL via Prisma)  &  Filesystem Content (content/* MDX)
```

---

## 2. Full Technology Stack

### Core Framework & Styling
- **Next.js 14**: Configured with App Router, TypeScript (strict mode), and Server Components by default.
- **Tailwind CSS + CSS Variables**: Global styles, themes, and tokens are centralized in `app/globals.css` and mapped to Tailwind configurations. No raw colors or ad-hoc border properties.
- **Geist Variable Fonts**: Local web fonts (`GeistVF.woff` and `GeistMonoVF.woff`) for optimal load performance and clean monospace code/metadata presentation.
- **Framer Motion**: Smooth, declarative micro-animations, layout transitions, and interactive visual lines (such as the scroll-spy timeline).

### Content & Rich Text Pipeline
- **Hybrid Content Model**: High-density engineering whitepapers and articles are stored as MDX on the filesystem, while dynamic project records, media metadata, revisions, and feedback logs reside in PostgreSQL.
- **MDX Processing**:
  - `remark-math` & `rehype-katex`: Renders inline and block LaTeX equations.
  - `rehype-pretty-code`: Shiki-based code highlight engine with inline highlighting and copy-to-clipboard functionality.

### Database, Auth & Media
- **Prisma v6 ORM**: Typesafe client for querying PostgreSQL.
- **PostgreSQL**: Primary transactional database containing operational metadata, search indexing, media metadata, revision logs, and administration data.
- **Auth.js (NextAuth.js)**: Handles credential authentication and JWT-based session state.
- **UploadThing**: Third-party secure asset pipeline for uploading images, PDFs, and ZIP files directly to cloud storage, integrated with DB metadata tracking.

---

## 3. Route Map

### Public Pages (`app/(public)/`)
- `/`: Interactive homepage featuring domain cards, recent highlights, and difficulty-based reading paths.
- `/blog`: Master index of all technical articles, filterable by tag and category.
- `/about`: Project values and details, containing the **Whitepaper Series** documentation index.
- `/timeline`: Chronological research timeline with interactive filter categories.
- `/projects`: Grid portfolio of all engineering projects.
- `/projects/[slug]`: Rich layout showcase for individual project documentation.
- `/[category]/[slug]`: Immersive, category-specific layout for technical articles (categories: `astrophysics`, `electronics`, `physics-math`, `communications`).

### Protected Administration (`app/(admin)/admin/`)
Guard rules are applied via Next.js `middleware.ts` combined with role checks.
- `/admin`: Editorial dashboard displaying overall system metrics, draft states, and quick actions.
- `/admin/posts`: Creation, editing, revision tracking, and publishing controls for articles.
- `/admin/projects`: Workspace to manage portfolio project metadata and associated slugs.
- `/admin/media`: Asset grid showing uploaded items, file sizes, usage, and upload triggers.
- `/admin/messages`: Inbox for contact form submissions.

### API Routes (`app/api/`)
- `/api/auth/[...nextauth]`: Credential authentication handlers.
- `/api/search`: Vector/text search route matching queries against titles, content, tags, and headings.
- `/api/uploadthing`: Endpoints for managing file uploads, validating MIME types, and authenticating requests.
- `/api/og/post/[category]` & `/api/og/project/[slug]`: Automated generation of high-fidelity OpenGraph cards.

---

## 4. Performance & Caching Strategy
- **Incremental Static Regeneration (ISR)**: Static rendering of public paths, revalidated automatically on content mutation or after designated intervals.
- **Orchestrated Cache Layer (`lib/cache/`)**:
  - `memory.ts`: Default fast in-memory cache.
  - `redis.ts`: Redis adapter for production environments.
  - `optional-cache.ts`: Gracefully falls back to filesystem or direct DB queries if Redis goes offline.
- **Image Optimization**: Custom wrapper utilizing Next.js `Image` with remote pattern validations on UploadThing URLs.
