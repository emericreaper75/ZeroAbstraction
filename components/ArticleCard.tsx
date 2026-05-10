import Link from 'next/link';
import { Post } from '@/lib/posts';
import CategoryBadge from './CategoryBadge';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  post: Post;
  showCategory?: boolean;
};

export default function ArticleCard({ post, showCategory = true }: Props) {
  return (
    <article className="group relative flex flex-col rounded-lg border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {showCategory && <CategoryBadge category={post.category} />}
        {post.thumbnail && (
          <Link
            href={`/${post.category}/${post.slug}`}
            className="relative mb-4 block aspect-[16/9] overflow-hidden rounded-md border border-neutral-800"
          >
            <Image
              src={post.thumbnail}
              alt={post.thumbnailAlt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        )}
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-700 px-2 py-0.5 font-mono text-[11px] text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <Link
        href={`/${post.category}/${post.slug}`}
        className="block before:absolute before:inset-0 before:rounded-lg before:content-['']"
      >
        <h2 className="font-serif text-xl font-semibold leading-snug text-neutral-100 transition-colors group-hover:text-sky-400">
          {post.title}
        </h2>
      </Link>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
        {post.description}
      </p>

      <div className="mt-4 flex items-center gap-3 text-xs text-neutral-600">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="text-neutral-700">·</span>
        <span>{post.readingTime}</span>
      </div>
    </article>
  );
}
