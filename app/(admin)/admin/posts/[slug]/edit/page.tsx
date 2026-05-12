import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/db/prisma";

import {
  updateContentPost,
} from "@/actions/content-post-actions";

import { duplicatePost } from "@/actions/duplicate-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import ContentPostForm from "@/components/admin/content-post-form";

interface EditPostPageProps {
  params: {
    slug: string;
  };
}

export default async function EditPostPage({
  params,
}: EditPostPageProps) {
  const post = await prisma.contentPost.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Edit Post"
        description="Update post content."
        action={
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/posts/${post.slug}/revisions`}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-600"
            >
              Revisions
            </Link>

            <form
              action={async () => {
                "use server";

                await duplicatePost({
                  id: post.id,
                });
              }}
            >
              <button
                type="submit"
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
              >
                Duplicate
              </button>
            </form>
          </div>
        }
      />

      <ContentPostForm
        action={updateContentPost.bind(
          null,
          post.id
        )}
        defaultValues={{
          title: post.title,
          description:
            post.description,
          content:
            post.content ?? "",
          category:
            post.category,
          tags: post.tags,
          featured:
            post.featured,
          published:
            post.published,
          thumbnail:
            post.thumbnail,
          thumbnailAlt:
            post.thumbnailAlt,
        }}
      />
    </div>
  );
}