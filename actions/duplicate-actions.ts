"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db/prisma";
import { requireRole } from "@/lib/authz/require-role";
import { slugify } from "@/lib/editorial/slug";

async function uniqueSlug(base: string, exists: (slug: string) => Promise<boolean>) {
  let slug = base;
  let i = 1;
  while (await exists(slug)) {
    slug = `${base}-${i}`;
    i += 1;
  }
  return slug;
}

export async function duplicateProject(input: { id: string }) {
  await requireRole("EDITOR");
  const existing = await prisma.project.findUnique({ where: { id: input.id } });
  if (!existing) return { ok: false as const, error: "Project not found" };

  const base = slugify(`${existing.title}-copy`);
  const slug = await uniqueSlug(base, async (s) => !!(await prisma.project.findUnique({ where: { slug: s } })));

  const created = await prisma.project.create({
    data: {
      title: `${existing.title} (Copy)`,
      slug,
      description: existing.description,
      content: existing.content,
      tags: existing.tags,
      thumbnail: existing.thumbnail,
      thumbnailAlt: existing.thumbnailAlt,
      githubUrl: existing.githubUrl,
      liveUrl: existing.liveUrl,
      featured: false,
      published: false,
    },
  });

  revalidatePath("/admin/projects");
  redirect(`/admin/projects/${created.id}/edit`);
}

export async function duplicatePost(input: { id: string }) {
  await requireRole("EDITOR");
  const existing = await prisma.contentPost.findUnique({ where: { id: input.id } });
  if (!existing) return { ok: false as const, error: "Post not found" };

  const base = slugify(`${existing.title}-copy`);
  const slug = await uniqueSlug(base, async (s) => !!(await prisma.contentPost.findUnique({ where: { slug: s } })));

  const created = await prisma.contentPost.create({
    data: {
      title: `${existing.title} (Copy)`,
      slug,
      description: existing.description,
      content: existing.content,
      category: existing.category,
      tags: existing.tags,
      thumbnail: existing.thumbnail,
      thumbnailAlt: existing.thumbnailAlt,
      featured: false,
      published: false,
    },
  });

  revalidatePath("/admin/posts");
  redirect(`/admin/posts/${created.slug}/edit`);
}

