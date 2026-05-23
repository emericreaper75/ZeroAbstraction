import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

import EditProjectClient from "@/components/admin/edit-project-client";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  return (
    <EditProjectClient
      projectId={project.id}
      defaultValues={{
        title: project.title,
        description: project.description,
        content: project.content ?? "",
        tags: project.tags,
        githubUrl: project.githubUrl ?? "",
        liveUrl: project.liveUrl ?? "",
        featured: project.featured,
        published: project.published,
        thumbnail: project.thumbnail ?? "",
        thumbnailAlt: project.thumbnailAlt ?? "",
        updatedAt: project.updatedAt.toISOString(),
      }}
    />
  );
}