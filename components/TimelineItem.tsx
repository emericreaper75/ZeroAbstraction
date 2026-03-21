import { TimelineEntry } from '@/lib/timeline';
import { formatDate } from '@/lib/utils';

const categoryColors: Record<string, string> = {
  electronics: 'bg-amber-500',
  astrophysics: 'bg-violet-500',
  'physics-math': 'bg-sky-500',
  research: 'bg-emerald-500',
  academic: 'bg-rose-500',
};

type Props = { entry: TimelineEntry; isLast?: boolean };

export default function TimelineItem({ entry, isLast = false }: Props) {
  const dotColor = categoryColors[entry.category] ?? 'bg-neutral-500';

  return (
    <div className="relative flex gap-6 pb-10">
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-[11px] top-6 h-full w-px bg-neutral-800" />
      )}

      {/* Dot */}
      <div className={`relative mt-1 h-5 w-5 shrink-0 rounded-full ${dotColor} ring-4 ring-neutral-950`} />

      {/* Content */}
      <div className="min-w-0 flex-1 rounded-lg border border-neutral-800 bg-neutral-900/50 p-5 transition-colors hover:border-neutral-700">
        <time className="font-mono text-xs text-neutral-600">{formatDate(entry.date)}</time>
        <h3 className="mt-1 font-serif text-base font-semibold text-neutral-100">{entry.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">{entry.description}</p>
        {entry.tags && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-700 px-2 py-0.5 font-mono text-[11px] text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
