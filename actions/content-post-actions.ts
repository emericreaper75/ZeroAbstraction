"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ContentCategory } from "@prisma/client";

import { prisma } from "@/lib/db/prisma";
import { contentPostSchema } from "@/lib/validations/content-post";
import { slugify } from "@/lib/editorial/slug";
import { updateContentPostWithRevision } from "@/lib/editorial/posts/content-post-service";
import { requireRole } from "@/lib/authz/require-role";
import { createRevision } from "@/lib/editorial/revisions/revision-service";
import { CATEGORY_ENUM_TO_ROUTE } from "@/lib/editorial/categories";
import { invalidateHomepageCache } from "@/lib/homepage/invalidate-homepage";

/** Revalidate all public paths affected by a content post mutation. */
function revalidatePostPaths(category: ContentCategory, slug: string) {
  const routeCategory = CATEGORY_ENUM_TO_ROUTE[category];
  revalidatePath("/admin/posts");
  revalidatePath(`/${routeCategory}`);
  revalidatePath(`/${routeCategory}/${slug}`);
  revalidatePath("/blog");
  revalidatePath("/");
}

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

  const post = await prisma.contentPost.create({
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

  // Capture initial version-1 snapshot for revision rollback capability
  await createRevision({
    entityType: "POST",
    entityId: post.id,
    entityVersion: 1,
    reason: "UPDATE",
    snapshot: post,
    clientMutationId: null,
  });

  revalidatePostPaths(validated.data.category, slug);
  await invalidateHomepageCache();

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

  revalidatePostPaths(updated.category, updated.slug);
  revalidatePath(`/admin/posts/${updated.id}/edit`);
  await invalidateHomepageCache();

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

  revalidatePostPaths(updated.category, updated.slug);
  await invalidateHomepageCache();

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

  // Look up before deletion for path invalidation
  const existing = await prisma.contentPost.findUnique({
    where: { id },
    select: { category: true, slug: true },
  });

  await prisma.contentPost.deleteMany({
    where: { id },
  });

  if (existing) {
    revalidatePostPaths(existing.category, existing.slug);
  } else {
    revalidatePath("/admin/posts");
  }
  await invalidateHomepageCache();

  redirect("/admin/posts");
}

export async function toggleContentPostPublish(formData: FormData) {
  await requireRole("EDITOR");
  const id = formData.get("id")?.toString();
  if (!id) return;

  const existing = await prisma.contentPost.findUnique({
    where: { id },
  });
  if (!existing) return;

  const updated = await updateContentPostWithRevision({
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

  revalidatePostPaths(updated.category, updated.slug);
  await invalidateHomepageCache();
}
