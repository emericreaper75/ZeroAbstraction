import { prisma } from "@/lib/db/prisma";
import { cache } from "react";

export const getProjects = cache(async function getProjects() {
  return prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      tags: true,
      featured: true,
      published: true,
      createdAt: true,
      updatedAt: true,
      thumbnail: true,
      thumbnailAlt: true,
      githubUrl: true,
      liveUrl: true,
      content: true,
    },
  });
});