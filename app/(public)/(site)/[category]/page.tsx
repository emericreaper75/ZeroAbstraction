import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import { ContentCategory, CATEGORY_ROUTE_TO_ENUM } from '@/lib/editorial/categories';
import ArticleCard from '@/components/ArticleCard'; // Keeping original article card per instructions
import PageHeader from '@/components/page-header';
import ElectronicsBg from '@/components/backgrounds/electronics-bg';
import AstrophysicsBg from '@/components/backgrounds/astrophysics-bg';
import PhysicsBg from '@/components/backgrounds/physics-bg';
import ResearchBg from '@/components/backgrounds/research-bg';
import { contentPostToLegacyPost } from '@/lib/public/legacy-post-adapter';
import ComingSoonBanner from '@/components/ComingSoonBanner';

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return {
    title: category,
  };
}

const getCategoryConfig = (category: string) => {
  switch (category) {
    case 'electronics':
      return {
        label: "CATEGORY",
        title: "Electronics & Communications",
        subtitle: "Signal processing, circuits, RF systems, embedded design, and communications theory.",
        accentColor: "cyan" as const,
        BgComponent: ElectronicsBg,
      };
    case 'astrophysics':
      return {
        label: "CATEGORY",
        title: <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Astrophysics</span>,
        subtitle: "Cosmology, stellar physics, gravitational waves, dark matter, and observational methods.",
        accentColor: "violet" as const,
        BgComponent: AstrophysicsBg,
      };
    case 'physics-math':
      return {
        label: "CATEGORY",
        title: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Physics & Mathematics</span>,
        subtitle: "Quantum mechanics, electrodynamics, analysis, differential geometry, and mathematical physics.",
        accentColor: "emerald" as const,
        BgComponent: PhysicsBg,
      };
    case 'communications':
      return {
        label: "CATEGORY",
        title: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Communications</span>,
        subtitle: "Signal theory, information systems, communication protocols, and network engineering.",
        accentColor: "cyan" as const,
        BgComponent: ResearchBg,
      };
    default:
      return null;
  }
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryEnum = CATEGORY_ROUTE_TO_ENUM[category] as ContentCategory | undefined;
  if (!categoryEnum) notFound();

  const posts = await prisma.contentPost.findMany({
    where: { published: true, category: categoryEnum },
    orderBy: { createdAt: 'desc' },
  });
  const config = getCategoryConfig(category);

  if (!config) {
    return notFound();
  }

  const { label, title, subtitle, accentColor, BgComponent } = config;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BgComponent />
      
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050810] to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <PageHeader 
            label={label}
            title={title}
            subtitle={subtitle}
            accentColor={accentColor}
            count={posts.length}
            countLabel="articles"
          />

          {posts.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <ArticleCard
                  key={post.slug}
                  post={contentPostToLegacyPost({
                    post,
                    routeCategory: category,
                  })}
                  showCategory={false}
                />
              ))}
              {posts.length < 6 && (
                <ComingSoonBanner count={6 - posts.length} category={category} />
              )}
            </div>
          ) : (
            <div style={{ minHeight: 'calc(100vh - 64px - 200px)' }} className="flex items-center justify-center">
              <div className="w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <ComingSoonBanner count={6} category={category} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

