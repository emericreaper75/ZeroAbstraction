/**
 * Legacy Post types.
 *
 * These types define the shape consumed by public rendering components
 * (ArticleCard, ArticleLayout, etc.). The actual data now comes from Prisma
 * via lib/public/content-posts.ts and is adapted through
 * lib/public/legacy-post-adapter.ts.
 *
 * The filesystem-based MDX read functions that previously lived here have been
 * removed. Content is now exclusively managed through Prisma (admin CRUD)
 * and optionally synced via scripts/index-content.ts.
 */

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  slug: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  featured?: boolean;
  published?: boolean;
};

export type Post = PostFrontmatter & {
  readingTime: string;
  content: string;
};

/**
 * Valid URL-safe category route segments.
 * These map to ContentCategory enum values via CATEGORY_ROUTE_TO_ENUM.
 */
export const VALID_CATEGORIES = [
  'electronics',
  'astrophysics',
  'physics-math',
  'communications',
] as const;

export type Category = (typeof VALID_CATEGORIES)[number];
