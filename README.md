# ZeroAbstraction

ZeroAbstraction is a premium technical publishing platform, engineering portfolio, and research-oriented knowledge base built on a modern full-stack Next.js 14 App Router architecture.

Designed for "Cinematic Developer Minimalism," the platform bridges the gap between engineering rigor and accessible presentation through a research-first aesthetic.

---

## 🌌 Vision & Design Philosophy

ZeroAbstraction exists to present technical knowledge with clarity and visual precision. The system prioritizes:

- **Frontend Fidelity**: A premium reading experience with whitespace-first layouts and refined typography.
- **Atmospheric Backgrounds**: Unique, immersive ambient layers for different categories (Astrophysics, Electronics, Physics, etc.).
- **Immersive MDX**: Long-form technical content with LaTeX math support, syntax highlighting, and scroll-spy table of contents.
- **Layered Architecture**: Strict separation of concerns (UI → Actions → Service → Data).

---

## ✨ Features

- 📝 **Technical Blog**: Immersive reading experience with category-specific atmospheres.
- 🏗 **Engineering Portfolio**: Database-backed project showcase with rich media support.
- ⏳ **Research Timeline**: A chronological log of engineering and research milestones.
- 🛡 **Editorial Admin**: Private dashboard for managing drafts, projects, and media.
- 🔍 **Global Search**: PostgreSQL-backed backend search for articles and projects.
- 🌓 **Atmospheric UI**: Cinematic dark mode with per-category background systems.
- 🚀 **Performance Optimized**: Core Web Vitals focused, ISR/SSR caching, and local variable fonts (Geist).

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + CSS Variables
- **Database**: [PostgreSQL](https://www.postgresql.org/) via [Prisma ORM](https://www.prisma.io/)
- **Auth**: [Auth.js (NextAuth.js)](https://authjs.dev/)
- **Content**: Hybrid MDX (Filesystem) + Database (Editorial Layer)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Media**: [UploadThing](https://uploadthing.com/)
- **Math**: `remark-math` + `rehype-katex`
- **Code**: `rehype-pretty-code` (Shiki-based)

---

## 📂 Architecture

```text
app/                 # App Router (Public, Admin, API)
components/          # UI Components & Feature Modules
├── ui/              # Shared Primitives (Radix-based)
├── backgrounds/     # Atmospheric Background Components
└── admin/           # Dashboard-specific Components
lib/                 # Core Logic (Service Layer)
├── db/              # Prisma Client
├── editorial/       # Post/Project Services
├── mdx/             # MDX Processing Pipeline
└── search/          # Search Logic
content/             # MDX Technical Articles
public/              # Static Assets & Fonts
```

---

## 📜 License

[MIT](LICENSE) © [ZeroAbstraction](https://zero-abstraction.in)
