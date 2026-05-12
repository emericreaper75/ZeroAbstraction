import "server-only";

import { prisma } from "@/lib/db/prisma";
import type { ContentCategory } from "@prisma/client";
import { CATEGORY_ENUM_TO_ROUTE } from "@/lib/editorial/categories";
import type { PublicPostCard } from "@/lib/public/post-card";
import readingTime from "reading-time";

export async function listPublishedPosts(input?: {
  category?: ContentCategory;
  take?: number;
  skip?: number;
  featuredOnly?: boolean;
}) {
  const posts = await prisma.contentPost.findMany({
    where: {
      published: true,
      ...(input?.featuredOnly ? { featured: true } : {}),
      ...(input?.category ? { category: input.category } : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
    take: input?.take,
    skip: input?.skip,
  });

  return posts.map(
    (p): PublicPostCard => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      tags: p.tags,
      category: p.category,
      featured: p.featured,
      published: p.published,
      createdAt: p.createdAt,
      routeCategory: CATEGORY_ENUM_TO_ROUTE[p.category],
      readingTime: readingTime(p.content ?? "").text,
      date: p.createdAt.toISOString(),
    })
  );
}

export async function getPublishedPostByCategoryAndSlug(input: {
  category: ContentCategory;
  slug: string;
}) {
  return prisma.contentPost.findFirst({
    where: {
      published: true,
      category: input.category,
      slug: input.slug,
    },
  });
}

