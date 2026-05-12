import Link from "next/link";

import { prisma } from "@/lib/db/prisma";

import DeleteButton from "@/components/admin/delete-button";

import {
  deleteContentPost,
  toggleContentPostPublish,
} from "@/actions/content-post-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminTable from "@/components/admin/admin-table";
import AdminActionButton from "@/components/admin/admin-action-button";

export default async function AdminPostsPage() {
  const posts = await prisma.contentPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex w-full flex-col">
      <AdminPageHeader
        title="Posts"
        description="Manage content posts."
        action={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            New Post
          </Link>
        }
      />

      <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/40">
        <AdminTable
          headers={[
            "Title",
            "Published",
            "Date",
            "Actions",
          ]}
        >
          {posts.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-10 text-center text-sm text-zinc-400"
              >
                No posts found.
              </td>
            </tr>
          ) : (
            posts.map((post) => (
              <tr
                key={post.id}
                className="border-t border-zinc-800/60"
              >
                <td className="px-6 py-4 text-sm text-zinc-200">
                  <Link
                    href={`/admin/posts/${post.slug}/edit`}
                    className="transition hover:text-white"
                  >
                    {post.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-400">
                  {post.published
                    ? "Yes"
                    : "No"}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-400">
                  {new Date(
                    post.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    {/* Edit */}
                    <Link
                      href={`/admin/posts/${post.slug}/edit`}
                      className="text-zinc-300 transition hover:text-white"
                    >
                      Edit
                    </Link>

                    {/* Publish Toggle */}
                    <form action={toggleContentPostPublish}>
                      <input
                        type="hidden"
                        name="id"
                        value={post.id}
                      />

                      <AdminActionButton variant="primary">
                        {post.published
                          ? "Unpublish"
                          : "Publish"}
                      </AdminActionButton>
                    </form>

                    {/* View */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-blue-400 transition hover:text-blue-300"
                    >
                      View
                    </Link>

                    {/* Delete */}
                    <form action={deleteContentPost}>
                      <input
                        type="hidden"
                        name="id"
                        value={post.id}
                      />

                      <DeleteButton>
                        Delete
                      </DeleteButton>
                    </form>

                    {/* Category */}
                    <span className="rounded-md border border-zinc-800 bg-zinc-900/70 px-2 py-1 text-xs text-zinc-500">
                      {post.category}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </AdminTable>
      </div>
    </div>
  );
}