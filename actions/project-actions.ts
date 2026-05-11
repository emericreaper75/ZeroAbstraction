"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { projectSchema } from "@/lib/validations/project";

export async function createProject(
  prevState: {
    error: string;
  },
  formData: FormData
) {
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

  await prisma.project.create({
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

  revalidatePath("/admin/projects");

  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  prevState: {
    error: string;
  },
  formData: FormData
) {
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

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  await prisma.project.update({
    where: {
      id,
    },
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

  revalidatePath("/admin/projects");
  revalidatePath(`/projects/${slug}`);

  redirect("/admin/projects");
}

export async function deleteProject(
  formData: FormData
) {
  const id = formData.get("id")?.toString();

  if (!id) {
    return;
  }

  await prisma.project.deleteMany({
    where: {
      id,
    },
  });

  revalidatePath("/admin/projects");
}

export async function toggleProjectPublish(
  formData: FormData
) {
  const id = formData.get("id")?.toString();

  const published =
    formData.get("published") === "true";

  if (!id) {
    return;
  }

  await prisma.project.update({
    where: {
      id,
    },
    data: {
      published: !published,
    },
  });

  revalidatePath("/admin/projects");
}