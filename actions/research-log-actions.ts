"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/authz/require-role";
import { slugify } from "@/lib/editorial/slug";
import { researchLogSchema } from "@/lib/validations/research-log";
import { createRevision } from "@/lib/editorial/revisions/revision-service";
import { updateResearchLogWithRevision } from "@/lib/editorial/research-logs/research-log-service";
import { invalidateHomepageCache } from "@/lib/homepage/invalidate-homepage";

// ── Create ─────────────────────────────────────────────────────────────────

export async function createResearchLog(
  prevState: { error: string },
  formData: FormData
) {
  await requireRole("EDITOR");

  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    series: formData.get("series")?.toString() ?? "",
    abstract: formData.get("abstract")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [],
    entryNumber: parseInt(formData.get("entryNumber")?.toString() ?? "0", 10) || 0,
    published: formData.get("published") === "true",
    featured: formData.get("featured") === "true",
  };

  const validated = researchLogSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      error:
        validated.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const { title, series, abstract, content, tags, entryNumber, published, featured } = validated.data;
  const slug = slugify(title);

  let researchLog;
  try {
    researchLog = await prisma.researchLog.create({
      data: {
        title,
        slug,
        series,
        abstract: abstract || null,
        content: content || null,
        tags: tags ?? [],
        entryNumber: entryNumber ?? 0,
        published: published ?? false,
        featured: featured ?? false,
      },
    });
  } catch (e: unknown) {
    if (
      e instanceof Error &&
      e.message.includes("Unique constraint failed")
    ) {
      return { error: "An entry with this title or entry number already exists." };
    }
    return { error: "Failed to create research log." };
  }

  // Capture initial version-1 snapshot for revision rollback capability
  await createRevision({
    entityType: "RESEARCH_LOG",
    entityId: researchLog.id,
    entityVersion: 1,
    reason: "UPDATE",
    snapshot: researchLog,
    clientMutationId: null,
  });

  revalidatePath("/admin/research-logs");
  revalidatePath("/research");
  revalidatePath(`/research/${slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();

  redirect("/admin/research-logs");
}

// ── Update (revision-tracked) ──────────────────────────────────────────────

export async function updateResearchLog(
  id: string,
  prevState: { error: string },
  formData: FormData
) {
  await requireRole("EDITOR");

  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    series: formData.get("series")?.toString() ?? "",
    abstract: formData.get("abstract")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [],
    published: formData.get("published") === "true",
    featured: formData.get("featured") === "true",
  };

  const validated = researchLogSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      error:
        validated.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const { title, series, abstract, content, tags, published, featured } = validated.data;

  let updated;
  try {
    updated = await updateResearchLogWithRevision({
      id,
      data: {
        title,
        series,
        abstract: abstract || null,
        content: content || null,
        tags,
        published,
        featured,
        reason: "UPDATE",
      },
    });
  } catch {
    return { error: "Failed to update research log." };
  }

  revalidatePath("/admin/research-logs");
  revalidatePath(`/admin/research-logs/${id}/edit`);
  revalidatePath("/research");
  revalidatePath(`/research/${updated.slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();

  redirect("/admin/research-logs");
}

// ── Delete ─────────────────────────────────────────────────────────────────

export async function deleteResearchLog(formData: FormData) {
  await requireRole("EDITOR");

  const id = formData.get("id")?.toString();
  if (!id) return;

  // Look up slug before deletion for path invalidation
  const existing = await prisma.researchLog.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.researchLog.delete({ where: { id } });

  revalidatePath("/admin/research-logs");
  revalidatePath("/research");
  if (existing) {
    revalidatePath(`/research/${existing.slug}`);
  }
  revalidatePath("/");
  await invalidateHomepageCache();

  redirect("/admin/research-logs");
}

// ── Toggle Publish (revision-tracked) ───────────────────────────────────────

export async function toggleResearchLogPublish(formData: FormData) {
  await requireRole("EDITOR");

  const id = formData.get("id")?.toString();
  if (!id) return;

  const existing = await prisma.researchLog.findUnique({ where: { id } });
  if (!existing) return;

  await updateResearchLogWithRevision({
    id,
    data: {
      title: existing.title,
      series: existing.series,
      abstract: existing.abstract,
      content: existing.content,
      tags: existing.tags,
      featured: existing.featured,
      published: !existing.published,
      reason: existing.published ? "UNPUBLISH" : "PUBLISH",
      clientMutationId: `${Date.now()}-${id}`,
    },
  });

  revalidatePath("/admin/research-logs");
  revalidatePath("/research");
  revalidatePath(`/research/${existing.slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();
}
