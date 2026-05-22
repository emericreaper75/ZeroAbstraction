# MDX Rendering Architecture

* **Hybrid Progressive Rendering**: MDX content uses a Server-Side splitting architecture (`lib/mdx/split.ts`). It is not just statically rendered.
* **Frontmatter Parsing**: `gray-matter` parses `previewSections` from the database MDX string to determine where to slice the content on the server.
* **Flight Stream Optimization**: The `remainingContent` is passed as a React Node payload via the Next.js Flight stream but remains unmounted in the DOM until the user toggles "Focus Mode".
* **Decoupled Layouts**: `ProjectLayout.tsx` and `ArticleLayout.tsx` are Client Components that manage the visual expansion (width) and progressive mounting of the `remainingContent`, consuming state from `DistractionFreeProvider`.
* **Database Role**: Prisma queries retrieve the raw MDX string, but the filesystem/MDX string remains the source of truth for the structural content.
