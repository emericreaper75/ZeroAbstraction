import "server-only";

import type { Project, RevisionReason } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/editorial/slug";
import { createRevision } from "@/lib/editorial/revisions/revision-service";

export type ProjectUpdateInput = {
  title: string;
  description?: string;
  content?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  published?: boolean;
  clientMutationId?: string | null;
  reason?: RevisionReason;
};

export async function updateProjectWithRevision(input: {
  id: string;
  data: ProjectUpdateInput;
}) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.project.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      throw new Error("Project not found");
    }

    const reason = input.data.reason ?? "UPDATE";

    await createRevision({
      entityType: "PROJECT",
      entityId: existing.id,
      entityVersion: existing.version,
      reason,
      snapshot: existing,
      clientMutationId: input.data.clientMutationId ?? null,
      db: tx,
    });

    const slug = slugify(input.data.title);

    const updated = await tx.project.update({
      where: { id: existing.id },
      data: {
        title: input.data.title,
        slug,
        description: input.data.description ?? "",
        content: input.data.content ?? "",
        tags: input.data.tags ?? [],
        githubUrl: input.data.githubUrl || null,
        liveUrl: input.data.liveUrl || null,
        featured: input.data.featured ?? false,
        published: input.data.published ?? false,
        version: { increment: 1 },
      },
    });

    return updated;
  });
}

export async function rollbackProjectToRevision(input: {
  id: string;
  revisionId: string;
  clientMutationId?: string | null;
}) {
  return prisma.$transaction(async (tx) => {
    const current = await tx.project.findUnique({
      where: { id: input.id },
    });
    if (!current) throw new Error("Project not found");

    const rev = await tx.contentRevision.findFirst({
      where: {
        id: input.revisionId,
        entityType: "PROJECT",
        entityId: input.id,
      },
    });
    if (!rev) throw new Error("Revision not found");

    await createRevision({
      entityType: "PROJECT",
      entityId: current.id,
      entityVersion: current.version,
      reason: "ROLLBACK",
      snapshot: current,
      clientMutationId: input.clientMutationId ?? null,
      db: tx,
    });

    const snapshot = rev.snapshot as unknown as Project;
    const restored = await tx.project.update({
      where: { id: current.id },
      data: {
        title: snapshot.title,
        slug: snapshot.slug,
        description: snapshot.description,
        content: snapshot.content ?? "",
        tags: snapshot.tags ?? [],
        thumbnail: snapshot.thumbnail ?? null,
        thumbnailAlt: snapshot.thumbnailAlt ?? null,
        githubUrl: snapshot.githubUrl ?? null,
        liveUrl: snapshot.liveUrl ?? null,
        featured: snapshot.featured ?? false,
        published: snapshot.published ?? false,
        version: { increment: 1 },
      },
    });

    return restored;
  });
}

