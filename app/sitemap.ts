import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db/prisma';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published content from Prisma (single source of truth)
  const [contentPosts, projects, researchLogs] = await Promise.all([
    prisma.contentPost.findMany({
      where: { published: true },
      select: { slug: true, category: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
    prisma.researchLog.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    }),
  ]);

  const postEntries: MetadataRoute.Sitemap = contentPosts.map((post) => ({
    url: `${siteUrl}/${CATEGORY_ENUM_TO_ROUTE[post.category]}/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = Object.values(CATEGORY_ENUM_TO_ROUTE).map((cat) => ({
    url: `${siteUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: project.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const researchEntries: MetadataRoute.Sitemap = researchLogs.map((log) => ({
    url: `${siteUrl}/research/${log.slug}`,
    lastModified: log.updatedAt,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/research`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/timeline`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    ...categoryEntries,
    ...postEntries,
    ...projectEntries,
    ...researchEntries,
  ];
}
