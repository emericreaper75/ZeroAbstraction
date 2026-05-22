# ZeroAbstraction: Frontend & Design System

This document outlines the visual identity of ZeroAbstraction, detailing the CSS design tokens, local font stacks, category background layers, interactive reading systems, and accessibility policies.

---

## 1. CSS Custom Tokens & HSL Colors

Design variables are centralized in `app/globals.css` and mapped to Tailwind config attributes. Raw hex color values are prohibited in component files.

### Base Colors (Dark Mode Defaults)
- `--bg-base`: `#050810` (deep space background)
- `--bg-surface`: `#06090f` (elevated cards and panels)
- `--text-primary`: `#f0f0f4` (off-white for headers and body copy)
- `--text-secondary`: `#a0a0b8` (cool grey for descriptions and metadata)
- `--text-tertiary`: `#7070a0` (dimmed purple-grey for tags)
- `--color-brand-primary`: `#00c9e0` (vibrant cyan accent)

### Category Accents
- Astrophysics Category: `--color-cat-astrophysics` / `--accent-astrophysics` (`#a855f7` / `#a78bfa` - violet)
- Electronics Category: `--color-cat-electronics` / `--accent-electronics` (`#22d3ee` / `#00c9e0` - cyan)
- Physics & Math Category: `--color-cat-physics-math` / `--accent-physics` (`#4ade80` / `#34d399` - emerald)
- Research & Communications: `--color-cat-communications` (`#f472b6` - pink) / `--accent-research` (`#fbbf24` - amber)

### Borders & Focus Styling
- `--border-subtle`: `rgba(255, 255, 255, 0.06)`
- `--border-default`: `rgba(255, 255, 255, 0.10)`
- `--border-emphasis`: `rgba(255, 255, 255, 0.20)`
- `--border-brand`: `rgba(0, 201, 224, 0.40)`
- **Focus Ring**: `*:focus-visible` utilizes `outline: 2px solid var(--color-brand-primary)` with an offset of `2px` to meet WCAG AA standards.

---

## 2. Typography & Fonts
ZeroAbstraction uses a hybrid font configuration designed for readability and monospace styling:
- **Inter (Variable)**: Primary sans-serif font for layouts, headers, and UI controls.
- **Geist Mono (Variable)**: Local monospace web font for code blocks, tags, dates, and mathematical variables.
- **IBM Plex Serif**: Imported for editorial styling.
- **KaTeX / Math Equations**: Inline and display formulas are styled using KaTeX CSS rules to ensure alignment and readability on mobile devices.

---

## 3. Atmospheric Background System
Located in `components/backgrounds/`, each primary category features a unique interactive visual background:
- **`astrophysics-bg.tsx`**: Renders a dark, moving starfield canvas.
- **`electronics-bg.tsx`**: Displays an active oscilloscope sine grid pattern.
- **`physics-bg.tsx`**: Features subtle gravity-well or particle field elements.
- **`projects-bg.tsx`**: A schematic blueprint overlay with technical line grids.
- **`timeline-bg.tsx`**: Renders a vertical path accentuating the chronological events.

> [!IMPORTANT]
> **Performance Safeties**: Background animations are wrapped in a CSS media query that checks `prefers-reduced-motion: reduce`. If active, canvas render loops are skipped to prevent CPU strain and accommodate motion-sensitive users.

---

## 4. Immersive Reading Systems

### Focus Mode (Distraction-Free Reading)
- Triggered by `DistractionFreeToggle.tsx`.
- Sets a global React Context state (`DistractionFreeProvider.tsx`) that hides navigation menus, side rails, the footer, and background graphics.
- Shifts the layout column to an optimized character-per-line width (approx. `65ch`–`75ch`) for distraction-free reading.

### Progressive Reading Mode
- On initial page load, articles display a partial preview using a bottom gradient fade and a call-to-action button.
- Once clicked, client-side scripts swap in the full compiled MDX payload, preserving page load times and optimizing initial HTML sizes.

### Table of Contents (TOC) with Scroll Spy
- The `TableOfContents.tsx` component parses the MDX header tree.
- Uses an `IntersectionObserver` in a custom hook to detect which section is active as the user scrolls.
- An animated indicator line (powered by Framer Motion) slides vertically alongside the list to mark progress.
- A slim reading progress bar (`ReadingProgressBar.tsx`) tracks overall page scroll progress.
