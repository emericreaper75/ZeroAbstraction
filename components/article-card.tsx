import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export type ArticleCardProps = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  thumbnail?: string;
  thumbnailAlt?: string;
  category: string; // Used to build URL
};

const tagColors: Record<string, string> = {
  'research logs': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'electronics': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'astrophysics': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'physics & math': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'mathematics': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'physics': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'projects': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
  'signal processing': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

const getTagColor = (tag: string) => {
  return tagColors[tag.toLowerCase()] || 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
};

export function ArticleCard({ post }: { post: ArticleCardProps }) {
  const { title, excerpt, date, readTime, tags, thumbnail, thumbnailAlt, category, slug } = post;
  const href = `/${category}/${slug}`;

  // Use the first tag or category to determine primary color for placeholder
  const primaryTag = tags?.[0] || category;
  const tagColorClass = getTagColor(primaryTag);

  return (
    <Link 
      href={href}
      className="group flex flex-col bg-zinc-900/40 rounded-xl overflow-hidden border border-zinc-800 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900/60 hover:-translate-y-1"
    >
      <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
        {thumbnail ? (
          <>
            <Image
              src={thumbnail}
              alt={thumbnailAlt || title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
            />
            {/* Gradient overlay for text readability if we put badges over image */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Stylized placeholder */
          <div className="absolute inset-0 flex items-center justify-center dot-bg">
            <svg 
              className={`w-12 h-12 opacity-20 transition-opacity group-hover:opacity-40 ${tagColorClass.split(' ')[0]}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {tags?.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getTagColor(tag)}`}
            >
              {tag}
            </span>
          ))}
          {(!tags || tags.length === 0) && (
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getTagColor(category)}`}>
              {category.replace('-', ' ')}
            </span>
          )}
        </div>

        <h3 className="text-xl font-serif font-bold text-zinc-100 mb-3 line-clamp-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-zinc-400 mb-6 line-clamp-3 leading-relaxed flex-grow">
          {excerpt}
        </p>

        <div className="flex items-center justify-between text-xs font-mono text-zinc-500 pt-4 border-t border-zinc-800/60 mt-auto">
          <span>{date}</span>
          <span className="flex items-center">
            <svg className="w-3.5 h-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {readTime}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ArticleGrid({ posts }: { posts: ArticleCardProps[] }) {
  return (
    <section className="py-24 px-6 bg-base">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
              Latest Publications
            </h2>
            <h3 className="text-3xl font-serif font-bold text-zinc-100">
              Recent Articles
            </h3>
          </div>
        </div>
        
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 border border-zinc-800 rounded-xl bg-zinc-900/20">
            <p className="text-sm text-zinc-500 font-mono">No articles found in this sector yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
