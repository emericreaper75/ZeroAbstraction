import "server-only";

import type { HomepageSection } from "@/lib/homepage/types";
import { optionalCacheGet, optionalCacheSet } from "@/lib/cache/optional-cache";
import { listPublishedPosts } from "@/lib/public/content-posts";
import { getFeaturedProjects } from "@/lib/projects/get-featured-projects";
import { prisma } from "@/lib/db/prisma";
import readingTime from "reading-time";

const CACHE_KEY = "homepage:v1";

export async function getHomepageSections(): Promise<HomepageSection[]> {
  const cached = await optionalCacheGet<HomepageSection[]>(CACHE_KEY);
  if (cached) return cached;

  const [featuredPosts, latestPosts, featuredProjects, featuredResearchRaw] = await Promise.all([
    listPublishedPosts({ featuredOnly: true, take: 6 }),
    listPublishedPosts({ take: 6 }),
    getFeaturedProjects(),
    prisma.researchLog.findMany({
      where: { published: true, featured: true },
      orderBy: { entryNumber: "desc" },
      take: 3,
    }),
  ]);

  const featuredResearchLogs = featuredResearchRaw.map((log) => ({
    id: log.id,
    title: log.title,
    slug: log.slug,
    description: log.abstract ?? "",
    category: "COMMUNICATIONS" as any,
    routeCategory: "research",
    tags: log.tags,
    featured: log.featured,
    published: log.published,
    createdAt: log.createdAt,
    date: log.createdAt.toISOString(),
    readingTime: readingTime(log.content ?? "").text,
  }));

  const sections: HomepageSection[] = [
    { type: "featuredPosts", title: "Featured Articles", posts: featuredPosts.slice(0, 3) },
    { type: "latestPosts", title: "Latest Articles", posts: latestPosts.slice(0, 6) },
    { type: "featuredProjects", title: "Featured Projects", projects: featuredProjects },
    { type: "featuredResearchLogs", title: "Featured Research", posts: featuredResearchLogs },
  ];

  await optionalCacheSet(CACHE_KEY, sections, 60);
  return sections;
}

