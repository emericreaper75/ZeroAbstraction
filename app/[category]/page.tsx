import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostsByCategory, VALID_CATEGORIES } from '@/lib/posts';
import { generateCategoryMetadata } from '@/lib/metadata';
import ArticleCard from '@/components/ArticleCard';

type Props = { params: { category: string } };

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!VALID_CATEGORIES.includes(params.category as (typeof VALID_CATEGORIES)[number])) {
    return {};
  }
  const posts = getPostsByCategory(params.category);
  return generateCategoryMetadata(params.category, posts.length);
}

const categoryLabels: Record<string, string> = {
  electronics: 'Electronics & Communications',
  astrophysics: 'Astrophysics',
  'physics-math': 'Physics & Mathematics',
  'research-logs': 'Research Logs',
};

export default function CategoryPage({ params }: Props) {
  if (!VALID_CATEGORIES.includes(params.category as (typeof VALID_CATEGORIES)[number])) {
    notFound();
  }

  const posts = getPostsByCategory(params.category);
  const label = categoryLabels[params.category] ?? params.category;

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-xl">
        <header className="mb-12 max-w-prose">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-600">
            Category
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-100 sm:text-4xl">
            {label}
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} showCategory={false} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">No articles in this category yet.</p>
        )}
      </div>
    </div>
  );
}
