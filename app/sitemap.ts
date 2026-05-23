import { MetadataRoute } from 'next';
import { getAllPosts, VALID_CATEGORIES } from '@/lib/posts';
import { prisma } from '@/lib/db/prisma';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = VALID_CATEGORIES.map((cat) => ({
    url: `${siteUrl}/${cat}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Fetch dynamic research log paths
  const researchLogs = await prisma.researchLog.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

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
    ...researchEntries,
  ];
}
