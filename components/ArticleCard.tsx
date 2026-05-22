import Link from 'next/link';
import { Post } from '@/lib/posts';
import CategoryBadge from './CategoryBadge';
import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import { Surface } from '@/components/ui/surface';

type Props = {
  post: Post;
  showCategory?: boolean;
};

export default function ArticleCard({ post, showCategory = true }: Props) {
  return (
    <Surface variant="glass" interactive padding="md" className="group flex flex-col h-full transition-all">
      <div className="relative z-20 mb-3 flex flex-wrap items-center gap-2">
        {showCategory && <CategoryBadge category={post.category} />}
        {post.tags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-neutral-700 px-2 py-0.5 font-mono text-[11px] text-neutral-500"
          >
            {tag}
          </span>
        ))}
      </div>

      {post.thumbnail && (
        <Link
          href={`/${post.category}/${post.slug}`}
          className="relative mb-4 block aspect-[16/9] w-full overflow-hidden rounded-md border border-neutral-800"
        >
          <Image
            src={post.thumbnail}
            alt={post.thumbnailAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}

      <Link
        href={`/${post.category}/${post.slug}`}
        className="block before:absolute before:inset-0 before:rounded-lg before:content-['']"
      >
        <h2 className="font-serif text-xl font-semibold leading-snug text-neutral-100 transition-colors group-hover:text-cyan-400">
          {post.title}
        </h2>
      </Link>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-400">
        {post.description}
      </p>

      <div className="mt-4 flex items-center gap-3 text-xs text-neutral-500">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="text-neutral-700">·</span>
        <span>{post.readingTime}</span>
      </div>
    </Surface>
  );
}
