import React from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelineYearMilestoneProps {
  year: string;
  entryCount: number;
  /** Hex/CSS colours of the domains active in this year */
  domainColors: string[];
}

/**
 * Year milestone separator in the research timeline.
 * Renders the year prominently with a domain colour palette
 * showing which research areas were active during that period.
 */
export default function TimelineYearMilestone({
  year,
  entryCount,
  domainColors,
}: TimelineYearMilestoneProps) {
  return (
    <div
      className="relative flex items-center justify-between gap-6 my-10 select-none"
      role="separator"
      aria-label={`Year ${year} — ${entryCount} milestone${entryCount !== 1 ? 's' : ''}`}
    >
      {/* Left hairline */}
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800/80 to-zinc-800" />

      {/* Year label + domain dots */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Domain colour palette */}
        <div className="flex items-center gap-1" aria-hidden="true">
          {domainColors.slice(0, 4).map((color, i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full opacity-70"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        {/* Year */}
        <span className="font-mono text-sm font-medium text-zinc-500 tabular-nums tracking-wider">
          {year}
        </span>

        {/* Entry count */}
        <span className="font-mono text-[9px] text-zinc-700 tabular-nums">
          {entryCount} {entryCount === 1 ? 'milestone' : 'milestones'}
        </span>
      </div>

      {/* Right hairline */}
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-800/80 to-zinc-800" />
    </div>
  );
}
