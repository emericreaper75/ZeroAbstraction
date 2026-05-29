"use server";

import { revalidatePath } from "next/cache";

import type { RevisionEntityType } from "@prisma/client";

import { rollbackProjectToRevision } from "@/lib/editorial/projects/project-service";
import { rollbackContentPostToRevision } from "@/lib/editorial/posts/content-post-service";
import { rollbackResearchLogToRevision } from "@/lib/editorial/research-logs/research-log-service";
import { invalidateHomepageCache } from "@/lib/homepage/invalidate-homepage";

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
    revalidatePath("/projects");
    revalidatePath(`/projects/${updated.slug}`);
    revalidatePath("/");
    await invalidateHomepageCache();
    return { ok: true as const };
  }

  if (input.entityType === "RESEARCH_LOG") {
    const updated = await rollbackResearchLogToRevision({
      id: input.entityId,
      revisionId: input.revisionId,
      clientMutationId: input.clientMutationId ?? null,
    });
    revalidatePath("/admin/research-logs");
    revalidatePath(`/admin/research-logs/${updated.id}/edit`);
    revalidatePath("/research");
    revalidatePath(`/research/${updated.slug}`);
    revalidatePath("/");
    await invalidateHomepageCache();
    return { ok: true as const };
  }

  // Default: POST
  const updated = await rollbackContentPostToRevision({
    id: input.entityId,
    revisionId: input.revisionId,
    clientMutationId: input.clientMutationId ?? null,
  });
  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${updated.slug}/edit`);
  revalidatePath("/blog");
  revalidatePath("/");
  await invalidateHomepageCache();
  return { ok: true as const };
}
