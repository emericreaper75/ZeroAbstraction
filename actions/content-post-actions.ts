"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ContentCategory } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { contentPostSchema } from "@/lib/validations/content-post";
import { slugify } from "@/lib/editorial/slug";
import { updateContentPostWithRevision } from "@/lib/editorial/posts/content-post-service";
import { requireRole } from "@/lib/authz/require-role";

export async function createContentPost(
  prevState: { error: string },
  formData: FormData
) {
  await requireRole("EDITOR");
  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    category: (formData.get("category")?.toString() ??
      "ELECTRONICS") as ContentCategory,
    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [],
    featured: formData.get("featured") === "true",
    published: formData.get("published") === "true",
    thumbnail: formData.get("thumbnail")?.toString() ?? "",
    thumbnailAlt: formData.get("thumbnailAlt")?.toString() ?? "",
  };

  const validated = contentPostSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      error:
        validated.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const slug = slugify(validated.data.title);

  await prisma.contentPost.create({
    data: {
      title: validated.data.title,
      slug,
      description: validated.data.description ?? "",
      content: validated.data.content ?? "",
      category: validated.data.category,
      tags: validated.data.tags ?? [],
      featured: validated.data.featured ?? false,
      published: validated.data.published ?? false,
      thumbnail: validated.data.thumbnail || null,
      thumbnailAlt: validated.data.thumbnailAlt || null,
    },
  });

  revalidatePath("/admin/posts");
  redirect("/admin/posts");
}

export async function updateContentPost(
  id: string,
  prevState: { error: string },
  formData: FormData
) {
  await requireRole("EDITOR");
  const rawData = {
    title: formData.get("title")?.toString() ?? "",
    description: formData.get("description")?.toString() ?? "",
    content: formData.get("content")?.toString() ?? "",
    category: (formData.get("category")?.toString() ??
      "ELECTRONICS") as ContentCategory,
    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean) ?? [],
    featured: formData.get("featured") === "true",
    published: formData.get("published") === "true",
    thumbnail: formData.get("thumbnail")?.toString() ?? "",
    thumbnailAlt: formData.get("thumbnailAlt")?.toString() ?? "",
  };

  const validated = contentPostSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      error:
        validated.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const updated = await updateContentPostWithRevision({
    id,
    data: {
      ...validated.data,
      tags: validated.data.tags ?? [],
      reason: "UPDATE",
    },
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${updated.id}/edit`);
  redirect("/admin/posts");
}

export async function autosaveContentPostDraft(input: {
  id: string;
  data: {
    title: string;
    description?: string;
    content?: string;
    category: ContentCategory;
    tags?: string[];
    featured?: boolean;
    published?: boolean;
    thumbnail?: string;
    thumbnailAlt?: string;
  };
  clientMutationId: string;
}) {
  await requireRole("EDITOR");
  const validated = contentPostSchema.safeParse({
    ...input.data,
    tags: input.data.tags ?? [],
  });
  if (!validated.success) {
    return {
      ok: false as const,
      error:
        validated.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const updated = await updateContentPostWithRevision({
    id: input.id,
    data: {
      ...validated.data,
      tags: validated.data.tags ?? [],
      reason: "AUTOSAVE",
      clientMutationId: input.clientMutationId,
    },
  });

  revalidatePath("/admin/posts");
  return {
    ok: true as const,
    updatedAt: updated.updatedAt.toISOString(),
    version: updated.version,
  };
}

export async function deleteContentPost(formData: FormData) {
  await requireRole("EDITOR");
  const id = formData.get("id")?.toString();
  if (!id) return;

  await prisma.contentPost.deleteMany({
    where: { id },
  });

  revalidatePath("/admin/posts");
}

export async function toggleContentPostPublish(formData: FormData) {
  await requireRole("EDITOR");
  const id = formData.get("id")?.toString();
  if (!id) return;

  const existing = await prisma.contentPost.findUnique({
    where: { id },
  });
  if (!existing) return;

  await updateContentPostWithRevision({
    id,
    data: {
      title: existing.title,
      description: existing.description,
      content: existing.content ?? "",
      category: existing.category,
      tags: existing.tags,
      featured: existing.featured,
      published: !existing.published,
      thumbnail: existing.thumbnail,
      thumbnailAlt: existing.thumbnailAlt,
      reason: existing.published ? "UNPUBLISH" : "PUBLISH",
      clientMutationId: `${Date.now()}-${id}`,
    },
  });

  revalidatePath("/admin/posts");
}

