import { Metadata } from 'next';
import TimelineFilter from '@/components/TimelineFilter';
import TimelineBg from '@/components/backgrounds/timeline-bg';
import PageHeader from '@/components/page-header';
import { FadeIn } from '@/components/animations/fade-in';
import { getTimelineEntriesWithValidation } from '@/lib/timeline-server';

export const dynamic = "force-dynamic";
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'A chronological record of publications, project milestones, field campaigns, and academic achievements.',
};

export default async function TimelinePage() {
  // Server-side: validate all timeline entry hrefs against the live DB.
  // Entries whose linked content does not exist (or is unpublished) will
  // have their `href` stripped — preventing 404s on the client.
  const validatedEntries = await getTimelineEntriesWithValidation();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <TimelineBg />

      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050810] to-transparent z-0 pointer-events-none" />



      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl flex flex-col items-center text-center">
          <FadeIn>
            <PageHeader 
              label="CHRONOLOGY"
              title="Timeline"
              subtitle="Publications, project milestones, experimental campaigns, and other significant events — in reverse chronological order."
              accentColor="cyan"
            />
          </FadeIn>

          <div className="max-w-2xl w-full text-left mt-8">
            <FadeIn delay={0.2}>
              <TimelineFilter entries={validatedEntries} />
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

