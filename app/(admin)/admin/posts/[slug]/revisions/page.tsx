import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { listRevisions } from "@/lib/editorial/revisions/revision-service";
import { rollbackEntityToRevision } from "@/actions/revision-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminTable from "@/components/admin/admin-table";
import AdminActionButton from "@/components/admin/admin-action-button";

export default async function PostRevisionsPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.contentPost.findUnique({
    where: { slug: params.slug },
    select: { id: true, title: true, slug: true },
  });

  if (!post) notFound();

  const revisions = await listRevisions({
    entityType: "POST",
    entityId: post.id,
    take: 50,
  });

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title="Post Revisions"
        description={`History for “${post.title}”.`}
        action={
          <Link
            href={`/admin/posts/${post.slug}/edit`}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-600"
          >
            Back to editor
          </Link>
        }
      />

      <AdminTable headers={["When", "Reason", "Version", "Author", "Actions"]}>
        {revisions.length === 0 ? (
          <tr>
            <td colSpan={5} className="px-6 py-10 text-center text-sm text-zinc-400">
              No revisions found.
            </td>
          </tr>
        ) : (
          revisions.map((rev) => (
            <tr key={rev.id}>
              <td className="px-6 py-4 text-sm text-zinc-200">
                {new Date(rev.createdAt).toLocaleString()}
              </td>
              <td className="px-6 py-4 text-sm text-zinc-400">{rev.reason}</td>
              <td className="px-6 py-4 text-sm text-zinc-400">{rev.entityVersion}</td>
              <td className="px-6 py-4 text-sm text-zinc-400">
                {rev.createdBy?.email ?? "-"}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <details className="group">
                    <summary className="cursor-pointer text-zinc-300 transition hover:text-white">
                      View snapshot
                    </summary>
                    <pre className="mt-3 max-h-96 overflow-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-zinc-200">
                      {JSON.stringify(rev.snapshot, null, 2)}
                    </pre>
                  </details>

                  <form
                    action={async () => {
                      "use server";
                      await rollbackEntityToRevision({
                        entityType: "POST",
                        entityId: post.id,
                        revisionId: rev.id,
                        clientMutationId: `${Date.now()}-${rev.id}`,
                      });
                    }}
                  >
                    <AdminActionButton variant="primary">
                      Roll back
                    </AdminActionButton>
                  </form>
                </div>
              </td>
            </tr>
          ))
        )}
      </AdminTable>
    </div>
  );
}

