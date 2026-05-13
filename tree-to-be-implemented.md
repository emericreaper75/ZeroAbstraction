ZeroAbstraction
│
├── FRONTEND & BACKEND STRUCTURE
│   │
│   ├── app/
│   │   ├── (admin)/
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx                    Dashboard root
│   │   │   │   ├── posts/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── projects/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── media/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx                      Admin layout (sidebar)
│   │   │
│   │   ├── (public)/
│   │   │   ├── page.tsx                        Homepage /
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx                    /blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx
│   │   │   ├── [category]/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                Article reader
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx                    /projects listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                Project detail
│   │   │   ├── timeline/
│   │   │   │   └── page.tsx
│   │   │   ├── about/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx                      Public layout (navbar + footer)
│   │   │
│   │   ├── api/
│   │   │   └── search/
│   │   │       └── route.ts
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── layout.tsx                          Root layout
│   │   ├── globals.css
│   │   ├── sitemap.xml/
│   │   └── rss.xml/
│   │
│   ├── components/
│   │   ├── ui/                                 Shared primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── hero.tsx
│   │   ├── article-layout.tsx
│   │   ├── toc.tsx                             Table of Contents
│   │   ├── reading-progress.tsx
│   │   ├── project-card.tsx
│   │   ├── admin-table.tsx
│   │   └── admin-form.tsx
│   │
│   ├── content/                                MDX filesystem layer
│   │   ├── astrophysics/
│   │   ├── electronics/
│   │   ├── physics-math/
│   │   ├── research-logs/
│   │   ├── projects/
│   │   ├── admin/
│   │   └── posts/
│   │
│   ├── lib/                                    Shared utilities
│   │   ├── mdx.ts                              MDX pipeline
│   │   ├── utils.ts
│   │   └── fonts.ts
│   │
│   ├── public/
│   │   └── images/
│   │
│   └── INFRA & CONFIG
│       ├── Dockerfile
│       ├── docker-compose.yml
│       ├── next.config.mjs
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── .eslintrc.json
│       ├── .env.example
│       └── .github/
│           └── workflows/
│
└── PAGE ARCHITECTURE (Visual Layer)
    │
    ├── PUBLIC ROUTES
    │   ├── 01 — Homepage                       /
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Featured Editorial Grid
    │   │         ├── Latest Research Strip
    │   │         └── Footer
    │   │
    │   ├── 02 — Blog Listing                   /blog
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Category Filter Bar
    │   │         ├── Article List (Stacked Rows)
    │   │         └── Footer
    │   │
    │   ├── 03 — Article Reader                 /[category]/[slug]
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Reading Column 720px
    │   │         │     ├── Body Typography
    │   │         │     ├── Code Blocks
    │   │         │     ├── Math (KaTeX)
    │   │         │     └── Pull Quotes
    │   │         ├── Sticky TOC (Desktop)
    │   │         ├── Reading Progress Bar
    │   │         └── Footer
    │   │
    │   ├── 04 — Projects Listing               /projects
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Featured Projects (Full Width)
    │   │         ├── Project Card Grid (2-col)
    │   │         └── Footer
    │   │
    │   ├── 05 — Project Detail                 /projects/[slug]
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Content Split 65/35
    │   │         │     ├── Prose (Left)
    │   │         │     └── Metadata Panel (Right Sticky)
    │   │         ├── Media Section (Full Width)
    │   │         ├── Related Projects Row
    │   │         └── Footer
    │   │
    │   ├── 06 — Timeline                       /timeline
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Vertical Timeline
    │   │         │     ├── Year Labels
    │   │         │     ├── Timeline Nodes
    │   │         │     └── Event Cards (Alternating)
    │   │         └── Footer
    │   │
    │   ├── 07 — About                          /about
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Platform Section (2-col)
    │   │         ├── Philosophy Section (Full Width)
    │   │         ├── Stack Grid
    │   │         └── Footer
    │   │
    │   └── 08 — Login                          /login
    │             ├── Split Layout 60/40
    │             │     ├── Brand Panel (Left)
    │             │     └── Auth Card (Right)
    │             └── No Footer
    │
    └── ADMIN ROUTES                            /admin/* (Auth Protected)
        │         (Persistent Left Sidebar)
        │
        ├── 09 — Dashboard                      /admin
        │         ├── Internal Header
        │         ├── Stats Row (4 Cards)
        │         ├── Recent Posts Table
        │         └── Recent Projects Table
        │
        ├── 10 — Posts Manager                  /admin/posts
        │         ├── Header + New Post CTA
        │         ├── Search + Status Filter
        │         ├── Posts Data Table
        │         └── Pagination
        │
        ├── 11 — Projects Manager               /admin/projects
        │         ├── Header + New Project CTA
        │         ├── Search + Status Filter
        │         ├── Projects Data Table
        │         │     └── Featured Toggle (Inline)
        │         ├── Bulk Select + Batch Bar
        │         └── Pagination
        │
        └── 12 — Media Manager                  /admin/media
                  ├── Header + Upload CTA
                  ├── Search + File Type Filter
                  ├── Drag-and-Drop Upload Zone
                  └── Media Masonry Grid (3-col)


ZeroAbstraction
│
├── FRONTEND & BACKEND STRUCTURE
│   │
│   ├── actions/                                Server Actions
│   │   ├── bulk-actions.ts
│   │   ├── content-post-actions.ts
│   │   ├── duplicate-actions.ts
│   │   ├── post-actions.ts
│   │   ├── project-actions.ts
│   │   └── revision-actions.ts
│   │
│   ├── app/
│   │   ├── (admin)/
│   │   │   ├── admin/
│   │   │   │   ├── page.tsx                    Dashboard
│   │   │   │   ├── posts/
│   │   │   │   ├── projects/
│   │   │   │   └── media/
│   │   │   └── layout.tsx                      Admin layout (sidebar)
│   │   │
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (public)/
│   │   │   ├── layout.tsx                      Public layout (navbar+footer)
│   │   │   ├── page.tsx                        Homepage /
│   │   │   ├── (site)/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── blog/                       /blog listing
│   │   │   │   ├── [category]/                 Article reader
│   │   │   │   └── projects/                   /projects listing + detail
│   │   │   └── timeline/
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   ├── search/
│   │   │   │   └── route.ts
│   │   │   └── uploadthing/
│   │   │       ├── core.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── og/
│   │   │   ├── post/[category]/                OG image — posts
│   │   │   └── project/[slug]/                 OG image — projects
│   │   │
│   │   ├── layout.tsx                          Root layout
│   │   ├── globals.css
│   │   ├── fonts/
│   │   │   ├── GeistVF.woff
│   │   │   └── GeistMonoVF.woff
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   └── rss.xml/
│   │       └── route.ts
│   │
│   ├── components/
│   │   ├── ui/                                 Primitives
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── separator.tsx
│   │   │
│   │   ├── admin/                              Admin-only components
│   │   │   ├── admin-sidebar.tsx
│   │   │   ├── admin-nav.tsx
│   │   │   ├── admin-page-header.tsx
│   │   │   ├── admin-action-button.tsx
│   │   │   ├── admin-table.tsx
│   │   │   ├── delete-button.tsx
│   │   │   ├── form-input.tsx
│   │   │   ├── form-textarea.tsx
│   │   │   ├── content-post-form.tsx
│   │   │   ├── project-form.tsx
│   │   │   └── editor/
│   │   │       ├── save-status.tsx
│   │   │       └── use-autosave-draft.ts
│   │   │
│   │   ├── backgrounds/                        Per-category bg visuals
│   │   │   ├── astrophysics-bg.tsx
│   │   │   ├── electronics-bg.tsx
│   │   │   ├── physics-bg.tsx
│   │   │   ├── projects-bg.tsx
│   │   │   ├── research-bg.tsx
│   │   │   └── timeline-bg.tsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useDebouncedValue.ts
│   │   │   ├── useInstantSearch.ts
│   │   │   └── useReadingProgress.ts
│   │   │
│   │   ├── mdx/
│   │   │   └── MDXContent.tsx
│   │   │
│   │   ├── media/
│   │   │   └── MediaUploader.tsx
│   │   │
│   │   ├── related/
│   │   │   ├── RelatedPosts.tsx
│   │   │   └── RelatedProjects.tsx
│   │   │
│   │   ├── navbar.tsx
│   │   ├── hero.tsx
│   │   ├── Footer.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleLayout.tsx
│   │   ├── CategoryBadge.tsx
│   │   ├── CopyButton.tsx
│   │   ├── DistractionFreeProvider.tsx
│   │   ├── DistractionFreeToggle.tsx
│   │   ├── domain-cards.tsx
│   │   ├── featured-posts.tsx
│   │   ├── MDXRenderer.tsx
│   │   ├── MobileTOC.tsx
│   │   ├── page-header.tsx
│   │   ├── portfolio-grid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ReadingProgressBar.tsx
│   │   ├── SearchModal.tsx
│   │   ├── TableOfContents.tsx
│   │   ├── TimelineFilter.tsx
│   │   └── TimelineItem.tsx
│   │
│   ├── content/                                MDX filesystem
│   │   ├── astrophysics/
│   │   │   ├── dark-matter-bayesian-halos.mdx
│   │   │   ├── dark-matter-beyond-wimp.mdx
│   │   │   └── pulsar-timing-array-analysis.mdx
│   │   ├── electronics/
│   │   │   └── fir-filter-parks-mcclellan.mdx
│   │   ├── physics-math/
│   │   │   └── fourier-transform-derivation.mdx
│   │   ├── posts/
│   │   │   ├── hello.mdx
│   │   │   └── heye.mdx
│   │   ├── projects/
│   │   │   ├── fir-filter-designer.mdx
│   │   │   ├── mems-calibration-suite.mdx
│   │   │   └── quantum-circuit-simulator.mdx
│   │   └── research-logs/
│   │       ├── 002-sensor-calibration-field-campaign.mdx
│   │       ├── 003-msc-thesis-gnss-anti-jamming.mdx
│   │       └── mems-gyroscope-noise-characterisation.mdx
│   │
│   ├── lib/                                    Core logic layer
│   │   ├── analytics/
│   │   │   └── index.ts
│   │   ├── authz/
│   │   │   ├── require-role.ts
│   │   │   └── roles.ts
│   │   ├── cache/
│   │   │   ├── cache.ts
│   │   │   ├── index.ts
│   │   │   ├── memory.ts
│   │   │   ├── optional-cache.ts
│   │   │   ├── redis.ts
│   │   │   └── types.ts
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── editorial/
│   │   │   ├── categories.ts
│   │   │   ├── slug.ts
│   │   │   ├── posts/
│   │   │   │   └── content-post-service.ts
│   │   │   ├── projects/
│   │   │   │   └── project-service.ts
│   │   │   └── revisions/
│   │   │       ├── revision-service.ts
│   │   │       └── revision-types.ts
│   │   ├── homepage/
│   │   │   ├── homepage-service.ts
│   │   │   └── types.ts
│   │   ├── jobs/
│   │   │   ├── queue.ts
│   │   │   └── types.ts
│   │   ├── mdx/
│   │   │   ├── mdx-components.tsx
│   │   │   └── mdx-options.ts
│   │   ├── og/
│   │   │   ├── template.tsx
│   │   │   └── utils.ts
│   │   ├── posts/
│   │   │   ├── get-post-by-slug.ts
│   │   │   ├── get-posts.ts
│   │   │   └── write-post.ts
│   │   ├── projects/
│   │   │   ├── get-featured-projects.ts
│   │   │   ├── get-project-by-slug.ts
│   │   │   ├── get-projects.ts
│   │   │   └── get-related-projects.ts
│   │   ├── public/
│   │   │   ├── content-posts.ts
│   │   │   ├── legacy-post-adapter.ts
│   │   │   └── post-card.ts
│   │   ├── related/
│   │   │   ├── posts.ts
│   │   │   └── similarity.ts
│   │   ├── search/
│   │   │   ├── index.ts
│   │   │   ├── query.ts
│   │   │   └── types.ts
│   │   ├── validations/
│   │   │   ├── content-post.ts
│   │   │   ├── post.ts
│   │   │   └── project.ts
│   │   ├── cn.ts
│   │   ├── jsonld.ts
│   │   ├── metadata.ts
│   │   ├── posts.ts
│   │   ├── projects.ts
│   │   ├── timeline.ts
│   │   ├── toc.ts
│   │   ├── uploadthing.ts
│   │   └── utils.ts
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       ├── 20260510073121_init/
│   │       ├── 20260510073615_make_password_optional/
│   │       ├── 20260511130000_search_and_media_foundations/
│   │       ├── 20260511131500_media_assets/
│   │       └── 20260511140000_editorial_revisions_and_versions/
│   │
│   ├── scripts/
│   │   ├── index-content.ts
│   │   └── seed-admin.ts
│   │
│   ├── public/
│   │   └── images/
│   │       ├── astrophysics.jpg
│   │       ├── electronics.jpg
│   │       ├── math-blueprint.jpg
│   │       └── math-grid.jpg
│   │
│   ├── middleware.ts
│   ├── auth.ts
│   ├── auth.config.ts
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   └── .eslintrc.json
│
└── PAGE ARCHITECTURE (Visual Layer)
    │
    ├── PUBLIC ROUTES
    │   ├── 01 — Homepage                       /
    │   │         ├── Hero (Full Viewport)
    │   │         ├── Featured Editorial Grid     → featured-posts.tsx
    │   │         ├── Domain Cards               → domain-cards.tsx
    │   │         ├── Portfolio Grid             → portfolio-grid.tsx
    │   │         └── Footer                     → Footer.tsx
    │   │
    │   ├── 02 — Blog Listing                   /blog
    │   │         ├── Hero                       → hero.tsx
    │   │         ├── Category Filter Bar        → CategoryBadge.tsx
    │   │         ├── Article List               → ArticleCard.tsx
    │   │         ├── Search                     → SearchModal.tsx
    │   │         └── Footer
    │   │
    │   ├── 03 — Article Reader                 /[category]/[slug]
    │   │         ├── Hero                       → hero.tsx + backgrounds/*
    │   │         ├── Reading Column 720px        → ArticleLayout.tsx
    │   │         │     ├── MDX Body             → MDXRenderer.tsx / MDXContent.tsx
    │   │         │     ├── Code Blocks          → mdx-options.ts (rehype-pretty-code)
    │   │         │     └── Math (KaTeX)         → mdx-options.ts (rehype-katex)
    │   │         ├── Sticky TOC (Desktop)        → TableOfContents.tsx
    │   │         ├── Mobile TOC                 → MobileTOC.tsx
    │   │         ├── Reading Progress Bar       → ReadingProgressBar.tsx
    │   │         ├── Related Posts              → RelatedPosts.tsx
    │   │         ├── Copy Button                → CopyButton.tsx
    │   │         ├── Distraction Free Mode      → DistractionFreeToggle.tsx
    │   │         └── Footer
    │   │
    │   ├── 04 — Projects Listing               /projects
    │   │         ├── Hero                       → hero.tsx + projects-bg.tsx
    │   │         ├── Featured Projects          → get-featured-projects.ts
    │   │         ├── Project Card Grid          → ProjectCard.tsx
    │   │         └── Footer
    │   │
    │   ├── 05 — Project Detail                 /projects/[slug]
    │   │         ├── Hero                       → hero.tsx
    │   │         ├── Content Split 65/35
    │   │         │     ├── MDX Prose            → MDXRenderer.tsx
    │   │         │     └── Metadata Panel       → get-project-by-slug.ts
    │   │         ├── Related Projects           → RelatedProjects.tsx
    │   │         └── Footer
    │   │
    │   ├── 06 — Timeline                       /timeline
    │   │         ├── Hero                       → hero.tsx + timeline-bg.tsx
    │   │         ├── Timeline Filter            → TimelineFilter.tsx
    │   │         ├── Timeline Items             → TimelineItem.tsx
    │   │         └── Footer
    │   │
    │   └── 07 — Login                          /login (auth)
    │             ├── Split Layout 60/40
    │             │     ├── Brand Panel (Left)
    │             │     └── Auth Card (Right)
    │             └── No Footer
    │
    └── ADMIN ROUTES                            /admin/* (Auth Protected)
        │         middleware.ts + authz/require-role.ts
        │         Persistent → admin-sidebar.tsx + admin-nav.tsx
        │
        ├── 08 — Dashboard                      /admin
        │         ├── admin-page-header.tsx
        │         ├── Stats Row (4 Cards)
        │         ├── Recent Posts               → admin-table.tsx
        │         └── Recent Projects            → admin-table.tsx
        │
        ├── 09 — Posts Manager                  /admin/posts
        │         ├── admin-page-header.tsx
        │         ├── content-post-form.tsx
        │         ├── admin-table.tsx
        │         ├── delete-button.tsx
        │         ├── editor/save-status.tsx
        │         ├── editor/use-autosave-draft.ts
        │         └── Pagination
        │
        ├── 10 — Projects Manager               /admin/projects
        │         ├── admin-page-header.tsx
        │         ├── project-form.tsx
        │         ├── admin-table.tsx
        │         ├── admin-action-button.tsx
        │         ├── delete-button.tsx
        │         └── Pagination
        │
        └── 11 — Media Manager                  /admin/media
                  ├── admin-page-header.tsx
                  ├── MediaUploader.tsx
                  └── admin-table.tsx

