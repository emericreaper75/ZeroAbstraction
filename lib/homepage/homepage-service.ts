import "server-only";

import type { HomepageSection } from "@/lib/homepage/types";
import { optionalCacheGet, optionalCacheSet } from "@/lib/cache/optional-cache";
import { listPublishedPosts } from "@/lib/public/content-posts";
import { getFeaturedProjects } from "@/lib/projects/get-featured-projects";

const CACHE_KEY = "homepage:v1";

export async function getHomepageSections(): Promise<HomepageSection[]> {
  const cached = await optionalCacheGet<HomepageSection[]>(CACHE_KEY);
  if (cached) return cached;

  const [featuredPosts, latestPosts, featuredProjects] = await Promise.all([
    listPublishedPosts({ featuredOnly: true, take: 6 }),
    listPublishedPosts({ take: 6 }),
    getFeaturedProjects(),
  ]);

  const sections: HomepageSection[] = [
    { type: "featuredPosts", title: "Featured Articles", posts: featuredPosts.slice(0, 3) },
    { type: "latestPosts", title: "Latest Articles", posts: latestPosts.slice(0, 6) },
    { type: "featuredProjects", title: "Featured Projects", projects: featuredProjects },
  ];

  await optionalCacheSet(CACHE_KEY, sections, 60);
  return sections;
}

