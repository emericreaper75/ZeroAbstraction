import { Metadata } from 'next';
import TimelineFilter from '@/components/TimelineFilter';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'A chronological record of publications, project milestones, field campaigns, and academic achievements.',
};

export default function TimelinePage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-xl">
        <header className="mb-12 max-w-prose">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-600">
            Chronology
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-100 sm:text-4xl">
            Timeline
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-400">
            Publications, project milestones, experimental campaigns, and other
            significant events — in reverse chronological order.
          </p>
        </header>

        <div className="max-w-2xl">
          <TimelineFilter />
        </div>
      </div>
    </div>
  );
}
