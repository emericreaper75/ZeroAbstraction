import { getHomepageSections } from "@/lib/homepage/homepage-service";

import Hero from "@/components/hero";
import DomainCards from "@/components/domain-cards";
import FeaturedPosts from "@/components/featured-posts";
import PortfolioGrid from "@/components/portfolio-grid";

import { generateWebSiteJsonLd } from "@/lib/jsonld";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const sections = await getHomepageSections();
  const featuredPosts = sections.find((s) => s.type === "featuredPosts")?.posts ?? [];
  const featuredProjects = sections.find((s) => s.type === "featuredProjects")?.projects ?? [];
  const featuredResearchLogs = sections.find((s) => s.type === "featuredResearchLogs")?.posts ?? [];

  const websiteJsonLd =
    generateWebSiteJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteJsonLd
          ),
        }}
      />

      <Hero />

      <DomainCards />

      <PortfolioGrid
        projects={featuredProjects}
      />

      <FeaturedPosts
        posts={featuredResearchLogs}
        title="Featured Research"
        subtitle="Selected technical reports and thesis logs"
        viewAllLink="/research"
        viewAllText="View all research logs"
      />
    </>
  );
}