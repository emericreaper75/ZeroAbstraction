import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import type { ContentCategory } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { CATEGORY_ENUM_TO_ROUTE, CATEGORY_LABELS, CATEGORY_ROUTE_TO_ENUM } from '@/lib/editorial/categories';
import { extractTOC, nestTOC } from '@/lib/toc';
import ArticleLayout from '@/components/ArticleLayout';
import MDXContent from '@/components/mdx/MDXContent';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import RelatedPosts from '@/components/related/RelatedPosts';
import { contentPostToLegacyPost } from '@/lib/public/legacy-post-adapter';

type Props = { params: { category: string; slug: string } };

export async function generateStaticParams() {
  const posts = await prisma.contentPost.findMany({
    where: { published: true },
    select: { slug: true, category: true },
  });

  return posts.map((p) => ({
    category: CATEGORY_ENUM_TO_ROUTE[p.category],
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categoryEnum = CATEGORY_ROUTE_TO_ENUM[params.category] as ContentCategory | undefined;
  if (!categoryEnum) return {};
  const post = await prisma.contentPost.findFirst({
    where: { published: true, category: categoryEnum, slug: params.slug },
  });
  if (!post) return {};

  // generatePostMetadata expects the legacy filesystem shape; keep metadata simple here.
  return {
    title: post.title,
    description: post.description ?? undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const categoryEnum = CATEGORY_ROUTE_TO_ENUM[params.category] as ContentCategory | undefined;
  if (!categoryEnum) notFound();

  const post = await prisma.contentPost.findFirst({
    where: { published: true, category: categoryEnum, slug: params.slug },
  });
  if (!post) notFound();

  const toc = nestTOC(extractTOC(post.content ?? ""));
  const relatedPosts = await prisma.contentPost.findMany({
    where: {
      published: true,
      id: { not: post.id },
      tags: { hasSome: post.tags },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  const legacyPost = contentPostToLegacyPost({
    post,
    routeCategory: params.category,
  });
  const relatedLegacy = relatedPosts.map((p) =>
    contentPostToLegacyPost({ post: p, routeCategory: CATEGORY_ENUM_TO_ROUTE[p.category] })
  );

  const articleJsonLd = generateArticleJsonLd(legacyPost, params.category);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: CATEGORY_LABELS[params.category] ?? params.category, href: `/${params.category}` },
    { name: legacyPost.title },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleLayout
        post={legacyPost}
        toc={toc}
        mdxContent={
          <>
            <MDXContent source={legacyPost.content} />
            <RelatedPosts posts={relatedLegacy} />
          </>
        }
      />
    </>
  );
}

