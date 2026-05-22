# ZeroAbstraction: Directory Map & File Guidelines

This document provides a comprehensive view of the codebase file tree, explaining the purpose of each directory and defining development guardrails.

---

## 1. Project Directory Tree

```text
ZeroAbstraction/
├── .agents/                    # Agent governance rules & specifications
├── .memory/                    # Persistent AI memory system (decisions, state, runtime logs)
├── actions/                    # Typed Next.js Server Actions (Mutations)
│   ├── bulk-actions.ts         # Batch operations (delete/publish posts)
│   ├── duplicate-actions.ts    # Cloning post/project records
│   ├── post-actions.ts         # CRUD actions for blog posts
│   └── project-actions.ts      # CRUD actions for engineering projects
├── app/                        # App Router layout structures
│   ├── (admin)/                # Protected dashboard layout and pages
│   ├── (auth)/                 # Credential login route (/login)
│   ├── (public)/               # Main public pages
│   │   ├── (site)/             # Nested layouts for category-specific blog & projects
│   │   ├── about/              # Site information & whitepapers list
│   │   ├── contact/            # Message portal & contact forms
│   │   └── timeline/           # Chronological research log visualizer
│   ├── api/                    # Route Handlers
│   │   ├── auth/               # Auth.js NextAuth integration
│   │   ├── search/             # High-performance search API endpoint
│   │   └── uploadthing/        # File upload routes & validation endpoints
│   ├── og/                     # OpenGraph image generation templates
│   ├── sitemap.ts              # Automated sitemap generator
│   └── globals.css             # Main styling, HSL variables & design tokens
├── components/                 # React components separated by role
│   ├── ui/                     # Radix UI and Tailwind CSS stateless primitives
│   ├── admin/                  # Dashboard tables, forms, and sidebars
│   ├── backgrounds/            # Interactive background scripts (Starfields, Oscillosopes)
│   ├── hooks/                  # Shared react hooks (search, reading progress)
│   ├── mdx/                    # Custom elements rendered inside markdown (e.g., callouts)
│   ├── media/                  # Media library selectors and uploader modals
│   ├── related/                # Contextual recommendation cards
│   ├── Footer.tsx              # Public global footer
│   ├── navbar.tsx              # Sticky public navigation bar
│   ├── MDXRenderer.tsx         # MDX rendering container wrapper
│   └── TableOfContents.tsx     # Desktop sticky TOC scroll-spy
├── content/                    # Filesystem MDX content database
│   ├── astrophysics/           # Space science articles
│   ├── electronics/            # Embedded hardware and RF articles
│   ├── physics-math/           # Derivations and math studies
│   ├── projects/               # Portfolio documentation MDX files
│   └── research-logs/          # Chronological milestone drafts
├── lib/                        # Domain-driven service layer
│   ├── authz/                  # Role checks and resource gatekeepers
│   ├── cache/                  # Redis + Memory orchestrators
│   ├── db/                     # Prisma Client wrapper (prisma.ts)
│   ├── editorial/              # Editorial workflows, draft states, revisions
│   ├── mdx/                    # File parsing, AST traversal, TOC extractors
│   ├── search/                 # Search term tokenization & Prisma query builders
│   ├── validations/            # Zod validation schemas (posts, projects, assets)
│   ├── jsonld.ts               # Structured JSON-LD schema generators
│   └── metadata.ts             # SEO tags & OpenGraph metadata configs
├── prisma/                     # Database schemas
│   ├── migrations/             # SQL version migrations
│   └── schema.prisma           # Single source of truth for DB models
├── public/                     # Static files, images, icons, and local font files
├── scripts/                    # Command-line workflows
│   ├── seed-admin.ts           # Admin accounts bootstrapping script
│   └── index-content.ts        # CLI content compiler and database synchronizer
├── package.json                # Project manifest, scripts, and dependencies
├── tailwind.config.ts          # Tailwind configurations matching HSL tokens
└── tsconfig.json               # Type enforcement settings
```

---

## 2. Component Guidelines & File Placement

To maintain clean architecture, adhere to the following rules when placing files:

### UI Primitives (`components/ui/`)
- Must be stateless and have no business logic.
- Do not query APIs, use databases, or import services.
- Rely solely on incoming props and classes.

### Feature Components (`components/`)
- Manage state and contain interface components.
- Do not access database clients or write Prisma queries directly.
- Trigger mutations through **Server Actions** (`actions/`) or call API endpoints via relative Fetch queries.

### API & Routes Layer (`app/`)
- Public pages reside in `app/(public)/`.
- Restricted admin modules must reside in `app/(admin)/admin/`.
- All routes must preserve layout structures.

### Business & Data Logic (`lib/`)
- Centralize schema validators in `lib/validations/`.
- Access the database client exclusively from `lib/db/prisma.ts`.
- MDX parsing and frontmatter extractions are restricted to `lib/mdx/`.
- Write core workflows (e.g. revision generation, publish state orchestration) within `lib/editorial/`.

---

## 3. Critical System Files

1. **`app/globals.css`**: Defines CSS variables for HSL color spaces, typography sizes, grid alignment tokens, and animation rules. It serves as the baseline for the entire user interface.
2. **`prisma/schema.prisma`**: The schema definitions. All database-backed changes require schema modifications and subsequent migrations.
3. **`middleware.ts`**: Validates request tokens against role boundaries (e.g., protecting paths starting with `/admin` or POST requests targeting `/api/uploadthing`).
4. **`scripts/index-content.ts`**: Executed during deployment to read filesystem MDX files, extract heading structures, calculate reading time, and sync metadata directly to the PostgreSQL database for rapid search indexing.
