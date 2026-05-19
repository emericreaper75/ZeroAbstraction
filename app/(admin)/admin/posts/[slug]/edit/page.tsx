import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import EditPostClient from "@/components/admin/edit-post-client";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({ where: { slug } });
  if (!post) notFound();

  return (
    <EditPostClient
      postId={post.id}
      slug={post.slug}
      defaultValues={{
        title: post.title,
        description: post.description,
        content: post.content ?? "",
        category: post.category,
        tags: post.tags,
        featured: post.featured,
        published: post.published,
        thumbnail: post.thumbnail,
        thumbnailAlt: post.thumbnailAlt,
      }}
    />
  );
}