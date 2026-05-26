import React from 'react';

// ─── Equation Component ───────────────────────────────────────────────────────

interface EquationProps {
  children: React.ReactNode;
  /** Display number, e.g. 1, 2, "3.1", "A.2" */
  number?: string | number;
  /** Text label rendered above or beside the equation, e.g. "Maxwell's Equations" */
  label?: string;
  /** ID for anchor links and cross-references */
  id?: string;
}

/**
 * Publication-grade numbered equation block for MDX articles.
 * Wraps KaTeX display math with a right-aligned equation number
 * and optional label, matching journal / textbook conventions.
 *
 * Usage in MDX:
 *   <Equation number="1" label="Schrödinger Equation" id="eq-schrodinger">
 *     $$i\hbar\frac{\partial}{\partial t}\Psi = \hat{H}\Psi$$
 *   </Equation>
 */
export function Equation({ children, number, label, id }: EquationProps) {
  return (
    <div
      id={id}
      className="equation-block group relative my-8 scroll-mt-28"
      role="math"
      aria-label={label ?? `Equation ${number ?? ''}`}
    >
      {/* Optional label above equation */}
      {label && (
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          {label}
        </p>
      )}

      {/* Equation row: content + number */}
      <div className="flex items-center gap-4">
        {/* Math content — overflow-safe horizontal scroll */}
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden equation-scroll py-1">
          {children}
        </div>

        {/* Equation number — right-aligned, journal style */}
        {number !== undefined && (
          <div className="shrink-0 font-mono text-sm text-zinc-500 tabular-nums pl-4">
            ({number})
          </div>
        )}
      </div>

      {/* Anchor link for cross-references */}
      {id && (
        <a
          href={`#${id}`}
          className="absolute -left-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-zinc-600 hover:text-cyan-400 font-mono text-xs"
          aria-label={`Link to equation ${number ?? id}`}
        >
          §
        </a>
      )}
    </div>
  );
}

export default Equation;
