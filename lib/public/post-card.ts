import type { ContentPost } from "@prisma/client";

export type PublicPostCard = Pick<ContentPost, "id" | "title" | "slug" | "description" | "tags" | "category" | "featured" | "published" | "createdAt"> & {
  routeCategory: string;
  readingTime: string;
  date: string;
};

