import { prisma } from '@/lib/db/prisma';
import { timelineEntries, TimelineEntry } from '@/lib/timeline';
import { ContentNode, ScoredNode } from './types';
import { calculateStringOverlap } from '@/lib/editorial/relationships/scoring';

// Singleton cache for graph nodes to ensure SSR performance
let nodesCache: ContentNode[] | null = null;

export async function getGraphNodes(): Promise<ContentNode[]> {
  if (nodesCache) {
    return nodesCache;
  }

  const nodes: ContentNode[] = [];

  // 1. Load Posts from Prisma
  const posts = await prisma.contentPost.findMany({
    where: { published: true },
  });
  for (const post of posts) {
    nodes.push({
      id: `post:${post.slug}`,
      type: 'post',
      title: post.title,
      description: post.description,
      date: post.createdAt.toISOString(),
      url: `/${post.category.toLowerCase().replace('_', '-')}/${post.slug}`,
      tags: post.tags,
      category: post.category.toLowerCase().replace('_', '-'),
      raw: post,
    });
  }

  // 2. Load Projects from Prisma
  const projects = await prisma.project.findMany({
    where: { published: true },
  });
  for (const proj of projects) {
    nodes.push({
      id: `project:${proj.slug}`,
      type: 'project',
      title: proj.title,
      description: proj.description,
      date: proj.createdAt.toISOString(),
      url: `/projects/${proj.slug}`,
      tags: proj.tags,
      category: 'project', // Domains might be tags in DB
      raw: proj,
    });
  }

  // 3. Load Research Logs from Prisma
  const researchLogs = await prisma.researchLog.findMany({
    where: { published: true },
  });
  
  for (const log of researchLogs) {
    nodes.push({
      id: `research:${log.slug}`,
      type: 'research',
      title: log.title,
      description: log.abstract ?? '',
      date: log.createdAt.toISOString(),
      url: `/research/${log.slug}`,
      tags: log.tags,
      category: 'research',
      raw: log,
    });
  }

  // 4. Load Timeline Entries from static file
  for (const entry of timelineEntries) {
    nodes.push({
      id: `timeline:${entry.id}`,
      type: 'timeline',
      title: entry.title,
      description: entry.description,
      date: entry.date,
      url: `/timeline#${entry.id}`,
      tags: entry.tags || [],
      category: entry.category,
      raw: entry,
    });
  }

  nodesCache = nodes;
  return nodes;
}

export async function getRelatedNodes(
  sourceId: string,
  limit = 4
): Promise<ScoredNode[]> {
  const allNodes = await getGraphNodes();
  const sourceNode = allNodes.find((n) => n.id === sourceId);

  if (!sourceNode) return [];

  const sourceDate = sourceNode.date ? new Date(sourceNode.date).getTime() : null;
  const scored: ScoredNode[] = [];

  for (const target of allNodes) {
    if (target.id === sourceNode.id) continue;

    let score = 0;
    const reasons: string[] = [];

    // 1. Tag overlap (weighted highly)
    const overlap = calculateStringOverlap(sourceNode.tags, target.tags);
    if (overlap > 0) {
      score += overlap * 2;
      reasons.push(`Shares ${overlap} tag(s)`);
    }

    // 2. Category / Domain sharing
    if (sourceNode.category === target.category && sourceNode.category !== 'all') {
      score += 1.5;
      reasons.push('Same category');
    }

    // 3. Explicit Timeline Linking — exact URL match only
    if (sourceNode.type === 'timeline') {
      const href = (sourceNode.raw as TimelineEntry).href;
      if (href && target.url === href) {
        score += 10;
        reasons.push('Directly referenced in timeline');
      }
    } else if (target.type === 'timeline') {
      const href = (target.raw as TimelineEntry).href;
      if (href && sourceNode.url === href) {
        score += 10;
        reasons.push('Referenced in timeline event');
      }
    }

    // 4. Temporal proximity — minor boost for content published close in time
    if (sourceDate && target.date) {
      const targetDate = new Date(target.date).getTime();
      const diffDays = Math.abs(sourceDate - targetDate) / (1000 * 60 * 60 * 24);
      if (diffDays <= 180) {
        score += 1.0;
        reasons.push('Published around the same time');
      } else if (diffDays <= 365) {
        score += 0.5;
      }
    }

    if (score > 0) {
      scored.push({ node: target, score, reasons });
    }
  }

  // Sort by score descending
  const sorted = scored.sort((a, b) => b.score - a.score);

  // Ensure type diversity: if top results are all same type as source,
  // promote the highest-scoring different type to position 1 (if present).
  if (sorted.length >= 2) {
    const allSameType = sorted.slice(0, limit).every(
      (s) => s.node.type === sourceNode.type
    );
    if (allSameType) {
      const diffTypeIdx = sorted.findIndex((s) => s.node.type !== sourceNode.type);
      if (diffTypeIdx > 0 && diffTypeIdx < sorted.length) {
        const [diffNode] = sorted.splice(diffTypeIdx, 1);
        sorted.splice(1, 0, diffNode);
      }
    }
  }

  return sorted.slice(0, limit);
}
