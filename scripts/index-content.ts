import { prisma } from "@/lib/db/prisma";
import { getAllPosts } from "@/lib/posts";
import { extractTOC } from "@/lib/toc";

import readingTime from "reading-time";

type ContentCategoryEnum =
  | "ELECTRONICS"
  | "ASTROPHYSICS"
  | "PHYSICS_MATH"
  | "RESEARCH_LOGS";

function mapCategoryToEnum(category: string): ContentCategoryEnum {
  switch (category) {
    case "electronics":
      return "ELECTRONICS";
    case "astrophysics":
      return "ASTROPHYSICS";
    case "physics-math":
      return "PHYSICS_MATH";
    case "research-logs":
      return "RESEARCH_LOGS";
    default:
      // Keep a strict mapping to avoid indexing broken content silently.
      throw new Error(`Unknown category: ${category}`);
  }
}

function countWords(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

async function main() {
  const posts = getAllPosts();

  const published = posts.filter((p) => p.published !== false);

  // Upsert posts by slug (slug is unique).
  // NOTE: we intentionally keep the DB index as a "search/materialized metadata view"
  // of the canonical MDX source of truth, to keep authoring simple and search scalable.
  for (const post of published) {
    const rt = readingTime(post.content);
    const headings = extractTOC(post.content).map((h) => ({
      id: h.id,
      text: h.text,
      level: h.level,
    }));

    await prisma.contentPost.upsert({
      where: { slug: post.slug },
      create: {
        title: post.title,
        slug: post.slug,
        description: post.description ?? "",
        content: post.content,
        headings,
        readingTime: Math.max(1, Math.round(rt.minutes)),
        wordCount: countWords(post.content),
        category: mapCategoryToEnum(post.category),
        tags: post.tags ?? [],
        thumbnail: post.thumbnail ?? null,
        thumbnailAlt: post.thumbnailAlt ?? null,
        featured: post.featured ?? false,
        published: post.published ?? true,
        // keep createdAt/updatedAt defaults
      },
      update: {
        title: post.title,
        description: post.description ?? "",
        content: post.content,
        headings,
        readingTime: Math.max(1, Math.round(rt.minutes)),
        wordCount: countWords(post.content),
        category: mapCategoryToEnum(post.category),
        tags: post.tags ?? [],
        thumbnail: post.thumbnail ?? null,
        thumbnailAlt: post.thumbnailAlt ?? null,
        featured: post.featured ?? false,
        published: post.published ?? true,
      },
    });
  }

  // Best-effort cleanup: unpublish DB rows whose MDX no longer exists/published.
  const slugs = new Set(published.map((p) => p.slug));
  const dbSlugs = await prisma.contentPost.findMany({
    select: { slug: true },
  });
  const missing = dbSlugs.filter((x) => !slugs.has(x.slug));
  if (missing.length > 0) {
    await prisma.contentPost.updateMany({
      where: { slug: { in: missing.map((m) => m.slug) } },
      data: { published: false },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

