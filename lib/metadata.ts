import { Metadata } from 'next';
import { Post } from './posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';
const siteName = 'Zero Abstraction';
const siteDescription =
  'Notes on electronics, astrophysics, physics, and mathematics — written without abstraction.';

function ogPostUrl(category: string, slug: string) {
  return `${siteUrl}/og/post/${category}/${slug}`;
}

function ogProjectUrl(slug: string) {
  return `${siteUrl}/og/project/${slug}`;
}

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
      images: [
        {
          url: `${siteUrl}/og/project/zero-abstraction`,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
      images: [`${siteUrl}/og/project/zero-abstraction`],
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
  const ogImage = ogPostUrl(category, post.slug);
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
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  };
}

export function generateCategoryMetadata(category: string, count: number): Metadata {
  const labels: Record<string, string> = {
    electronics: 'Electronics & Communications',
    astrophysics: 'Astrophysics',
    'physics-math': 'Physics & Mathematics',
    'communications': 'Communications',
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

export type ProjectSeoInput = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  published?: boolean;
};

export function generateProjectMetadata(project: ProjectSeoInput): Metadata {
  const url = `${siteUrl}/projects/${project.slug}`;
  const ogImage = ogProjectUrl(project.slug);
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: project.title,
      description: project.description,
      url,
      tags: project.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
  };
}
