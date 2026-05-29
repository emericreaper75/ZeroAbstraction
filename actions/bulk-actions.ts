"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/authz/require-role";
import { updateProjectWithRevision } from "@/lib/editorial/projects/project-service";
import { updateContentPostWithRevision } from "@/lib/editorial/posts/content-post-service";
import { invalidateHomepageCache } from "@/lib/homepage/invalidate-homepage";

const BulkOpSchema = z.object({
  entity: z.enum(["post", "project"]),
  operation: z.enum(["publish", "unpublish", "feature", "unfeature", "delete"]),
  ids: z.array(z.string().min(1)).min(1),
});

export async function bulkOperate(input: z.infer<typeof BulkOpSchema>) {
  await requireRole("EDITOR");
  const parsed = BulkOpSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { entity, operation, ids } = parsed.data;

  if (entity === "project") {
    if (operation === "delete") {
      await prisma.project.deleteMany({ where: { id: { in: ids } } });
    } else {
      for (const id of ids) {
        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing) continue;
        await updateProjectWithRevision({
          id,
          data: {
            title: existing.title,
            description: existing.description,
            content: existing.content ?? "",
            tags: existing.tags,
            githubUrl: existing.githubUrl ?? "",
            liveUrl: existing.liveUrl ?? "",
            featured:
              operation === "feature"
                ? true
                : operation === "unfeature"
                  ? false
                  : existing.featured,
            published:
              operation === "publish"
                ? true
                : operation === "unpublish"
                  ? false
                  : existing.published,
            reason: "BULK_OPERATION",
            clientMutationId: `${Date.now()}-${operation}-${id}`,
          },
        });
      }
    }
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
    await invalidateHomepageCache();
    return { ok: true as const };
  }

  // posts
  if (operation === "delete") {
    await prisma.contentPost.deleteMany({ where: { id: { in: ids } } });
  } else {
    for (const id of ids) {
      const existing = await prisma.contentPost.findUnique({ where: { id } });
      if (!existing) continue;
      await updateContentPostWithRevision({
        id,
        data: {
          title: existing.title,
          description: existing.description,
          content: existing.content ?? "",
          category: existing.category,
          tags: existing.tags,
          featured:
            operation === "feature"
              ? true
              : operation === "unfeature"
                ? false
                : existing.featured,
          published:
            operation === "publish"
              ? true
              : operation === "unpublish"
                ? false
                : existing.published,
          thumbnail: existing.thumbnail,
          thumbnailAlt: existing.thumbnailAlt,
          reason: "BULK_OPERATION",
          clientMutationId: `${Date.now()}-${operation}-${id}`,
        },
      });
    }
  }
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/");
  await invalidateHomepageCache();
  return { ok: true as const };
}

