import { Post } from './posts';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zero-abstraction.dev';
const siteName = 'Zero Abstraction';

export interface JsonLdWebSite {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  description: string;
  publisher: JsonLdOrganization;
}

export interface JsonLdOrganization {
  '@type': string;
  name: string;
  url: string;
}

export interface JsonLdArticle {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  author: JsonLdOrganization;
  publisher: JsonLdOrganization;
  keywords: string[];
  articleSection: string;
  wordCount: number;
}

export interface JsonLdBreadcrumbList {
  '@context': string;
  '@type': string;
  itemListElement: JsonLdBreadcrumbItem[];
}

export interface JsonLdBreadcrumbItem {
  '@type': string;
  position: number;
  name: string;
  item?: string;
}

export interface JsonLdCollectionPage {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  numberOfItems: number;
}

const publisher: JsonLdOrganization = {
  '@type': 'Organization',
  name: siteName,
  url: siteUrl,
};

export function generateWebSiteJsonLd(): JsonLdWebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: 'Notes on electronics, astrophysics, physics, and mathematics — written without abstraction.',
    publisher,
  };
}

export function generateArticleJsonLd(post: Post, category: string): JsonLdArticle {
  const wordCount = post.content.split(/\s+/).length;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${siteUrl}/${category}/${post.slug}`,
    datePublished: new Date(post.date).toISOString(),
    author: publisher,
    publisher,
    keywords: post.tags,
    articleSection: category,
    wordCount,
  };
}

export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; href?: string }>
): JsonLdBreadcrumbList {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
}

export function generateCollectionPageJsonLd(
  name: string,
  description: string,
  path: string,
  count: number
): JsonLdCollectionPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${siteUrl}${path}`,
    numberOfItems: count,
  };
}
