"use server";

import { revalidatePath } from "next/cache";

import type { RevisionEntityType } from "@prisma/client";

import { rollbackProjectToRevision } from "@/lib/editorial/projects/project-service";
import { rollbackContentPostToRevision } from "@/lib/editorial/posts/content-post-service";

export async function rollbackEntityToRevision(input: {
  entityType: RevisionEntityType;
  entityId: string;
  revisionId: string;
  clientMutationId?: string;
}) {
  if (input.entityType === "PROJECT") {
    const updated = await rollbackProjectToRevision({
      id: input.entityId,
      revisionId: input.revisionId,
      clientMutationId: input.clientMutationId ?? null,
    });
    revalidatePath("/admin/projects");
    revalidatePath(`/admin/projects/${updated.id}/edit`);
    revalidatePath(`/projects/${updated.slug}`);
    return { ok: true as const };
  }

  const updated = await rollbackContentPostToRevision({
    id: input.entityId,
    revisionId: input.revisionId,
    clientMutationId: input.clientMutationId ?? null,
  });
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${updated.slug}/edit`);
  return { ok: true as const };
}

