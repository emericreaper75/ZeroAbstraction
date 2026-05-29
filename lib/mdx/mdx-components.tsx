import React from 'react';
import CopyButton from '@/components/CopyButton';
import HeadingWithAnchor from '@/components/mdx/HeadingWithAnchor';
import { Surface } from '@/components/ui/surface';
import { Figure } from '@/components/mdx/figure';
import { Equation } from '@/components/mdx/equation';
import { Footnote, FootnoteList } from '@/components/mdx/footnotes';
import { Sidenote } from '@/components/mdx/sidenote';
import { CodeAnnotation, AnnotationBubble } from '@/components/mdx/code-annotation';
import { LightboxImage } from '@/components/ui/lightbox-image';

// Case Study Components
import { TechStack, TechCategory, TechItem } from '@/components/mdx/case-study/tech-stack';
import { Challenge, Tradeoff, OptimizationOutcome } from '@/components/mdx/case-study/narrative-blocks';
import { SystemArchitecture, ArchitectureContent, ArchitectureSidebar, InfrastructureOverview } from '@/components/mdx/case-study/architecture-section';
import { MetricsGrid, MetricCard } from '@/components/mdx/case-study/metrics-grid';

// New Case Study Architecture Components
import { CaseStudyLayout } from '@/components/case-study/case-study-layout';
import { ExecutiveSummary } from '@/components/case-study/executive-summary';
import { ProblemContext } from '@/components/case-study/problem-context';
import { RequirementsConstraints } from '@/components/case-study/requirements-constraints';
import { ArchitectureOverview } from '@/components/case-study/architecture-overview';
import { TechnicalDecisions, TechnicalDecision } from '@/components/case-study/technical-decisions';
import { ImplementationJourney, JourneyMilestone } from '@/components/case-study/implementation-journey';
import { ChallengesFailures, ChallengeFailure } from '@/components/case-study/challenges-failures';
import { BenchmarksResults } from '@/components/case-study/benchmarks-results';
import { LessonsLearned, Lesson } from '@/components/case-study/lessons-learned';
import { FutureDirections } from '@/components/case-study/future-directions';
import { ArchitectureDiagram } from '@/components/case-study/architecture-diagram';

/** Extract language label from className like "language-typescript" → "TS" */
function getLangLabel(className?: string): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  if (!match) return null;
  const lang = match[1];
  const shortNames: Record<string, string> = {
    typescript: 'TS', javascript: 'JS', python: 'PY', bash: 'SH', shell: 'SH',
    sh: 'SH', tsx: 'TSX', jsx: 'JSX', css: 'CSS', html: 'HTML', json: 'JSON',
    yaml: 'YAML', yml: 'YAML', sql: 'SQL', rust: 'RS', go: 'GO', cpp: 'C++',
    c: 'C', java: 'JAVA', ruby: 'RB', php: 'PHP', swift: 'SWIFT', kotlin: 'KT',
    scala: 'SCALA', r: 'R', matlab: 'MATLAB', latex: 'TEX', tex: 'TEX',
    markdown: 'MD', mdx: 'MDX', graphql: 'GQL', dockerfile: 'DOCKER',
  };
  return shortNames[lang.toLowerCase()] ?? lang.toUpperCase();
}

export const mdxComponents = {
  // ─── Headings ───────────────────────────────────────────────────────────────
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={1} {...props} />,
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={2} {...props} />,
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={3} {...props} />,
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => <HeadingWithAnchor level={4} {...props} />,

  // ─── Images → Lightbox ──────────────────────────────────────────────────────
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <LightboxImage
      src={props.src}
      alt={props.alt}
      caption={props.title}
    />
  ),

  // ─── Code Blocks ────────────────────────────────────────────────────────────
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement> & { 'data-raw-code'?: string }) => {
    const codeEl = (children as React.ReactElement)?.props;
    const langLabel = getLangLabel(codeEl?.className);
    const rawCode = props['data-raw-code'] || '';

    return (
      <div className="group relative my-10 w-full max-w-full overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-b from-[#0a0a0f] to-[#05050a] shadow-[0_8px_30px_rgb(0,0,0,0.5)]">
        {/* Subtle top highlight for depth */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 bg-white/[0.02] border-b border-white/[0.08] select-none backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.4)]" />
            <span className="font-mono text-[11px] font-medium tracking-[0.15em] text-zinc-400 uppercase">
              {langLabel || 'TEXT'}
            </span>
          </div>
          <CopyButton code={rawCode} />
        </div>

        {/* Scrollable code area */}
        <div
          className="overflow-x-auto w-full [scrollbar-width:thin] scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
        >
          <pre
            className="font-mono text-[13px] sm:text-[14px] leading-[1.75] text-zinc-200 px-6 py-6 min-w-full block"
            {...props}
          >
            {children}
          </pre>
        </div>
      </div>
    );
  },

  // ─── Blockquote ─────────────────────────────────────────────────────────────
  blockquote: ({ children }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="my-8 border-l-2 border-cyan-500/40 bg-cyan-500/5 py-4 pl-5 pr-4 text-zinc-300 italic leading-relaxed rounded-r-lg">
      <div className="not-italic font-mono text-[10px] uppercase tracking-widest text-cyan-500/70 mb-2">Note</div>
      {children}
    </blockquote>
  ),

  // ─── Horizontal Rule ─────────────────────────────────────────────────────────
  hr: () => (
    <div className="my-12 flex items-center gap-4">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <span className="text-zinc-700 text-xs font-mono">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-700 to-transparent" />
    </div>
  ),

  // ─── Tables ──────────────────────────────────────────────────────────────────
  table: ({ children }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 w-full overflow-x-auto rounded-xl" style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
      <Surface variant="glass" padding="none" className="overflow-hidden">
        <table className="min-w-max w-full border-collapse text-sm text-zinc-200">
          {children}
        </table>
      </Surface>
    </div>
  ),
  thead: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="bg-zinc-900/60 border-b border-zinc-700/50">{children}</thead>
  ),
  tbody: ({ children }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y divide-zinc-800/50">{children}</tbody>
  ),
  tr: ({ children }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-zinc-800/30 transition-colors duration-150">{children}</tr>
  ),
  th: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="px-5 py-3.5 text-left font-mono text-[10px] uppercase tracking-widest text-zinc-400 font-medium whitespace-nowrap">{children}</th>
  ),
  td: ({ children }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="px-5 py-3 text-zinc-300 leading-relaxed">{children}</td>
  ),

  // ─── Reading Systems — available in all MDX articles ──────────────────────
  Figure,
  Equation,
  Footnote,
  FootnoteList,
  Sidenote,
  CodeAnnotation,
  AnnotationBubble,

  // ─── Case Study Systems ──────────────────────────────────────────────────────
  TechStack,
  TechCategory,
  TechItem,
  Challenge,
  Tradeoff,
  OptimizationOutcome,
  SystemArchitecture,
  ArchitectureContent,
  ArchitectureSidebar,
  InfrastructureOverview,
  MetricsGrid,
  MetricCard,

  // ─── New Case Study Architecture ─────────────────────────────────────────────
  CaseStudyLayout,
  ExecutiveSummary,
  ProblemContext,
  RequirementsConstraints,
  ArchitectureOverview,
  TechnicalDecisions,
  TechnicalDecision,
  ImplementationJourney,
  JourneyMilestone,
  ChallengesFailures,
  ChallengeFailure,
  BenchmarksResults,
  LessonsLearned,
  Lesson,
  FutureDirections,
  ArchitectureDiagram,
};
