import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostsByCategory, VALID_CATEGORIES } from '@/lib/posts';
import { generateCategoryMetadata } from '@/lib/metadata';
import ArticleCard from '@/components/ArticleCard'; // Keeping original article card per instructions
import PageHeader from '@/components/page-header';
import ElectronicsBg from '@/components/backgrounds/electronics-bg';
import AstrophysicsBg from '@/components/backgrounds/astrophysics-bg';
import PhysicsBg from '@/components/backgrounds/physics-bg';
import ResearchBg from '@/components/backgrounds/research-bg';

type Props = { params: { category: string } };

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID_CATEGORIES.includes(params.category as (typeof VALID_CATEGORIES)[number])) {
    return {};
  }
  const posts = getPostsByCategory(params.category);
  return generateCategoryMetadata(params.category, posts.length);
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
    case 'research-logs':
      return {
        label: "CATEGORY",
        title: "Research Logs",
        subtitle: "Experimental notes, field campaigns, sensor data analysis, and ongoing investigation threads.",
        accentColor: "amber" as const,
        BgComponent: ResearchBg,
      };
    default:
      return null;
  }
};

export default function CategoryPage({ params }: Props) {
  if (!VALID_CATEGORIES.includes(params.category as (typeof VALID_CATEGORIES)[number])) {
    notFound();
  }

  const posts = getPostsByCategory(params.category);
  const config = getCategoryConfig(params.category);

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
              {posts.map((post) => (
                <ArticleCard key={post.slug} post={post} showCategory={false} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-neutral-500">No articles in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
