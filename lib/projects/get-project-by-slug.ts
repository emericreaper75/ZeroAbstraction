import { prisma } from "@/lib/db/prisma";
import { cache } from "react";

export const getProjectBySlug = cache(async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
  });
});