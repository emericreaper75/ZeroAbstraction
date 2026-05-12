import "server-only";

import type { ContentCategory, ContentPost, RevisionReason } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { slugify } from "@/lib/editorial/slug";
import { createRevision } from "@/lib/editorial/revisions/revision-service";

export type ContentPostUpdateInput = {
  title: string;
  description?: string;
  content?: string;
  category: ContentCategory;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  thumbnail?: string | null;
  thumbnailAlt?: string | null;
  clientMutationId?: string | null;
  reason?: RevisionReason;
};

export async function updateContentPostWithRevision(input: {
  id: string;
  data: ContentPostUpdateInput;
}) {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.contentPost.findUnique({
      where: { id: input.id },
    });

    if (!existing) throw new Error("Post not found");

    const reason = input.data.reason ?? "UPDATE";

    await createRevision({
      entityType: "POST",
      entityId: existing.id,
      entityVersion: existing.version,
      reason,
      snapshot: existing,
      clientMutationId: input.data.clientMutationId ?? null,
      db: tx,
    });

    const slug = slugify(input.data.title);

    const updated = await tx.contentPost.update({
      where: { id: existing.id },
      data: {
        title: input.data.title,
        slug,
        description: input.data.description ?? "",
        content: input.data.content ?? "",
        category: input.data.category,
        tags: input.data.tags ?? [],
        thumbnail: input.data.thumbnail ?? null,
        thumbnailAlt: input.data.thumbnailAlt ?? null,
        featured: input.data.featured ?? false,
        published: input.data.published ?? false,
        version: { increment: 1 },
      },
    });

    return updated;
  });
}

export async function rollbackContentPostToRevision(input: {
  id: string;
  revisionId: string;
  clientMutationId?: string | null;
}) {
  return prisma.$transaction(async (tx) => {
    const current = await tx.contentPost.findUnique({
      where: { id: input.id },
    });
    if (!current) throw new Error("Post not found");

    const rev = await tx.contentRevision.findFirst({
      where: {
        id: input.revisionId,
        entityType: "POST",
        entityId: input.id,
      },
    });
    if (!rev) throw new Error("Revision not found");

    await createRevision({
      entityType: "POST",
      entityId: current.id,
      entityVersion: current.version,
      reason: "ROLLBACK",
      snapshot: current,
      clientMutationId: input.clientMutationId ?? null,
      db: tx,
    });

    const snapshot = rev.snapshot as unknown as ContentPost;
    const restored = await tx.contentPost.update({
      where: { id: current.id },
      data: {
        title: snapshot.title,
        slug: snapshot.slug,
        description: snapshot.description,
        content: snapshot.content ?? "",
        category: snapshot.category,
        tags: snapshot.tags ?? [],
        thumbnail: snapshot.thumbnail ?? null,
        thumbnailAlt: snapshot.thumbnailAlt ?? null,
        featured: snapshot.featured ?? false,
        published: snapshot.published ?? false,
        version: { increment: 1 },
      },
    });

    return restored;
  });
}

