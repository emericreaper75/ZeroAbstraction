import { notFound } from "next/navigation";

import { prisma } from "@/lib/db/prisma";

import { updateProject } from "@/actions/project-actions";

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