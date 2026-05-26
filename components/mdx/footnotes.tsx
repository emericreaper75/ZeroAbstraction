'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FootnoteEntry {
  id: string;
  content: React.ReactNode;
  index: number;
}

interface FootnoteContextValue {
  register: (id: string, content: React.ReactNode) => number;
  entries: FootnoteEntry[];
}

// ─── Context ──────────────────────────────────────────────────────────────────

const FootnoteContext = createContext<FootnoteContextValue>({
  register: () => 0,
  entries: [],
});

export function useFootnotes() {
  return useContext(FootnoteContext);
}

// ─── Provider ─────────────────────────────────────────────────────────────────

/**
 * Wraps the MDX article content and collects all <Footnote> registrations.
 * Must be a Client Component to maintain the registry across renders.
 */
export function FootnoteProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState<FootnoteEntry[]>([]);
  const counterRef = useRef(0);
  const registryRef = useRef<Map<string, number>>(new Map());

  const register = useCallback((id: string, content: React.ReactNode): number => {
    if (registryRef.current.has(id)) {
      return registryRef.current.get(id)!;
    }
    counterRef.current += 1;
    const index = counterRef.current;
    registryRef.current.set(id, index);
    setEntries((prev) => [...prev, { id, content, index }]);
    return index;
  }, []);

  return (
    <FootnoteContext.Provider value={{ register, entries }}>
      {children}
    </FootnoteContext.Provider>
  );
}

// ─── Inline Footnote Marker ────────────────────────────────────────────────────

interface FootnoteProps {
  id: string;
  children: React.ReactNode;
}

/**
 * Inline citation marker. Renders a superscript [n] linked to the footnote list.
 * Usage in MDX: <Footnote id="my-note">Full footnote text here.</Footnote>
 */
export function Footnote({ id, children }: FootnoteProps) {
  const { register } = useFootnotes();
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const n = register(id, children);
    setIndex(n);
  }, [id, children, register]);

  if (index === null) return null;

  return (
    <a
      href={`#fn-${id}`}
      id={`fnref-${id}`}
      aria-label={`Footnote ${index}`}
      aria-describedby={`fn-${id}`}
      className="footnote-ref inline-block align-super text-[0.65em] leading-none font-mono text-cyan-400/80 hover:text-cyan-300 border border-cyan-500/20 bg-cyan-500/5 rounded px-1 py-px mx-0.5 transition-colors duration-150 no-underline"
    >
      {index}
    </a>
  );
}

// ─── Footnote List ─────────────────────────────────────────────────────────────

/**
 * Renders collected footnotes at the bottom of an article.
 * Place at the end of the article's prose block.
 */
export function FootnoteList() {
  const { entries } = useFootnotes();

  if (entries.length === 0) return null;

  return (
    <aside
      aria-label="Footnotes"
      className="mt-16 pt-8 border-t border-zinc-800/50"
    >
      {/* Header */}
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500 mb-6">
        Notes & References
      </p>

      <ol className="space-y-4">
        {entries.map(({ id, content, index }) => (
          <li
            key={id}
            id={`fn-${id}`}
            className="group flex gap-4 items-start"
          >
            {/* Number badge */}
            <span className="shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center rounded font-mono text-[10px] text-cyan-400/70 bg-cyan-500/8 border border-cyan-500/15">
              {index}
            </span>

            {/* Content */}
            <span className="text-sm text-zinc-400 leading-relaxed">
              {content}
              {/* Backlink */}
              <a
                href={`#fnref-${id}`}
                aria-label={`Back to reference ${index}`}
                className="inline-block ml-2 text-zinc-600 hover:text-cyan-400 transition-colors duration-150 font-mono text-xs"
              >
                ↩
              </a>
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
