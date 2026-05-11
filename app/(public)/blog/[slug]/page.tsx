import { notFound } from "next/navigation";

import { MDXRemote } from "next-mdx-remote/rsc";

import { getPostBySlug } from "@/lib/posts/get-post-by-slug";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <header className="mb-12">
        <p className="text-sm text-zinc-500">
          {post.date}
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight">
          {post.title}
        </h1>

        {post.description && (
          <p className="mt-6 text-lg text-zinc-400">
            {post.description}
          </p>
        )}
      </header>

      <div className="prose prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}