import { prisma } from "@/lib/db/prisma";

import AdminPageHeader from "@/components/admin/admin-page-header";
import AdminTable from "@/components/admin/admin-table";
import AdminActionButton from "@/components/admin/admin-action-button";
import DeleteButton from "@/components/admin/delete-button";

import {
  deleteProject,
  toggleProjectPublish,
} from "@/actions/project-actions";

import Link from "next/link";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="flex w-full flex-col">
      <AdminPageHeader
        title="Projects"
        description="Manage portfolio projects."
        action={
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
          >
            New Project
          </Link>
        }
      />

      <div className="w-full overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950/40">
        <AdminTable
          headers={[
            "Title",
            "Published",
            "Created",
            "Actions",
          ]}
        >
          {projects.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-10 text-center text-sm text-zinc-400"
              >
                No projects found.
              </td>
            </tr>
          ) : (
            projects.map((project) => (
              <tr
                key={project.id}
                className="border-t border-zinc-800/60"
              >
                <td className="px-6 py-4 text-sm text-zinc-200">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="transition hover:text-white"
                  >
                    {project.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-sm text-zinc-400">
                  {project.published
                    ? "Yes"
                    : "No"}
                </td>

                <td className="px-6 py-4 text-sm text-zinc-400">
                  {new Date(
                    project.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-sm">
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="text-zinc-300 transition hover:text-white"
                    >
                      Edit
                    </Link>

                    <form action={toggleProjectPublish}>
                      <input
                        type="hidden"
                        name="id"
                        value={project.id}
                      />

                      <input
                        type="hidden"
                        name="published"
                        value={project.published.toString()}
                      />

                      <AdminActionButton variant="primary">
                        {project.published
                          ? "Unpublish"
                          : "Publish"}
                      </AdminActionButton>
                    </form>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-blue-400 transition hover:text-blue-300"
                    >
                      View
                    </Link>

                    <form action={deleteProject}>
                      <input
                        type="hidden"
                        name="id"
                        value={project.id}
                      />

                      <DeleteButton>
                        Delete
                      </DeleteButton>
                    </form>
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