"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/authz/require-role";
import { slugify } from "@/lib/editorial/slug";

// ── Create ─────────────────────────────────────────────────────────────────

export async function createResearchLog(
  prevState: { error: string },
  formData: FormData
) {
  await requireRole("EDITOR");

  const title = formData.get("title")?.toString() ?? "";
  const series = formData.get("series")?.toString() ?? "";
  const abstract = formData.get("abstract")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const tagsRaw = formData.get("tags")?.toString() ?? "";
  const entryNumberRaw = formData.get("entryNumber")?.toString() ?? "0";
  const publishedRaw = formData.get("published");
  const featuredRaw = formData.get("featured");

  if (!title) return { error: "Title is required." };
  if (!series) return { error: "Research series is required." };

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const slug = slugify(title);
  const entryNumber = parseInt(entryNumberRaw, 10) || 0;
  const published = publishedRaw === "true";
  const featured = featuredRaw === "true";

  try {
    await prisma.researchLog.create({
      data: {
        title,
        slug,
        series,
        abstract: abstract || null,
        content: content || null,
        tags,
        entryNumber,
        published,
        featured,
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

  const title = formData.get("title")?.toString() ?? "";
  const series = formData.get("series")?.toString() ?? "";
  const abstract = formData.get("abstract")?.toString() ?? "";
  const content = formData.get("content")?.toString() ?? "";
  const tagsRaw = formData.get("tags")?.toString() ?? "";
  const publishedRaw = formData.get("published");
  const featuredRaw = formData.get("featured");

  if (!title) return { error: "Title is required." };
  if (!series) return { error: "Research series is required." };

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const published = publishedRaw === "true";
  const featured = featuredRaw === "true";

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
