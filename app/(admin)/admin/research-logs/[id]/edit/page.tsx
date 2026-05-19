import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import EditResearchLogClient from "@/components/admin/edit-research-log-client";

export default async function EditResearchLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const log = await prisma.researchLog.findUnique({ where: { id } });
  if (!log) notFound();

  return (
    <EditResearchLogClient
      logId={log.id}
      defaultValues={{
        title: log.title,
        slug: log.slug,
        series: log.series,
        abstract: log.abstract ?? "",
        content: log.content ?? "",
        tags: log.tags,
        entryNumber: log.entryNumber,
        published: log.published,
        updatedAt: log.updatedAt.toISOString(),
      }}
    />
  );
}
