import { prisma } from "@/lib/db/prisma";

export async function getProjectBySlug(
  slug: string
) {
  return prisma.project.findUnique({
    where: {
      slug,
    },
  });
}