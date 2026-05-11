"use server";

import fs from "fs";
import path from "path";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getPostBySlug } from "@/lib/posts/get-post-by-slug";
import { writePost } from "@/lib/posts/write-post";

export async function createPost(
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const title =
    formData.get("title")?.toString() || "";

  const description =
    formData.get("description")?.toString() || "";

  if (title.trim().length < 3) {
    return {
      error:
        "Title must be at least 3 characters",
    };
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

  const postsDirectory = path.join(
    process.cwd(),
    "content/posts"
    );

    if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, {
        recursive: true,
    });
    }

    const filePath = path.join(
    postsDirectory,
    `${slug}.mdx`
    );

  const mdxContent = `---
title: "${title}"
description: "${description}"
published: false
date: "${new Date().toISOString()}"
---

# ${title}

Write your content here.
`;

  fs.writeFileSync(filePath, mdxContent);

  revalidatePath("/admin/posts");

  redirect("/admin/posts");
}

export async function updatePost(
  slug: string,
  prevState: {
    error: string;
  },
  formData: FormData
) {
  const existingPost =
    getPostBySlug(slug);

  if (!existingPost) {
    return {
      error: "Post not found",
    };
  }

  const title =
    formData.get("title")?.toString() || "";

  const description =
    formData.get("description")?.toString() || "";

  const content =
    formData.get("content")?.toString() || "";

  const published =
    formData.get("published") === "true";

  if (title.trim().length < 3) {
    return {
      error:
        "Title must be at least 3 characters",
    };
  }

  writePost({
    slug,
    title,
    description,
    published,
    date: existingPost.date,
    content,
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/blog/${slug}`);

  redirect("/admin/posts");
}


export async function togglePostPublish(
  formData: FormData
) {
  const slug =
    formData.get("slug")?.toString();

  if (!slug) {
    return;
  }

  const existingPost =
    getPostBySlug(slug);

  if (!existingPost) {
    return;
  }

  writePost({
    slug: existingPost.slug,
    title: existingPost.title,
    description:
      existingPost.description,
    published:
      !existingPost.published,
    date: existingPost.date,
    content: existingPost.content,
  });

  revalidatePath("/admin/posts");
  revalidatePath(`/blog/${slug}`);
}

export async function deletePost(
  formData: FormData
) {
  const slug =
    formData.get("slug")?.toString();

  if (!slug) {
    return;
  }

  const filePath = path.join(
    process.cwd(),
    "content/posts",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return;
  }

  fs.unlinkSync(filePath);

  revalidatePath("/admin/posts");
  revalidatePath(`/blog/${slug}`);
}