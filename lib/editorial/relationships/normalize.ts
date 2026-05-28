/**
 * lib/editorial/relationships/normalize.ts
 *
 * Translates underlying raw Prisma models and MDX payloads into
 * standard NormalizedEditorialEntity structures.
 */

import type { Project, ContentPost, ResearchLog } from '@prisma/client';
import type { NormalizedEditorialEntity } from './types';

export function normalizePost(post: ContentPost): NormalizedEditorialEntity {
  return {
    id: post.id,
    type: 'post',
    title: post.title,
    slug: post.slug,
    description: post.description,
    category: post.category,
    tags: post.tags || [],
    technologies: [], // Typically merged from MDX metadata, but empty fallback here
    featuredImage: post.thumbnail,
    createdAt: post.createdAt,
  };
}

export function normalizeProject(project: Project): NormalizedEditorialEntity {
  return {
    id: project.id,
    type: 'project',
    title: project.title,
    slug: project.slug,
    description: project.description,
    category: 'PROJECT', // Projects may not have strict categories, use default
    tags: project.tags || [],
    technologies: [], 
    featuredImage: project.thumbnail,
    createdAt: project.createdAt,
  };
}

export function normalizeResearchLog(log: ResearchLog): NormalizedEditorialEntity {
  return {
    id: log.id,
    type: 'research',
    title: log.title,
    slug: log.slug,
    description: log.abstract || '',
    category: 'RESEARCH', 
    tags: log.tags || [],
    technologies: [],
    series: log.series,
    seriesIndex: log.entryNumber,
    createdAt: log.createdAt,
  };
}

export function normalizeAny(
  entity: any,
  type: 'post' | 'project' | 'research'
): NormalizedEditorialEntity {
  switch (type) {
    case 'post':
      return normalizePost(entity as ContentPost);
    case 'project':
      return normalizeProject(entity as Project);
    case 'research':
      return normalizeResearchLog(entity as ResearchLog);
    default:
      throw new Error(`Unsupported entity type for normalization: ${type}`);
  }
}
