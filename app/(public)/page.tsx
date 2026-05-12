import { getHomepageSections } from "@/lib/homepage/homepage-service";

import Hero from "@/components/hero";
import DomainCards from "@/components/domain-cards";
import FeaturedPosts from "@/components/featured-posts";
import PortfolioGrid from "@/components/portfolio-grid";

import { generateWebSiteJsonLd } from "@/lib/jsonld";

export default async function HomePage() {
  const sections = await getHomepageSections();
  const featuredPosts = sections.find((s) => s.type === "featuredPosts")?.posts ?? [];
  const featuredProjects = sections.find((s) => s.type === "featuredProjects")?.projects ?? [];

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

      <FeaturedPosts
        posts={featuredPosts}
      />

      <PortfolioGrid
        projects={featuredProjects}
      />
    </>
  );
}