import { Metadata } from 'next';
import { listPublishedPosts } from '@/lib/public/content-posts';
import { generateCollectionPageJsonLd, generateBreadcrumbJsonLd } from '@/lib/jsonld';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Clock, ArrowRight, Search } from 'lucide-react';
import { CATEGORY_LABELS } from '@/lib/editorial/categories';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/fade-in';
import { Surface } from '@/components/ui/surface';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'All articles on electronics, astrophysics, physics, and mathematics — rigorous technical writing without hand-waving.',
};

import { PublicPostCard } from '@/lib/public/post-card';

const POSTS_PER_PAGE = 12;

const categoryVariants: Record<string, 'electronics' | 'astrophysics' | 'physics' | 'communications'> = {
  electronics: 'electronics',
  astrophysics: 'astrophysics',
  'physics-math': 'physics',
  'communications': 'communications',
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string };
}) {
  const currentPage = Math.max(1, parseInt(searchParams.page ?? '1', 10));
  const filterCategory = searchParams.category ?? null;

  const allPosts = await listPublishedPosts();

  const filteredPosts = filterCategory
    ? allPosts.filter((p: PublicPostCard) => p.routeCategory === filterCategory)
    : allPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const jsonLdCollection = generateCollectionPageJsonLd(
    'Blog',
    'All articles on electronics, astrophysics, physics, and mathematics.',
    '/blog',
    filteredPosts.length
  );
  const jsonLdBreadcrumb = generateBreadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
  ]);

  const categories = Object.keys(CATEGORY_LABELS);

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      {/* Header section */}
      <div className="border-b border-zinc-800/60 bg-gradient-to-b from-zinc-900/50 to-transparent">
        <div className="mx-auto max-w-screen-xl px-6 pb-12 pt-28">
          <FadeIn>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400 mb-3">
              All Articles
            </p>
            <h1 className="text-4xl font-serif font-bold text-white md:text-5xl mb-4">
              Blog
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl font-light">
              {filteredPosts.length} articles across electronics, astrophysics, physics, and mathematics.
              No hand-waving. First principles only.
            </p>

            {/* Category filter chips */}
            <div className="mt-8 flex flex-wrap gap-2" role="navigation" aria-label="Category filters">
              <Link
                href="/blog"
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-mono transition-all ${
                  !filterCategory
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
                }`}
              >
                All
              </Link>
            {categories.map((cat: string) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-mono transition-all ${
                  filterCategory === cat
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600'
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </Link>
            ))}
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Post grid */}
      <div className="mx-auto max-w-screen-xl px-6 py-12">
        {paginatedPosts.length > 0 ? (
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedPosts.map((post: PublicPostCard) => (
              <StaggerItem key={`${post.routeCategory}-${post.slug}`} className="h-full">
                <Surface variant="glass" interactive padding="md" asChild className="h-full group flex flex-col transition-all duration-300">
                  <Link href={`/${post.routeCategory}/${post.slug}`}>
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant={categoryVariants[post.routeCategory] ?? 'default'}>
                      {CATEGORY_LABELS[post.routeCategory] ?? post.routeCategory}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-serif font-semibold text-zinc-100 mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" aria-hidden="true" />
                      {post.readingTime}
                    </span>
                  </div>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                  </div>
                  </Link>
                </Surface>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" aria-hidden="true" />
            <p className="text-zinc-500">No articles found in this category.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex items-center justify-center gap-2" aria-label="Pagination">
            {currentPage > 1 && (
              <Link
                href={`/blog?page=${currentPage - 1}${filterCategory ? `&category=${filterCategory}` : ''}`}
                className="rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                Previous
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, i: number) => i + 1).map((page: number) => (
              <Link
                key={page}
                href={`/blog?page=${page}${filterCategory ? `&category=${filterCategory}` : ''}`}
                className={`rounded-md px-3 py-2 text-sm font-mono transition-colors ${
                  page === currentPage
                    ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-400'
                    : 'border border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
                }`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            ))}
            {currentPage < totalPages && (
              <Link
                href={`/blog?page=${currentPage + 1}${filterCategory ? `&category=${filterCategory}` : ''}`}
                className="rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}

