import type { ContentPost } from "@prisma/client";
import readingTime from "reading-time";
import type { Post } from "@/lib/posts";

export function contentPostToLegacyPost(input: {
  post: ContentPost;
  routeCategory: string;
}): Post {
  const stats = readingTime(input.post.content ?? "");
  return {
    title: input.post.title,
    date: input.post.createdAt.toISOString(),
    description: input.post.description ?? "",
    tags: input.post.tags ?? [],
    category: input.routeCategory,
    slug: input.post.slug,
    readingTime: stats.text,
    content: input.post.content ?? "",
    thumbnail: input.post.thumbnail ?? undefined,
    thumbnailAlt: input.post.thumbnailAlt ?? undefined,
    featured: input.post.featured ?? false,
    published: input.post.published ?? false,
  };
}

