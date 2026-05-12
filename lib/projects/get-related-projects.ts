import { prisma } from '@/lib/db/prisma';
import { tagOverlapScore } from '@/lib/related/similarity';

export async function getRelatedProjects(opts: { projectId: string; tags: string[]; limit?: number }) {
  const { projectId, tags, limit = 3 } = opts;

  // Keep it simple + maintainable: fetch a small candidate set, score in JS.
  const candidates = await prisma.project.findMany({
    where: {
      published: true,
      NOT: { id: projectId },
    },
    orderBy: { featured: 'desc' },
    take: 50,
  });

  return candidates
    .map((p) => ({ project: p, score: tagOverlapScore(p.tags, tags) + (p.featured ? 0.25 : 0) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.project);
}

