import "server-only";

import type { ResearchLog, RevisionReason } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/editorial/slug";
import { createRevision } from "@/lib/editorial/revisions/revision-service";

export type ResearchLogUpdateInput = {
  title: string;
  series?: string;
  abstract?: string | null;
  content?: string | null;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  clientMutationId?: string | null;
  reason?: RevisionReason;
};

/**
 * Update a research log with full revision tracking.
 * Captures a snapshot of the current state before applying the update,
 * enabling rollback to any previous version.
 */
export async function updateResearchLogWithRevision(input: {
  id: string;
  data: ResearchLogUpdateInput;
}) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.researchLog.findUnique({
      where: { id: input.id },
    });

    if (!existing) {
      throw new Error("Research log not found");
    }

    const reason = input.data.reason ?? "UPDATE";

    await createRevision({
      entityType: "RESEARCH_LOG",
      entityId: existing.id,
      entityVersion: 1, // ResearchLog doesn't have a version field; use revision count
      reason,
      snapshot: existing,
      clientMutationId: input.data.clientMutationId ?? null,
      db: tx,
    });

    const slug = slugify(input.data.title);

    const updated = await tx.researchLog.update({
      where: { id: existing.id },
      data: {
        title: input.data.title,
        slug,
        series: input.data.series ?? existing.series,
        abstract: input.data.abstract ?? null,
        content: input.data.content ?? null,
        tags: input.data.tags ?? [],
        featured: input.data.featured ?? false,
        published: input.data.published ?? false,
        updatedAt: new Date(),
      },
    });

    return updated;
  });
}

/**
 * Rollback a research log to a specific revision snapshot.
 * Creates a new revision capturing the current state before restoring.
 */
export async function rollbackResearchLogToRevision(input: {
  id: string;
  revisionId: string;
  clientMutationId?: string | null;
}) {
  return prisma.$transaction(async (tx) => {
    const current = await tx.researchLog.findUnique({
      where: { id: input.id },
    });
    if (!current) throw new Error("Research log not found");

    const rev = await tx.contentRevision.findFirst({
      where: {
        id: input.revisionId,
        entityType: "RESEARCH_LOG",
        entityId: input.id,
      },
    });
    if (!rev) throw new Error("Revision not found");

    await createRevision({
      entityType: "RESEARCH_LOG",
      entityId: current.id,
      entityVersion: 1,
      reason: "ROLLBACK",
      snapshot: current,
      clientMutationId: input.clientMutationId ?? null,
      db: tx,
    });

    const snapshot = rev.snapshot as unknown as ResearchLog;
    const restored = await tx.researchLog.update({
      where: { id: current.id },
      data: {
        title: snapshot.title,
        slug: snapshot.slug,
        series: snapshot.series,
        abstract: snapshot.abstract ?? null,
        content: snapshot.content ?? null,
        tags: snapshot.tags ?? [],
        featured: snapshot.featured ?? false,
        published: snapshot.published ?? false,
        updatedAt: new Date(),
      },
    });

    return restored;
  });
}
