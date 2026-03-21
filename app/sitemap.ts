import { MetadataRoute } from 'next';
import { getAllPosts, VALID_CATEGORIES } from '@/lib/posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/timeline`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...categoryEntries,
    ...postEntries,
  ];
}
