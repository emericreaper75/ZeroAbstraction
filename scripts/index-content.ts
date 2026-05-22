import { prisma } from "@/lib/db/prisma";
import { getAllPosts } from "@/lib/posts";
import { extractTOC } from "@/lib/toc";
import { ContentCategory } from "@/lib/editorial/categories";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import readingTime from "reading-time";

function mapCategoryToEnum(category: string): ContentCategory {
  switch (category) {
    case "electronics":
      return "ELECTRONICS" as ContentCategory;
    case "astrophysics":
      return "ASTROPHYSICS" as ContentCategory;
    case "physics-math":
      return "PHYSICS_MATH" as ContentCategory;
    case "communications":
      return "COMMUNICATIONS" as ContentCategory;
    default:
      // Keep a strict mapping to avoid indexing broken content silently.
      throw new Error(`Unknown category: ${category}`);
  }
}

function countWords(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean);
  return words.length;
}

async function indexResearchLogs() {
  console.log("Indexing research logs...");
  const researchDir = path.join(process.cwd(), "content", "research-logs");
  if (!fs.existsSync(researchDir)) {
    console.log("No research-logs directory found.");
    return;
  }

  const files = fs.readdirSync(researchDir).filter((f) => f.endsWith(".mdx"));
  const slugs = new Set<string>();

  for (const file of files) {
    const filePath = path.join(researchDir, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const slug = data.slug || path.basename(file, ".mdx");
    slugs.add(slug);

    // Determine entry number
    let entryNumber = 0;
    const fileMatch = file.match(/^(\d+)/);
    if (fileMatch) {
      entryNumber = parseInt(fileMatch[1], 10);
    } else {
      const titleMatch = (data.title || "").match(/#(\d+)/);
      if (titleMatch) {
        entryNumber = parseInt(titleMatch[1], 10);
      }
    }

    // Determine series
    let series = "Signal Processing";
    if ((data.title || "").toLowerCase().includes("thesis")) {
      series = "Communications Theory";
    }

    const published = data.published !== false;
    const tags = data.tags || [];

    await prisma.researchLog.upsert({
      where: { slug },
      create: {
        entryNumber,
        title: data.title || "Untitled Research Log",
        slug,
        series,
        abstract: data.description || null,
        content: content || null,
        tags,
        published,
      },
      update: {
        entryNumber,
        title: data.title || "Untitled Research Log",
        series,
        abstract: data.description || null,
        content: content || null,
        tags,
        published,
        updatedAt: new Date(),
      },
    });
  }

  // Cleanup: unpublish or delete DB logs that no longer exist in filesystem
  const dbLogs = await prisma.researchLog.findMany({ select: { slug: true } });
  const missing = dbLogs.filter((x) => !slugs.has(x.slug));
  if (missing.length > 0) {
    await prisma.researchLog.updateMany({
      where: { slug: { in: missing.map((m) => m.slug) } },
      data: { published: false },
    });
  }
  console.log(`Successfully indexed ${files.length} research logs.`);
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
  const missing = dbSlugs.filter((x: { slug: string }) => !slugs.has(x.slug));
  if (missing.length > 0) {
    await prisma.contentPost.updateMany({
      where: { slug: { in: missing.map((m: { slug: string }) => m.slug) } },
      data: { published: false },
    });
  }

  // Index research logs
  await indexResearchLogs();
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


