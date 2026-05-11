import { prisma } from "@/lib/db/prisma";

export async function getProjects() {
  return prisma.project.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}