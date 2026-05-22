import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/db/prisma';
import { extractTOC, nestTOC } from '@/lib/toc';
import ArticleLayout from '@/components/ArticleLayout';
import MDXContent from '@/components/mdx/MDXContent';
import { generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import RelatedPosts from '@/components/related/RelatedPosts';
import matter from 'gray-matter';
import { splitMDXContent } from '@/lib/mdx/split';
import readingTime from 'reading-time';

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const logs = await prisma.researchLog.findMany({
    where: { published: true },
    select: { slug: true },
  });

  return logs.map((l) => ({
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const log = await prisma.researchLog.findFirst({
    where: { published: true, slug: params.slug },
  });
  if (!log) return {};

  return {
    title: log.title,
    description: log.abstract ?? undefined,
  };
}

export default async function ResearchLogDetailPage({ params }: Props) {
  const log = await prisma.researchLog.findFirst({
    where: { published: true, slug: params.slug },
  });
  if (!log) notFound();

  const toc = nestTOC(extractTOC(log.content ?? ''));
  
  const relatedLogs = await prisma.researchLog.findMany({
    where: {
      published: true,
      id: { not: log.id },
      tags: { hasSome: log.tags },
    },
    orderBy: { createdAt: 'desc' },
    take: 4,
  });

  // Map to legacy Post structure
  const post = {
    title: log.title,
    slug: log.slug,
    description: log.abstract ?? '',
    category: 'research',
    tags: log.tags,
    date: log.createdAt.toISOString(),
    readingTime: readingTime(log.content ?? '').text,
    content: log.content ?? '',
    published: log.published,
  };

  const relatedPosts = relatedLogs.map((rl) => ({
    title: rl.title,
    slug: rl.slug,
    description: rl.abstract ?? '',
    category: 'research',
    tags: rl.tags,
    date: rl.createdAt.toISOString(),
    readingTime: readingTime(rl.content ?? '').text,
    content: rl.content ?? '',
    published: rl.published,
  }));

  const articleJsonLd = generateArticleJsonLd(post, 'research');
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Research Logs', href: '/research' },
    { name: post.title },
  ]);

  const { data, content: mdxBody } = matter(log.content ?? '');
  const abstract = data.abstract ?? data.description ?? log.abstract ?? undefined;
  const previewSections = typeof data.previewSections === 'number' ? data.previewSections : 2;

  const { previewMDX, remainingMDX } = splitMDXContent(mdxBody, previewSections);

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
        post={post}
        toc={toc}
        abstract={abstract}
        previewContent={<MDXContent source={previewMDX} />}
        remainingContent={remainingMDX ? <MDXContent source={remainingMDX} /> : null}
        relatedContent={relatedPosts.length > 0 ? <RelatedPosts posts={relatedPosts} /> : null}
      />
    </>
  );
}
