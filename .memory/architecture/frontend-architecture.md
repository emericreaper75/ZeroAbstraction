# Frontend Architecture

* App Router (`app/`)
* Radix UI primitives for accessible components (ARIA labels, Skip Navigation links).
* Framer Motion for complex animations (e.g., Interactive TOC line tracker, Hero canvas).
* Strict CSS tokens system (`app/globals.css`). No hardcoded `bg-black` or generic background utilities; must use defined CSS variables.
* **Component Rules**: Server Components fetch data, Client Components manage minimal interactive state (`isDistractionFree` toggle, active TOC heading tracking via IntersectionObserver).
