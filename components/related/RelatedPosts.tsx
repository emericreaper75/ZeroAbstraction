import Link from 'next/link';
import type { Post } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

export default function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 border-t border-neutral-800/60 pt-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Discover more
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold text-white">
            Related posts
          </h2>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={`${p.category}-${p.slug}`}
            href={`/${p.category}/${p.slug}`}
            className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 transition hover:border-neutral-700 hover:bg-neutral-900/50"
          >
            <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-600">
              {formatDate(p.date)}
            </p>
            <h3 className="mt-2 font-serif text-lg font-semibold text-neutral-100">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 line-clamp-2">
              {p.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

