# Component Rules

* **Design Tokens**: Strictly use CSS tokens defined in `app/globals.css`. Remove hardcoded classes like `bg-black` or generic borders.
* **Animation Preservation**: NEVER modify complex canvas/Framer Motion structures (e.g., `components/hero.tsx` Starfield) when making DOM structure changes. Keep safe additive changes isolated.
* **Accessibility**: Require Skip Navigation Links globally, ARIA labels on navigation, and semantic landmarks. Maintain `focus-visible` and `prefers-reduced-motion` global support.
* **Progressive Reading**: Client components (`ArticleLayout`, `ProjectLayout`) should manage boolean states to toggle server-provided React Node payloads (Focus Mode).
* **TOC Tracking**: Use IntersectionObserver for active state tracking in documentation and long-form reading, synchronized with Framer Motion line trackers.
* **Turbopack Responsive Visibility**: NEVER use `hidden md:flex` in Turbopack/Next.js 14 — Turbopack's CSS load order gives `hidden` and `md:flex` equal specificity, causing `hidden` to silently win. Use `max-md:hidden flex` instead to reliably show elements on desktop.
* **Navbar Transparency**: On the homepage, the Navbar must always have at least a faint background (`bg-[#050810]/60 backdrop-blur-sm`) even before scroll — a fully transparent navbar makes `text-zinc-400` nav links invisible against the dark starfield.
