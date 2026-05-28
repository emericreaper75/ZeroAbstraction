"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/authz/require-role";
import { slugify } from "@/lib/editorial/slug";
import { researchLogSchema } from "@/lib/validations/research-log";

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

  try {
    await prisma.researchLog.create({
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

  revalidatePath("/admin/research-logs");
  redirect("/admin/research-logs");
}

// ── Update ─────────────────────────────────────────────────────────────────

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

  try {
    await prisma.researchLog.update({
      where: { id },
      data: {
        title,
        series,
        abstract: abstract || null,
        content: content || null,
        tags,
        published,
        featured,
        updatedAt: new Date(),
      },
    });
  } catch {
    return { error: "Failed to update research log." };
  }

  revalidatePath("/admin/research-logs");
  revalidatePath(`/admin/research-logs/${id}/edit`);
  redirect("/admin/research-logs");
}

// ── Delete ─────────────────────────────────────────────────────────────────

export async function deleteResearchLog(formData: FormData) {
  await requireRole("EDITOR");

  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.researchLog.delete({ where: { id } });

  revalidatePath("/admin/research-logs");
  redirect("/admin/research-logs");
}

// ── Toggle Publish ──────────────────────────────────────────────────────────

export async function toggleResearchLogPublish(formData: FormData) {
  await requireRole("EDITOR");

  const id = formData.get("id")?.toString();
  if (!id) return;

  const existing = await prisma.researchLog.findUnique({ where: { id } });
  if (!existing) return;

  await prisma.researchLog.update({
    where: { id },
    data: { published: !existing.published, updatedAt: new Date() },
  });

  revalidatePath("/admin/research-logs");
}
