import { prisma } from "@/lib/db/prisma";

export async function getFeaturedProjects() {
  return prisma.project.findMany({
    where: {
      published: true,
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });
}
