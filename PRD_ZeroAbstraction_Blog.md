# Product Requirements Document
## Project: Zero-Abstraction — A Prestige Digital Lab Notebook
**Version:** 1.0.0  
**Author:** Kaze Nexus  
**Classification:** Full-Stack Architecture PRD (AI-Dev Tool Ready)  
**Target Builders:** Lovable / Bolt.new / Claude Code / Cursor  
**Last Updated:** March 2026

---

## TABLE OF CONTENTS

1. [Executive Summary](#1-executive-summary)
2. [Vision & Design Philosophy](#2-vision--design-philosophy)
3. [Tech Stack Decision Matrix](#3-tech-stack-decision-matrix)
4. [Design System & Tokens](#4-design-system--tokens)
5. [Information Architecture & Navigation](#5-information-architecture--navigation)
6. [Component Architecture](#6-component-architecture)
7. [Content Management System (MDX)](#7-content-management-system-mdx)
8. [Feature Specifications](#8-feature-specifications)
9. [Self-Hosting & Infrastructure](#9-self-hosting--infrastructure)
10. [SEO & Performance Requirements](#10-seo--performance-requirements)
11. [Phased Implementation Roadmap](#11-phased-implementation-roadmap)
12. [File & Folder Structure](#12-file--folder-structure)
13. [AI Build Prompt (Condensed Spec)](#13-ai-build-prompt-condensed-spec)

---

## 1. EXECUTIVE SUMMARY

**Product Name:** Zero-Abstraction  
**Tagline:** *"No fluff. No filters. Just the derivations."*

Zero-Abstraction is a self-hosted, high-performance personal research blog for an Electronics & Communication Engineering student with documented work spanning embedded systems, signal processing, RF/microwave communications, astrophysics (exoplanet characterization), and computational mathematics.

The site serves as a **prestige digital artifact** — a primary online identity that attracts IIT/IISC fellowship reviewers, research supervisors, and technical peers. It must read like a cross between a well-kept research journal and an MIT OpenCourseWare page: authoritative, dense with intellectual content, and completely devoid of decorative noise.

**Primary Audience:**
- IIT/IISC/international graduate program admissions reviewers
- Research fellowship evaluation committees (SURGE, IITM, IISF)
- Industry R&D engineers and technical hiring leads
- Academic peers in ECE, astrophysics, and applied mathematics

**Secondary Audience:**
- Undergraduate students seeking mentorship or learning material
- Open-source collaborators on embedded/robotics projects

---

## 2. VISION & DESIGN PHILOSOPHY

### 2.1 The "Digital Lab Notebook" Aesthetic

The visual language is derived from three reference points:
1. **Distill.pub** — clarity-first scientific communication, SVG-rich diagrams
2. **Edward Tufte's principles** — maximum data-ink ratio, no chartjunk
3. **Physical lab notebooks** — monospace annotations, ruled grids, margin notes

**The one unforgettable thing:** A site that *looks like it was designed by an engineer who also knows design* — not by a designer trying to look technical. Every pixel has functional justification.

### 2.2 Core UX Principles

| Principle | Implementation |
|---|---|
| **Zero Cognitive Friction** | No popovers, no cookie banners, no newsletter gates |
| **Reading as Primary Action** | Optimal line length (65–72 chars), comfortable leading, no sidebars during read |
| **Technical Fidelity** | LaTeX renders before page paint (no layout shift). Code blocks are scannable, not decorative |
| **Structural Transparency** | Every post shows: reading time, equation count, code blocks count, category, last updated |
| **Progressive Disclosure** | Dense abstract → expandable derivations → footnotes → references |

### 2.3 Tone of Content

The site's voice is **first-person, present-tense research log**. Not a tutorial. Not a portfolio showcase. A living documentation of intellectual work-in-progress. Posts are titled like papers, not like blog posts.

---

## 3. TECH STACK DECISION MATRIX

### 3.1 Framework Selection: **Next.js 14 (App Router)**

| Criterion | Astro | Remix | **Next.js 14** |
|---|---|---|---|
| MDX support | ✅ Native | ✅ Via plugin | ✅ Native |
| Static + Dynamic hybrid | ✅ | ✅ | ✅ **Best** |
| KaTeX SSR | ✅ | ⚠️ Manual | ✅ |
| Image optimization | ⚠️ | ⚠️ | ✅ Built-in |
| Docker/VPS maturity | ✅ | ✅ | ✅ **Best** |
| Ecosystem / community | Medium | Medium | **Largest** |
| AI dev tool support | Good | Good | **Best** |

**Decision: Next.js 14 with App Router.** The hybrid SSG/SSR model enables static rendering for all blog content (maximum CDN performance) while keeping dynamic routes available for future features (search, analytics dashboard).

### 3.2 Complete Stack Specification

```
FRAMEWORK         Next.js 14 (App Router, TypeScript strict mode)
STYLING           Tailwind CSS 3.4 + CSS Variables for design tokens
CONTENT           MDX (via @next/mdx + next-mdx-remote for remote content)
MATH RENDERING    KaTeX (server-side via rehype-katex + remark-math)
SYNTAX HIGHLIGHT  Shiki (server-side, zero client JS, all ECE languages)
SEARCH            Pagefind (static search, no external API)
ANIMATIONS        Framer Motion (selective, performance-gated)
ICONS             Lucide React
FONTS             Geist Mono (code) + Instrument Serif (headings) + Inter Tight (body)
LINTING           ESLint + Prettier + TypeScript strict
TESTING           Vitest + Playwright (E2E)
CONTAINERIZATION  Docker + Docker Compose
REVERSE PROXY     Caddy (auto-HTTPS on VPS) or Nginx
ANALYTICS         Umami (self-hosted, privacy-first)
```

### 3.3 Content Pipeline

```
Author writes .mdx files
    → Frontmatter parsed (gray-matter)
    → remark-math processes $...$ and $$...$$
    → rehype-katex renders to HTML (SSR, no client JS for math)
    → Shiki tokenizes code blocks at build time
    → next/image optimizes any inline images
    → Static HTML served with pre-rendered KaTeX CSS injected in <head>
```

**Critical:** KaTeX CSS must be imported globally in `app/layout.tsx` to prevent FOUC (flash of unstyled content) on math-heavy pages.

---

## 4. DESIGN SYSTEM & TOKENS

### 4.1 Color Palette

The palette uses a warm off-white base (not pure white — reduces eye strain for long reads) with a single precise accent drawn from scientific visualization conventions.

```css
/* === ZERO-ABSTRACTION DESIGN TOKENS === */
:root {
  /* Base */
  --color-bg:           #F8F6F1;   /* Warm parchment — primary background */
  --color-surface:      #FFFFFF;   /* Pure white — card/code block surfaces */
  --color-border:       #E2DDD6;   /* Warm grey — dividers, borders */

  /* Text */
  --color-text-primary: #1A1816;   /* Near-black warm — body copy */
  --color-text-secondary: #5C5751; /* Mid warm grey — metadata, captions */
  --color-text-tertiary:  #9C9690; /* Light warm grey — timestamps, tags */

  /* Accent — Scientific Amber */
  --color-accent:       #C8842A;   /* Amber — links, highlights, timeline nodes */
  --color-accent-muted: #F0E4CC;   /* Pale amber — tag backgrounds, hover states */

  /* Code surface */
  --color-code-bg:      #F0EDE8;   /* Slightly darker parchment */
  --color-code-border:  #D4CFC8;

  /* Semantic */
  --color-success:      #3D7A5E;
  --color-warning:      #C8842A;   /* Same as accent */
  --color-error:        #A33B2A;

  /* Dark mode overrides (via [data-theme="dark"]) */
  --color-bg-dark:         #111009;
  --color-surface-dark:    #1C1A16;
  --color-border-dark:     #2E2C28;
  --color-text-primary-dark:   #E8E4DC;
  --color-text-secondary-dark: #9E9990;
  --color-accent-dark:     #E09C42;
  --color-code-bg-dark:    #161410;
}
```

**Rationale for Amber:** Amber is the color of scientific glassware, oscilloscope traces, and vintage lab equipment. It has no association with corporate UI frameworks — it reads as distinctly "engineering."

### 4.2 Typography Scale

```css
/* === FONT STACKS === */
--font-display:  'Instrument Serif', 'Georgia', serif;       /* Section headings */
--font-body:     'Inter Tight', 'Helvetica Neue', sans-serif; /* Body copy */
--font-mono:     'Geist Mono', 'JetBrains Mono', monospace;   /* Code + equations */

/* === TYPE SCALE (Major Third — 1.250 ratio) === */
--text-xs:    0.64rem;   /* 10.24px — Tags, footnote markers */
--text-sm:    0.8rem;    /* 12.8px  — Metadata, captions */
--text-base:  1rem;      /* 16px    — Body copy */
--text-lg:    1.25rem;   /* 20px    — Lead paragraphs */
--text-xl:    1.563rem;  /* 25px    — H3 */
--text-2xl:   1.953rem;  /* 31px    — H2 */
--text-3xl:   2.441rem;  /* 39px    — H1 post titles */
--text-4xl:   3.052rem;  /* 49px    — Hero / homepage title */
--text-5xl:   3.815rem;  /* 61px    — Display / section heroes */

/* === READING TYPOGRAPHY === */
--line-height-body:     1.75;    /* Generous for dense technical content */
--line-height-heading:  1.15;    /* Tight for display text */
--line-height-code:     1.6;     /* Breathing room in code blocks */
--measure:              68ch;    /* Optimal line length — enforced on prose */
--measure-wide:         80ch;    /* For tables and code */

/* === SPACING SCALE === */
--space-1:  0.25rem;
--space-2:  0.5rem;
--space-3:  0.75rem;
--space-4:  1rem;
--space-6:  1.5rem;
--space-8:  2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
--space-32: 8rem;
```

### 4.3 Component Sizing & Grid

```css
/* === LAYOUT GRID === */
--max-width-content:  720px;   /* Primary reading column */
--max-width-wide:     1000px;  /* Wide figures, diagrams */
--max-width-full:     1280px;  /* Site shell, navigation */
--sidebar-width:      260px;   /* TOC sidebar on wide screens */

/* === BORDER RADIUS === */
--radius-sm:  4px;
--radius-md:  8px;
--radius-lg:  12px;

/* === SHADOWS === */
--shadow-card: 0 1px 3px rgba(26,24,22,0.06), 0 4px 12px rgba(26,24,22,0.04);
--shadow-code: inset 0 0 0 1px var(--color-code-border);
```

---

## 5. INFORMATION ARCHITECTURE & NAVIGATION

### 5.1 Top-Level Navigation

```
[Zero-Abstraction Logo/Name]
├── Writing
│   ├── Electronics & Communications    /writing/ece
│   ├── Astrophysics & Space            /writing/astrophysics
│   ├── Physics & Mathematics           /writing/physics-math
│   └── Research Logs                   /writing/research-logs
├── Projects                            /projects
├── Timeline                            /timeline
├── About                               /about
└── [Search Icon] [Theme Toggle]
```

### 5.2 URL Structure

```
/                               Homepage — hero + 3 latest posts + about teaser
/writing                        All posts — filterable by category + tag
/writing/[category]             Category landing — description + posts
/writing/[category]/[slug]      Individual post
/projects                       Project gallery grid
/projects/[slug]                Individual project detail
/timeline                       Interactive research timeline
/about                          Extended bio + contact
/tags/[tag]                     Tag-based post collection
/rss.xml                        Full-content RSS feed (auto-generated)
/sitemap.xml                    Auto-generated sitemap
```

### 5.3 Category Taxonomy & Tagging

**Categories (mutually exclusive, one per post):**
- `ece` — Signal processing, RF, embedded, communications theory
- `astrophysics` — Exoplanet characterization, photometry, spectroscopy
- `physics-math` — Derivations, transforms, mathematical physics
- `research-logs` — Progress notes, experiment logs, reading summaries

**Tags (many-to-many, any number per post):**
`fourier-transform`, `dsp`, `wasp-39b`, `tess-data`, `embedded`, `esp8266`, `matlab`, `python`, `ros2`, `slam`, `signal-propagation`, `doppler-effect`, `exoplanet`, `astrophysics`, `dcm`, `image-compression`, `modulation`, `rf-systems`, `radar`, `iit-fellowship`, `derivation`, `linear-algebra`, `differential-equations`

---

## 6. COMPONENT ARCHITECTURE

All components are TypeScript, using React Server Components where possible. Client components are explicitly marked `"use client"` and minimized.

### 6.1 Layout Components

#### `app/layout.tsx` — Root Shell
```typescript
// Responsibilities:
// - Injects KaTeX CSS globally (critical: prevents FOUC)
// - Sets up font variables via next/font/google
// - Wraps with ThemeProvider
// - Includes SkipToContent link (accessibility)
// - Meta charset, viewport, color-scheme

// Key imports:
import 'katex/dist/katex.min.css'
import { GeistMono } from 'geist/font/mono'
```

#### `components/layout/SiteHeader.tsx` — Server Component
- Logo (wordmark: "Zero-Abstraction" in Geist Mono, slightly tracked)
- Top-level nav links with active state
- Search trigger icon (opens Pagefind modal)
- Theme toggle (sun/moon, system preference default)
- Mobile: hamburger → slide-over drawer

#### `components/layout/SiteFooter.tsx` — Server Component
- Minimal: Copyright, RSS link, GitHub link
- No social media wall, no newsletter CTA

#### `components/layout/ReadingLayout.tsx` — Server Component
This is the most critical layout. Applied to all post pages.
```
[────────── FULL WIDTH HEADER ──────────]
[          Site navigation              ]
[────────────────────────────────────────]
                                         
  [POST HEADER — full width, centered]   
  Category breadcrumb > Post Title       
  Byline | Date | Reading time           
  Tags row                               
  Abstract (italic, indented)            
  [────────── divider ──────────]        
                                         
[TOC SIDEBAR] [─── PROSE COLUMN ───]    
  (sticky,       max-width: 68ch        
   desktop       line-height: 1.75      
   only)                                 
                                         
[────────── POST FOOTER ──────────]     
  Previous / Next navigation            
  Related posts (by tag intersection)   
```

### 6.2 Content Components

#### `components/content/PostCard.tsx` — Server Component
Used in listing pages and homepage.
```
Props: {
  title: string
  slug: string
  category: Category
  date: string
  readingTime: number        // minutes, auto-computed
  abstract: string           // first 200 chars of post
  tags: string[]
  equationCount?: number     // from frontmatter
  hasCode: boolean
}

Visual: Clean card, left border accent in category color,
        title in Instrument Serif, metadata row in small caps.
        Hover: slight shadow lift + amber underline on title.
```

#### `components/content/PostHeader.tsx` — Server Component
```
Props: {
  title, category, date, updatedDate?, readingTime,
  abstract, tags, equationCount, codeBlockCount
}

Visual:
- Category label (small caps, amber)
- H1 in Instrument Serif, 2.4rem, tight leading
- Metadata strip: date | reading time | N equations | N code blocks
- Abstract paragraph in italic, slightly indented
- Tags as pill chips (amber muted background)
```

#### `components/content/TableOfContents.tsx` — Client Component
```typescript
// Extracts all h2/h3 headings from MDX content
// Highlights active section via IntersectionObserver
// Sticky positioned in sidebar (desktop: ≥ 1024px)
// Collapses to hidden on mobile (reading mode priority)
// Smooth scrolls on click (no URL hash pollution)
```

#### `components/content/Callout.tsx` — Server Component
Custom MDX element for inline callouts:
```mdx
<Callout type="theorem" label="Nyquist-Shannon">
  A bandlimited signal can be perfectly reconstructed...
</Callout>
```
Types: `theorem`, `derivation`, `note`, `warning`, `definition`, `result`  
Each has a distinct left-border color and icon prefix.

#### `components/content/Figure.tsx` — Server Component
```
Props: { src, alt, caption, width?, fullWidth?: boolean }

- fullWidth breaks out of 68ch column to 80ch (side-scrollable on mobile)
- Caption in small italic below image
- Supports SVG diagrams natively
```

#### `components/content/MathBlock.tsx` — Server Component
Thin wrapper around KaTeX output. Adds:
- `overflow-x: auto` for long equations on mobile
- Optional equation number (right-aligned, for referencing)
- Hover to copy LaTeX source

#### `components/content/CodeBlock.tsx` — Server Component
Shiki-powered, server-rendered. Zero runtime JS.
```
Props: { lang, filename?, showLineNumbers?, highlight?: number[] }

Visual:
- Dark surface even in light mode (code is always dark — engineering convention)
- Filename tab if provided (Geist Mono, dim)
- Line numbers (optional, on by default for >10 lines)
- Highlighted lines have amber left border + slightly lighter bg
- Copy button (client island — only JS in the block)
- Language badge top-right

Supported languages: python, cpp, c, matlab, verilog, systemverilog,
                     bash, json, yaml, typescript, javascript
```

### 6.3 Feature Components

#### `components/features/DistractionFreeMode.tsx` — Client Component
```typescript
// Toggle button: appears in reading layout bottom-right (fixed position)
// When activated:
//   - Hides: SiteHeader, TOC sidebar, PostFooter, all non-prose UI
//   - Dims: page background slightly
//   - Shows: only the prose column + a minimal "exit" button
//   - Adds subtle vignette overlay on page edges
//   - State persists in localStorage
// Icon: Expand / Collapse (Lucide)
```

#### `components/features/SearchModal.tsx` — Client Component
```typescript
// Powered by Pagefind (static, generated at build time)
// Opens via Cmd/Ctrl+K or search icon
// Full-text search across all MDX content including equations
// Results show: title, category, excerpt with match highlighted
// No external API — fully offline capable
```

#### `components/features/ThemeToggle.tsx` — Client Component
```typescript
// Cycles: System → Light → Dark
// Stores preference in localStorage
// Prevents flash via inline script in <head>
// CSS: data-theme="dark" on <html> element
```

### 6.4 Portfolio Feature Components

#### `components/portfolio/ResearchTimeline.tsx` — Client Component
```
Interactive vertical timeline. Key implementation details:

Data source: /content/data/timeline.json (static, hand-authored)

Entry schema:
{
  id: string
  date: string               // "2024-09" format
  title: string
  category: "ece" | "astrophysics" | "physics-math" | "milestone"
  description: string
  linkedPost?: string        // /writing/... slug
  linkedProject?: string     // /projects/... slug
  skills: string[]           // e.g. ["MATLAB", "DSP", "Python"]
  isHighlight: boolean       // Major milestones get larger node
}

Visual behavior:
- Vertical line as spine
- Circular nodes (amber for milestones, category-colored otherwise)
- Hover on node: expand card with description + linked content
- Filter buttons: All | ECE | Astrophysics | Math | Milestones
- Scroll-triggered fade-in animations (Framer Motion)
- Mobile: single column, swipe-friendly
```

#### `components/portfolio/ProjectGallery.tsx` — Server Component + Client Filters
```
Data source: /content/projects/ (MDX files with rich frontmatter)

Project frontmatter schema:
---
title: string
status: "active" | "complete" | "archived"
domain: string[]              # ["embedded", "signal-processing"]
tech: string[]                # ["ESP8266", "C++", "Python"]
date: string
endDate?: string
github?: string
report?: string               # Link to related blog post
thumbnail?: string
featured: boolean
---

Gallery layout: Responsive grid (3 cols → 2 → 1)
Each card shows:
- Thumbnail or generated placeholder (category-colored geometric)
- Title + status badge
- Domain tags
- Tech stack pills
- Link to detail page

Filters (client-side, no page reload):
- Domain: All | Embedded | Signal Processing | Astrophysics | Math | Robotics
- Status: All | Active | Complete
- Sort: Newest | Oldest | Featured First
```

---

## 7. CONTENT MANAGEMENT SYSTEM (MDX)

### 7.1 Frontmatter Schema (All Posts)

```yaml
---
# REQUIRED
title: "DCT-Based Image Compression: A Signal Processing Derivation"
slug: "dct-image-compression"
category: "ece"                    # ece | astrophysics | physics-math | research-logs
date: "2026-02-15"
abstract: |
  A ground-up derivation of the Discrete Cosine Transform applied to
  YCbCr color space image compression, implementing JPEG's core algorithm
  without any library abstraction. Includes full MATLAB implementation.

# OPTIONAL BUT RECOMMENDED
updatedDate: "2026-03-01"
tags: ["dct", "image-compression", "matlab", "signal-processing", "fourier"]
readingTime: 18                    # minutes — auto-computed if omitted
equationCount: 24                  # for display in post header
codeBlockCount: 7
featured: false
draft: false

# OPTIONAL
relatedPosts:
  - "fourier-transform-intuition"
  - "wasp39b-characterization"
references:
  - "Rao, K.R. & Yip, P. (1990). Discrete Cosine Transform: Algorithms..."
  - "Wallace, G.K. (1992). The JPEG still picture compression standard..."
---
```

### 7.2 MDX Component Mapping

These components are available globally in all MDX files (registered in `mdx-components.tsx`):

```typescript
// mdx-components.tsx
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Override default HTML elements
    h1: (props) => <Heading level={1} {...props} />,
    h2: (props) => <Heading level={2} {...props} />,  // Also adds anchor link
    h3: (props) => <Heading level={3} {...props} />,
    a: (props) => <SmartLink {...props} />,            // Internal vs external handling
    img: (props) => <Figure {...props} />,
    pre: (props) => <CodeBlock {...props} />,
    table: (props) => <ResponsiveTable {...props} />,
    blockquote: (props) => <Pullquote {...props} />,

    // Custom components (used as JSX in MDX)
    Callout,
    Figure,
    MathBlock,
    Equation,             // Named/numbered equation
    Definition,           // Term + definition callout
    Timeline,             // Inline mini-timeline
    ...components,
  }
}
```

### 7.3 Content Directory Structure

```
/content
├── posts/
│   ├── ece/
│   │   ├── dct-image-compression.mdx
│   │   └── fourier-transform-intuition.mdx
│   ├── astrophysics/
│   │   └── wasp39b-characterization.mdx
│   ├── physics-math/
│   │   └── nyquist-shannon-derivation.mdx
│   └── research-logs/
│       └── iitm-fellowship-prep.mdx
├── projects/
│   ├── ev-overheat-alert.mdx
│   └── echo-platform.mdx
└── data/
    ├── timeline.json
    └── about.mdx
```

### 7.4 Content Utility Functions

```typescript
// lib/content.ts — Key functions AI should implement:

// getAllPosts(): PostMeta[]
// Returns all non-draft posts sorted by date descending
// Reads MDX frontmatter via gray-matter

// getPostBySlug(category, slug): Post
// Returns full MDX content + compiled output + frontmatter

// getRelatedPosts(post, limit): PostMeta[]
// Returns posts sharing the most tag intersections

// getAllTags(): { tag: string, count: number }[]
// Aggregates tags across all posts

// computeReadingTime(content: string): number
// 200 WPM base, +30s per equation, +10s per code block

// generateRSSFeed(): string
// Full-content RSS XML for all published posts
```

---

## 8. FEATURE SPECIFICATIONS

### 8.1 Distraction-Free Reading Mode

**Trigger:** Button in bottom-right corner of reading layout, keyboard shortcut `F` (for Focus)

**Behavior:**
```
OFF state: Normal reading layout with header, TOC, footer visible
ON state:
  - Hides: <SiteHeader>, <TableOfContents>, <PostFooter>, <RelatedPosts>
  - Transition: 300ms ease fade for hidden elements
  - Adds to <body>: class="distraction-free"
  - CSS: .distraction-free prose-column → centered, margin auto, 
         full viewport width use
  - Subtle page-edge shadow vignette (CSS box-shadow inset on body)
  - Exit: Same button (now shows "Exit Focus") or Escape key
  - Persists across page navigation (localStorage key: "dfm-active")
```

### 8.2 Static Search (Pagefind)

**Setup:**
```bash
# In package.json scripts:
"build": "next build && npx pagefind --site .next/server/app --output-path public/pagefind"
```

**Integration:**
```typescript
// components/features/SearchModal.tsx
// Lazy-loads Pagefind bundle only when modal opens
// Search indexes: title, abstract, full body text, tags, category
// Results: max 8, sorted by relevance
// Highlighting: matched terms highlighted in excerpt
```

**No external dependencies. Works fully offline. Zero API keys.**

### 8.3 RSS Feed

Auto-generated at build time. Full post content included (not just excerpts — respects reader autonomy).

```
GET /rss.xml
Content-Type: application/rss+xml

Includes: title, description, pubDate, link, category, full <content:encoded>
KaTeX: Rendered HTML equations included in RSS content
```

### 8.4 Reading Progress Indicator

Thin amber line at the very top of the viewport (not a sidebar). 0% → 100% as reader scrolls through prose. Disappears when footer is visible.

```typescript
// Implemented as a Client Component island
// Uses requestAnimationFrame for smooth update
// CSS: position: fixed; top: 0; height: 2px; background: var(--color-accent)
// Respects prefers-reduced-motion: no animation if set
```

### 8.5 Dark Mode Implementation

System preference respected by default. Manual override stored in localStorage. Flash prevention via inline script:

```html
<!-- In app/layout.tsx, before any CSS loads: -->
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    const stored = localStorage.getItem('theme');
    const system = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (system ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
`}} />
```

### 8.6 Post Metadata Strip

Appears in every post header. Example rendering:

```
Electronics & Communications  >  Signal Processing

DCT-Based Image Compression: A Signal Processing Derivation

March 2026  ·  18 min read  ·  24 equations  ·  7 code blocks

[dct]  [image-compression]  [matlab]  [signal-processing]
```

---

## 9. SELF-HOSTING & INFRASTRUCTURE

### 9.1 Docker Configuration

#### `Dockerfile`
```dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build
# Run Pagefind after Next.js build
RUN npx pagefind --site .next/server/app --output-path public/pagefind

# Production runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

#### `docker-compose.yml`
```yaml
version: '3.8'

services:
  blog:
    build: .
    container_name: zero-abstraction
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    volumes:
      - ./content:/app/content:ro    # Hot-reload content without rebuild
    networks:
      - web

  # Self-hosted analytics (optional, privacy-first)
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    container_name: umami-analytics
    restart: unless-stopped
    environment:
      DATABASE_URL: postgresql://umami:umami@db:5432/umami
      DATABASE_TYPE: postgresql
    networks:
      - web
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    container_name: umami-db
    restart: unless-stopped
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: umami
    volumes:
      - umami_db:/var/lib/postgresql/data
    networks:
      - web

networks:
  web:
    external: true    # Managed by Caddy/Traefik reverse proxy

volumes:
  umami_db:
```

#### `Caddyfile` (Reverse Proxy — Auto HTTPS)
```caddy
yourdomain.com {
    reverse_proxy blog:3000
    encode gzip zstd
    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}

analytics.yourdomain.com {
    reverse_proxy umami:3000
}
```

### 9.2 Deployment Workflow

```
New Post Workflow:
1. Author writes /content/posts/[category]/[slug].mdx locally
2. git push to private repo
3. GitHub Actions / Forgejo CI:
   a. npm run build (Next.js + Pagefind)
   b. docker build -t zero-abstraction:latest .
   c. SSH to VPS: docker compose up -d --build
4. Site updated. No CMS, no database, no third-party dependency.
```

### 9.3 Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Zero-Abstraction"
NEXT_PUBLIC_AUTHOR_NAME="Kaze Nexus"
NEXT_PUBLIC_ANALYTICS_ENABLED=false

# .env.production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-umami-id
```

---

## 10. SEO & PERFORMANCE REQUIREMENTS

### 10.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|---|---|---|
| LCP | < 1.5s | Static generation, optimized fonts, no hero images |
| INP | < 100ms | Minimal client JS, no unnecessary hydration |
| CLS | < 0.01 | KaTeX pre-rendered SSR, next/image with dimensions |
| FCP | < 0.8s | Critical CSS inlined, fonts preloaded |
| TTFB | < 200ms | CDN edge caching for all static pages |

### 10.2 SEO Implementation

```typescript
// app/writing/[category]/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.category, params.slug);
  return {
    title: `${post.title} | Zero-Abstraction`,
    description: post.abstract,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.abstract,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate,
      authors: ['Kaze Nexus'],
      tags: post.tags,
    },
    // Structured data (JSON-LD)
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ScholarlyArticle',
        headline: post.title,
        abstract: post.abstract,
        author: { '@type': 'Person', name: 'Kaze Nexus' },
        datePublished: post.date,
        keywords: post.tags.join(', '),
      })
    }
  }
}
```

**Note:** Using `ScholarlyArticle` schema type (not just `BlogPosting`) — signals academic intent to Google's knowledge graph.

### 10.3 Performance Constraints

- **No Google Fonts runtime** — use `next/font` (self-hosts fonts, avoids external DNS lookup)
- **No client-side analytics** — Umami script is async, defer, and < 2KB
- **No social share buttons** — eliminates 40+ third-party requests
- **Shiki instead of Prism** — server-side highlighting means zero client JS for code
- **KaTeX instead of MathJax** — 10x faster, server-renderable, no client JS needed

---

## 11. PHASED IMPLEMENTATION ROADMAP

### Phase 1 — Foundation (Week 1–2)
**Goal:** Deployable site with 1 working post. Infrastructure complete.

- [ ] Next.js 14 project scaffold (TypeScript, App Router, Tailwind)
- [ ] Design token CSS variables injected globally
- [ ] Font setup (Instrument Serif, Inter Tight, Geist Mono via next/font)
- [ ] Root layout with KaTeX CSS global import
- [ ] `SiteHeader` and `SiteFooter` components
- [ ] Homepage (`app/page.tsx`) — hero section + placeholder content
- [ ] MDX pipeline: `@next/mdx` + `remark-math` + `rehype-katex` + Shiki
- [ ] First post: Write one real technical post to validate pipeline
- [ ] Docker + docker-compose + Caddyfile
- [ ] Deploy to VPS — site live at domain

**Validation:** Paste a real equation-heavy post. KaTeX renders. Code highlighted. Site loads under 1.5s. Docker container restarts automatically.

---

### Phase 2 — Reading Experience (Week 3–4)
**Goal:** Post reading experience is polished and production-quality.

- [ ] `ReadingLayout` component with TOC sidebar
- [ ] `PostHeader` component (title, metadata strip, tags)
- [ ] `TableOfContents` with IntersectionObserver active state
- [ ] All MDX custom components: `Callout`, `Figure`, `MathBlock`, `Equation`
- [ ] `CodeBlock` with filename, line numbers, copy button, language badge
- [ ] `DistractionFreeMode` toggle (localStorage persistent)
- [ ] Reading progress indicator (amber line)
- [ ] Dark mode (system preference + manual override, flash prevention)
- [ ] `PostCard` component for listing pages
- [ ] Post listing page (`/writing`) with category filter
- [ ] Category landing pages (`/writing/[category]`)

**Validation:** Read a 20-minute technical post on mobile. No eye strain. Math renders instantly. Code is scannable. No distractions.

---

### Phase 3 — Portfolio & Discovery (Week 5–6)
**Goal:** Full site functional. Portfolio features live. Search working.

- [ ] `ResearchTimeline` interactive component (`/timeline`)
- [ ] Timeline data schema and first 10 entries authored
- [ ] `ProjectGallery` with filter + sort (`/projects`)
- [ ] Project MDX pages with rich frontmatter
- [ ] Static search with Pagefind integrated into build pipeline
- [ ] `SearchModal` (Cmd+K) with results UI
- [ ] RSS feed generation (`/rss.xml`)
- [ ] Sitemap generation (`/sitemap.xml`)
- [ ] About page (`/about`) with extended bio + contact
- [ ] Related posts component in post footer

**Validation:** Search for "DCT" — finds the compression post. Click timeline node — opens linked post. RSS feed validates in a reader.

---

### Phase 4 — Performance & Polish (Week 7–8)
**Goal:** Lighthouse 95+ across all metrics. Submission-ready.

- [ ] Core Web Vitals audit and fixes
- [ ] JSON-LD structured data on all post pages
- [ ] Open Graph meta tags (dynamic per page)
- [ ] Umami analytics container live + integrated
- [ ] 404 and error pages
- [ ] `robots.txt` configured
- [ ] Accessibility audit (keyboard nav, screen reader, color contrast)
- [ ] Mobile experience polish (all breakpoints)
- [ ] CI/CD pipeline (GitHub Actions → Docker build → VPS deploy)
- [ ] Write 5+ real posts across all 4 categories

**Validation:** Run Lighthouse. Score ≥ 95 performance, 100 accessibility, 100 SEO, 100 best practices. Share link with a researcher and ask: "Does this look credible?"

---

## 12. FILE & FOLDER STRUCTURE

```
zero-abstraction/
├── app/
│   ├── layout.tsx                    # Root layout — fonts, KaTeX CSS, ThemeProvider
│   ├── page.tsx                      # Homepage
│   ├── globals.css                   # CSS variables, Tailwind base, prose styles
│   ├── writing/
│   │   ├── page.tsx                  # All posts listing
│   │   ├── [category]/
│   │   │   ├── page.tsx              # Category landing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Individual post
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── timeline/page.tsx
│   ├── about/page.tsx
│   ├── tags/[tag]/page.tsx
│   ├── rss.xml/route.ts              # RSS feed route handler
│   └── sitemap.ts                    # Auto-generated sitemap
│
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── ReadingLayout.tsx
│   │   └── PageLayout.tsx
│   ├── content/
│   │   ├── PostCard.tsx
│   │   ├── PostHeader.tsx
│   │   ├── TableOfContents.tsx       # "use client"
│   │   ├── Callout.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── Figure.tsx
│   │   ├── MathBlock.tsx
│   │   ├── Equation.tsx
│   │   ├── Pullquote.tsx
│   │   └── ResponsiveTable.tsx
│   ├── features/
│   │   ├── DistractionFreeMode.tsx   # "use client"
│   │   ├── SearchModal.tsx           # "use client"
│   │   ├── ThemeToggle.tsx           # "use client"
│   │   ├── ReadingProgress.tsx       # "use client"
│   │   └── CopyButton.tsx            # "use client"
│   └── portfolio/
│       ├── ResearchTimeline.tsx      # "use client"
│       └── ProjectGallery.tsx
│
├── content/
│   ├── posts/
│   │   ├── ece/
│   │   ├── astrophysics/
│   │   ├── physics-math/
│   │   └── research-logs/
│   ├── projects/
│   └── data/
│       ├── timeline.json
│       └── about.mdx
│
├── lib/
│   ├── content.ts                    # MDX reading utilities
│   ├── rss.ts                        # RSS generation
│   ├── utils.ts                      # Shared helpers
│   └── types.ts                      # TypeScript types
│
├── public/
│   ├── fonts/                        # Self-hosted font fallbacks
│   ├── og/                           # OG image templates
│   └── pagefind/                     # Generated by build — gitignored
│
├── styles/
│   └── prose.css                     # Custom @tailwindcss/typography overrides
│
├── mdx-components.tsx                # Global MDX component registry
├── next.config.mjs                   # MDX, image domains, standalone output
├── tailwind.config.ts                # Design token integration
├── tsconfig.json                     # Strict TypeScript
├── Dockerfile
├── docker-compose.yml
├── Caddyfile
├── .env.local
├── .env.production
└── .gitignore
```

---

## 13. AI BUILD PROMPT (CONDENSED SPEC)

> **Use this section as the primary prompt when building with Lovable, Bolt.new, or Claude Code.**

---

```
Build "Zero-Abstraction" — a self-hosted personal research blog for an 
Electronics & Communication Engineering student.

FRAMEWORK: Next.js 14, App Router, TypeScript strict mode
STYLING: Tailwind CSS + CSS custom properties
CONTENT: MDX with remark-math + rehype-katex (math) + Shiki (code)
SEARCH: Pagefind (static, no API)
CONTAINERIZATION: Docker + docker-compose

PALETTE:
  Background: #F8F6F1 (warm parchment)
  Text: #1A1816
  Accent: #C8842A (amber)
  Code surface: always dark (#111009) regardless of page theme
  Dark mode: data-theme="dark" on <html>

TYPOGRAPHY:
  Headings: Instrument Serif
  Body: Inter Tight, 16px, 1.75 line-height, max 68ch width
  Code/mono: Geist Mono

CRITICAL REQUIREMENTS:
1. Import KaTeX CSS globally in layout.tsx (server-side math, zero client JS)
2. Use Shiki for syntax highlighting (server-side, zero runtime JS for code)
3. All blog posts render as static HTML (generateStaticParams)
4. Distraction-Free Mode: hides header/TOC/footer, keeps only prose
5. ReadingLayout: sticky TOC sidebar (desktop), hidden on mobile
6. Docker: multi-stage build with standalone Next.js output
7. RSS feed at /rss.xml (full content, not excerpts)
8. JSON-LD structured data type: ScholarlyArticle on post pages

NAVIGATION: Writing > [ECE | Astrophysics | Physics & Math | Research Logs] 
            Projects | Timeline | About

MDX FRONTMATTER: title, slug, category, date, abstract, tags, 
                 equationCount, codeBlockCount, readingTime, draft

PORTFOLIO FEATURES:
- ResearchTimeline: vertical, filterable, Framer Motion scroll-in
- ProjectGallery: grid with domain + status filters, client-side

NO: WordPress, any CMS, Google Fonts runtime, social share buttons,
    newsletter forms, comment systems, cookie banners, external analytics
```

---

*End of PRD — Zero-Abstraction v1.0.0*
