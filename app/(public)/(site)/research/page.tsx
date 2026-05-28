import { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import PageHeader from '@/components/page-header';
import ResearchBg from '@/components/backgrounds/research-bg';
import ComingSoonBanner from '@/components/ComingSoonBanner';
import ArticleCard from '@/components/ArticleCard';
import readingTime from 'reading-time';

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: 'Research Logs',
  description: 'Technical notebook: logs, reports, and academic thesis summaries.',
};

export default async function ResearchListPage() {
  const logs = await prisma.researchLog.findMany({
    where: { published: true },
    orderBy: { entryNumber: 'desc' },
  });

  // Map database logs to the legacy Post structure for compatibility with ArticleCard
  const posts = logs.map((log) => ({
    title: log.title,
    slug: log.slug,
    description: log.abstract ?? '',
    category: 'research',
    tags: log.tags,
    date: log.createdAt.toISOString(),
    readingTime: readingTime(log.content ?? '').text,
    content: log.content ?? '',
    published: log.published,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ResearchBg />
      
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050810] to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <PageHeader 
            label="RESEARCH"
            title="Research Logs"
            subtitle="Technical notebook: logs, reports, and academic thesis summaries."
            accentColor="amber"
            count={posts.length}
            countLabel="logs"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard
                key={post.slug}
                post={post}
                showCategory={false}
              />
            ))}
            {posts.length < 6 && (
              <ComingSoonBanner count={6 - posts.length} category="research" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
