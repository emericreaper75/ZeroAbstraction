"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { projectSchema } from "@/lib/validations/project";
import { updateProjectWithRevision } from "@/lib/editorial/projects/project-service";
import { requireRole } from "@/lib/authz/require-role";
import { createRevision } from "@/lib/editorial/revisions/revision-service";
import { invalidateHomepageCache } from "@/lib/homepage/invalidate-homepage";

export async function createProject(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  await requireRole("EDITOR");
  const rawData = {
    title:
        formData.get("title")?.toString() ?? "",

    description:
        formData
        .get("description")
        ?.toString() ?? "",

    content:
        formData.get("content")?.toString() ??
        "",

    tags:
        formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],

    githubUrl:
        formData
        .get("githubUrl")
        ?.toString() ?? "",

    liveUrl:
        formData
        .get("liveUrl")
        ?.toString() ?? "",

    featured:
        formData.get("featured") === "true",

    published:
        formData.get("published") === "true",
    };
  const validatedFields =
    projectSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const {
    title,
    description = "",
    content = "",
    tags = [],
    githubUrl = "",
    liveUrl = "",
    featured = false,
    published = false,
    } = validatedFields.data;

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const project = await prisma.project.create({
    data: {
        title,
        slug,
        description,
        content,
        tags,
        githubUrl,
        liveUrl,
        featured,
        published,
    },
    });

  // Capture initial version-1 snapshot for revision rollback capability
  await createRevision({
    entityType: "PROJECT",
    entityId: project.id,
    entityVersion: 1,
    reason: "UPDATE",
    snapshot: project,
    clientMutationId: null,
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();

  return {
    error: "",
  };
}

export async function updateProject(
  id: string,
  prevState: {
    error: string;
  },
  formData: FormData
) {
  await requireRole("EDITOR");
  const rawData = {
    title:
      formData.get("title")?.toString() ?? "",

    description:
      formData
        .get("description")
        ?.toString() ?? "",

    content:
      formData.get("content")?.toString() ??
      "",

    tags:
      formData
        .get("tags")
        ?.toString()
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) ?? [],

    githubUrl:
      formData
        .get("githubUrl")
        ?.toString() ?? "",

    liveUrl:
      formData
        .get("liveUrl")
        ?.toString() ?? "",

    featured:
      formData.get("featured") === "true",

    published:
      formData.get("published") === "true",
  };

  const validatedFields =
    projectSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error.issues[0]
          ?.message ||
        "Invalid form data",
    };
  }

  const {
    title,
    description = "",
    content = "",
    tags = [],
    githubUrl = "",
    liveUrl = "",
    featured = false,
    published = false,
  } = validatedFields.data;

  const updated = await updateProjectWithRevision({
    id,
    data: {
      title,
      description,
      content,
      tags,
      githubUrl,
      liveUrl,
      featured,
      published,
      reason: "UPDATE",
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();

  return {
    error: "",
  };
}

export async function autosaveProjectDraft(input: {
  id: string;
  data: {
    title: string;
    description?: string;
    content?: string;
    tags?: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    published?: boolean;
  };
  clientMutationId: string;
}) {
  await requireRole("EDITOR");
  const validatedFields = projectSchema.safeParse({
    ...input.data,
    tags: input.data.tags ?? [],
  });

  if (!validatedFields.success) {
    return {
      ok: false as const,
      error:
        validatedFields.error.issues[0]?.message ||
        "Invalid form data",
    };
  }

  const updated = await updateProjectWithRevision({
    id: input.id,
    data: {
      ...validatedFields.data,
      reason: "AUTOSAVE",
      clientMutationId: input.clientMutationId,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();

  return {
    ok: true as const,
    updatedAt: updated.updatedAt.toISOString(),
    version: updated.version,
  };
}

export async function deleteProject(
  formData: FormData
) {
  await requireRole("EDITOR");
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  // Look up slug before deletion for path invalidation
  const existing = await prisma.project.findUnique({
    where: { id },
    select: { slug: true },
  });

  await prisma.project.deleteMany({
    where: {
      id,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  if (existing) {
    revalidatePath(`/projects/${existing.slug}`);
  }
  revalidatePath("/");
  await invalidateHomepageCache();

  redirect("/admin/projects");
}

export async function toggleProjectPublish(
  formData: FormData
) {
  await requireRole("EDITOR");
  const id = formData.get("id")?.toString();

  const published =
    formData.get("published") === "true";

  if (!id) {
    return;
  }

  const updated = await prisma.project.update({
    where: {
      id,
    },
    data: {
      published: !published,
    },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${updated.slug}`);
  revalidatePath("/");
  await invalidateHomepageCache();
}