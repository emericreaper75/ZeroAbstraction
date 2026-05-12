import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { CATEGORY_ENUM_TO_ROUTE } from '@/lib/editorial/categories';

type Props = { params: { slug: string } };

export default async function LegacyBlogSlugPage({ params }: Props) {
  // `/blog/[slug]` is a legacy route. Canonical URLs are `/${category}/${slug}`.
  const match = await prisma.contentPost.findFirst({
    where: { slug: params.slug, published: true },
    select: { slug: true, category: true },
  });

  if (!match) {
    notFound();
  }

  redirect(`/${CATEGORY_ENUM_TO_ROUTE[match.category]}/${match.slug}`);
}

