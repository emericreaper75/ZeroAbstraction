import { Metadata } from 'next';
import TimelineFilter from '@/components/TimelineFilter';
import TimelineBg from '@/components/backgrounds/timeline-bg';
import PageHeader from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'A chronological record of publications, project milestones, field campaigns, and academic achievements.',
};

export default function TimelinePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <TimelineBg />

      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050810] to-transparent z-0 pointer-events-none" />

      {/* Glowing CSS vertical line from header to entries */}
      <div className="absolute left-1/2 top-0 h-64 w-px -translate-x-1/2 bg-gradient-to-b from-cyan-500/0 via-cyan-500/20 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.3)] z-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl flex flex-col items-center text-center">
          <PageHeader 
            label="CHRONOLOGY"
            title="Timeline"
            subtitle="Publications, project milestones, experimental campaigns, and other significant events — in reverse chronological order."
            accentColor="cyan"
          />

          <div className="max-w-2xl w-full text-left mt-8">
            <TimelineFilter />
          </div>
        </div>
      </div>
    </div>
  );
}
