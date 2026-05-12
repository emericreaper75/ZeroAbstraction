import { notFound } from "next/navigation";
import Link from "next/link";

import { prisma } from "@/lib/db/prisma";

import { updateProject } from "@/actions/project-actions";
import { duplicateProject } from "@/actions/duplicate-actions";

import AdminPageHeader from "@/components/admin/admin-page-header";
import ProjectForm from "@/components/admin/project-form";

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <AdminPageHeader
        title="Edit Project"
        description="Update portfolio project."
        action={
          <div className="flex items-center gap-3">
            <Link
              href={`/admin/projects/${project.id}/revisions`}
              className="rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:border-zinc-600"
            >
              Revisions
            </Link>
            <form
              action={async () => {
                "use server";
                await duplicateProject({ id: project.id });
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

      <ProjectForm
        action={updateProject.bind(
          null,
          project.id
        )}
        defaultValues={{
          title: project.title,
          description:
            project.description,
          content: project.content || "",
          tags: project.tags,
          githubUrl:
            project.githubUrl,
          liveUrl: project.liveUrl,
          featured:
            project.featured,
          published:
            project.published,
        }}
      />
    </div>
  );
}