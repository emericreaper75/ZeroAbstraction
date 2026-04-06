import { getAllPosts } from '@/lib/posts';
import { projects } from '@/lib/projects';
import Hero from '@/components/hero';
import DomainCards from '@/components/domain-cards';
import FeaturedPosts from '@/components/featured-posts';
import PortfolioGrid from '@/components/portfolio-grid';
import { generateWebSiteJsonLd } from '@/lib/jsonld';

export default function HomePage() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.slice(0, 3);
  const topProjects = projects.filter((p) => p.status === 'active' || p.status === 'completed').slice(0, 4);

  const websiteJsonLd = generateWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Hero />
      <DomainCards />
      <FeaturedPosts posts={featuredPosts} />
      <PortfolioGrid projects={topProjects} />
    </>
  );
}
