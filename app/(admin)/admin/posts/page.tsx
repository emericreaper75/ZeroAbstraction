import Link from "next/link";

import { getPosts } from "@/lib/posts/get-posts";
import DeleteButton from "@/components/admin/delete-button";

import {
  deletePost,
  togglePostPublish,
} from "@/actions/post-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminTable from "@/components/admin/admin-table";
import AdminActionButton from "@/components/admin/admin-action-button";

export default function AdminPostsPage() {
  const posts = getPosts();

  return (
    <div>
      <AdminPageHeader
        title="Posts"
        description="Manage MDX blog content."
        action={
          <Link
            href="/admin/posts/new"
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            New Post
          </Link>
        }
      />

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
            <tr key={post.slug}>
              <td className="px-6 py-4 text-sm text-zinc-200">
                <Link
                  href={`/admin/posts/${post.slug}/edit`}
                  className="transition hover:text-white"
                >
                  {post.title}
                </Link>
              </td>

              <td className="px-6 py-4 text-sm text-zinc-400">
                {post.published ? "Yes" : "No"}
              </td>

              <td className="px-6 py-4 text-sm text-zinc-400">
                {post.date || "-"}
              </td>

              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-4">
                  <Link
                    href={`/admin/posts/${post.slug}/edit`}
                    className="text-zinc-300 transition hover:text-white"
                  >
                    Edit
                  </Link>

                  <form action={togglePostPublish}>
                    <input
                      type="hidden"
                      name="slug"
                      value={post.slug}
                    />

                    <AdminActionButton variant="primary">
                      {post.published
                        ? "Unpublish"
                        : "Publish"}
                    </AdminActionButton>
                  </form>

                  <form action={deletePost}>
                    <input
                      type="hidden"
                      name="slug"
                      value={post.slug}
                    />

                    <DeleteButton>
                      Delete
                    </DeleteButton>
                  </form>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-400 transition hover:text-blue-300"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))
        )}
      </AdminTable>
    </div>
  );
}