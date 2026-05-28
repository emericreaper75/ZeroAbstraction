/**
 * lib/editorial/relationships/resolve-relationships.ts
 *
 * Centralized resolvers for extracting connected editorial content.
 * Responsible for fetching candidates safely, normalizing them,
 * and passing them through the similarity scoring engine.
 */

import { prisma } from '@/lib/db/prisma';
import type { NormalizedEditorialEntity, SimilarityCandidate } from './types';
import { normalizePost, normalizeProject, normalizeResearchLog } from './normalize';
import { rankSimilarEntities } from './similarity';

export interface ResolveOptions {
  limit?: number;
}

/**
 * Resolves connected posts for a given source post.
 * Finds related content within the same domain (Posts).
 */
export async function resolveRelatedPosts(
  source: NormalizedEditorialEntity,
  options?: ResolveOptions
): Promise<SimilarityCandidate[]> {
  const limit = options?.limit ?? 4;

  const rawCandidates = await prisma.contentPost.findMany({
    where: {
      published: true,
      NOT: { id: source.id },
    },
    take: 50, // Avoid pulling entire DB into memory, fetch enough for a good sample
    orderBy: { createdAt: 'desc' },
  });

  const normalizedCandidates = rawCandidates.map(normalizePost);
  return rankSimilarEntities(source, normalizedCandidates, limit);
}

/**
 * Resolves connected projects for a given source entity (can be Post or Project).
 */
export async function resolveRelatedProjects(
  source: NormalizedEditorialEntity,
  options?: ResolveOptions
): Promise<SimilarityCandidate[]> {
  const limit = options?.limit ?? 4;

  const rawCandidates = await prisma.project.findMany({
    where: {
      published: true,
      NOT: { id: source.id },
    },
    take: 50,
    orderBy: { featured: 'desc' },
  });

  const normalizedCandidates = rawCandidates.map(normalizeProject);
  return rankSimilarEntities(source, normalizedCandidates, limit);
}

/**
 * Resolves connected research logs for a given source entity.
 */
export async function resolveRelatedResearch(
  source: NormalizedEditorialEntity,
  options?: ResolveOptions
): Promise<SimilarityCandidate[]> {
  const limit = options?.limit ?? 4;

  const rawCandidates = await prisma.researchLog.findMany({
    where: {
      published: true,
      NOT: { id: source.id },
    },
    take: 50,
    orderBy: { createdAt: 'desc' },
  });

  const normalizedCandidates = rawCandidates.map(normalizeResearchLog);
  return rankSimilarEntities(source, normalizedCandidates, limit);
}
