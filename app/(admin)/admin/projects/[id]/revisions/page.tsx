import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { listRevisions } from "@/lib/editorial/revisions/revision-service";
import { rollbackEntityToRevision } from "@/actions/revision-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminTable from "@/components/admin/admin-table";
import AdminActionButton from "@/components/admin/admin-action-button";

export default async function ProjectRevisionsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, slug: true },
  });

  if (!project) notFound();

  const revisions = await listRevisions({
    entityType: "PROJECT",
    entityId: project.id,
    take: 50,
  });

  return (
    <div className="max-w-5xl">
      <AdminPageHeader
        title="Project Revisions"
        description={`History for “${project.title}”.`}
        action={
          <Link
            href={`/admin/projects/${project.id}/edit`}
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
                        entityType: "PROJECT",
                        entityId: project.id,
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

