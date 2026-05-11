import { getAllPosts } from "@/lib/posts";

import { getFeaturedProjects } from "@/lib/projects/get-featured-projects";

import Hero from "@/components/hero";
import DomainCards from "@/components/domain-cards";
import FeaturedPosts from "@/components/featured-posts";
import PortfolioGrid from "@/components/portfolio-grid";

import { generateWebSiteJsonLd } from "@/lib/jsonld";

export default async function HomePage() {
  const allPosts = getAllPosts();

  const featuredPosts =
    allPosts.slice(0, 3);

  const featuredProjects =
    await getFeaturedProjects();

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