import { prisma } from '@/lib/db/prisma';
import { TimelineEntry, timelineEntries } from '@/lib/timeline';

/**
 * Server-only: returns timeline entries with `href` fields validated against
 * the live Prisma database.
 *
 * For every entry that carries a `contentType` link, we verify that a record
 * with the derived slug actually exists and is published.  If it doesn't, the
 * `href` is stripped so `TimelineItem` renders gracefully without a broken link.
 *
 * Call this only from Server Components — it is async and hits the DB.
 */
export async function getTimelineEntriesWithValidation(): Promise<TimelineEntry[]> {
  // Collect the slugs referenced by each content type in a single pass
  const projectSlugs: string[] = [];
  const postSlugs: string[] = [];
  const researchSlugs: string[] = [];

  for (const entry of timelineEntries) {
    if (!entry.href || !entry.contentType) continue;

    const slug = entry.href.split('/').filter(Boolean).pop() ?? '';
    if (!slug) continue;

    if (entry.contentType === 'project') projectSlugs.push(slug);
    else if (entry.contentType === 'post') postSlugs.push(slug);
    else if (entry.contentType === 'research') researchSlugs.push(slug);
  }

  // Batch-fetch only the slugs that exist in the DB (published only)
  const [existingProjects, existingPosts, existingResearch] = await Promise.all([
    projectSlugs.length > 0
      ? prisma.project.findMany({
          where: { slug: { in: projectSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
    postSlugs.length > 0
      ? prisma.contentPost.findMany({
          where: { slug: { in: postSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
    researchSlugs.length > 0
      ? prisma.researchLog.findMany({
          where: { slug: { in: researchSlugs }, published: true },
          select: { slug: true },
        })
      : Promise.resolve([]),
  ]);

  const validProjectSlugs = new Set(existingProjects.map((p) => p.slug));
  const validPostSlugs = new Set(existingPosts.map((p) => p.slug));
  const validResearchSlugs = new Set(existingResearch.map((r) => r.slug));

  return timelineEntries.map((entry) => {
    if (!entry.href || !entry.contentType) return entry;

    const slug = entry.href.split('/').filter(Boolean).pop() ?? '';

    const isValid =
      (entry.contentType === 'project' && validProjectSlugs.has(slug)) ||
      (entry.contentType === 'post' && validPostSlugs.has(slug)) ||
      (entry.contentType === 'research' && validResearchSlugs.has(slug));

    if (!isValid) {
      // Strip the broken link so TimelineItem renders without a dead href
      const { href: _removed, ...rest } = entry;
      return rest as TimelineEntry;
    }

    return entry;
  });
}
