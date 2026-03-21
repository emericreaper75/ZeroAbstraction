import { Metadata } from 'next';
import { Post } from './posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';
const siteName = 'Zero Abstraction';
const siteDescription =
  'Notes on electronics, astrophysics, physics, and mathematics — written without abstraction.';

export function generateSiteMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s — ${siteName}`,
    },
    description: siteDescription,
    openGraph: {
      type: 'website',
      siteName,
      title: siteName,
      description: siteDescription,
      url: siteUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export function generatePostMetadata(post: Post, category: string): Metadata {
  const url = `${siteUrl}/${category}/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      publishedTime: new Date(post.date).toISOString(),
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: { canonical: url },
  };
}

export function generateCategoryMetadata(category: string, count: number): Metadata {
  const labels: Record<string, string> = {
    electronics: 'Electronics & Communications',
    astrophysics: 'Astrophysics',
    'physics-math': 'Physics & Mathematics',
    'research-logs': 'Research Logs',
  };
  const label = labels[category] || category;
  const description = `${count} articles on ${label} — rigorous technical writing without hand-waving.`;

  return {
    title: label,
    description,
    openGraph: {
      type: 'website',
      title: `${label} — ${siteName}`,
      description,
      url: `${siteUrl}/${category}`,
    },
  };
}
