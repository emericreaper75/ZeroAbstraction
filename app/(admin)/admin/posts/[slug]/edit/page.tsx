import { notFound } from "next/navigation";

import {
  getPostBySlug,
} from "@/lib/posts/get-post-by-slug";

import {
  updatePost,
} from "@/actions/post-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";

interface EditPostPageProps {
  params: {
    slug: string;
  };
}

export default function EditPostPage({
  params,
}: EditPostPageProps) {
  const post = getPostBySlug(
    params.slug
  );

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Edit Post"
        description="Update MDX blog content."
      />

      <form
        action={async (formData) => {
          // @ts-ignore
          const result = await updatePost(post.slug, formData, post);
          if (result?.error) {
            console.error(result.error);
          }
        }}
        className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={post.title}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Description
          </label>

          <textarea
            name="description"
            rows={3}
            defaultValue={
              post.description || ""
            }
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-zinc-300">
            Content
          </label>

          <textarea
            name="content"
            rows={20}
            defaultValue={post.content}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 font-mono text-sm text-white outline-none transition focus:border-zinc-500"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked={
              post.published
            }
          />

          <label
            htmlFor="published"
            className="text-sm text-zinc-300"
          >
            Published
          </label>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}