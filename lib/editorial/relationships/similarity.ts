/**
 * lib/editorial/relationships/similarity.ts
 *
 * Weighted similarity engine that evaluates candidates against a source entity.
 * Uses deterministic formulas without relying on AI embeddings.
 */

import type { NormalizedEditorialEntity, SimilarityCandidate, SimilarityWeights } from './types';
import {
  calculateStringOverlap,
  calculateTechnologyOverlap,
  calculateCategoryAffinity,
  calculateTimelineContinuity,
} from './scoring';

const DEFAULT_WEIGHTS: SimilarityWeights = {
  explicitLink: 10,
  sharedCategory: 2,
  sharedTag: 1,
  sharedTechnology: 1.5,
  timelineContinuity: 5,
};

/**
 * Calculates a composite similarity score between a source entity and a candidate.
 */
export function calculateSimilarity(
  source: NormalizedEditorialEntity,
  candidate: NormalizedEditorialEntity,
  weights: SimilarityWeights = DEFAULT_WEIGHTS
): SimilarityCandidate {
  let score = 0;
  const matchedFactors: string[] = [];

  // Semantic Tag Overlap
  const tagOverlap = calculateStringOverlap(source.tags, candidate.tags);
  if (tagOverlap > 0) {
    score += tagOverlap * weights.sharedTag;
    matchedFactors.push(`Shared Tags (${tagOverlap})`);
  }

  // Technology Overlap
  const techOverlap = calculateTechnologyOverlap(source.technologies, candidate.technologies);
  if (techOverlap > 0) {
    score += techOverlap * weights.sharedTechnology;
    matchedFactors.push(`Shared Tech (${techOverlap})`);
  }

  // Category Affinity
  if (calculateCategoryAffinity(source, candidate)) {
    score += weights.sharedCategory;
    matchedFactors.push('Same Category');
  }

  // Timeline Continuity
  if (calculateTimelineContinuity(source, candidate)) {
    score += weights.timelineContinuity;
    matchedFactors.push('Timeline Continuity');
  }

  return {
    entity: candidate,
    score,
    matchedFactors,
  };
}

/**
 * Ranks a list of candidates against a source entity and returns the top matches.
 * Automatically excludes the source entity itself if present in candidates.
 */
export function rankSimilarEntities(
  source: NormalizedEditorialEntity,
  candidates: NormalizedEditorialEntity[],
  limit = 4,
  weights: SimilarityWeights = DEFAULT_WEIGHTS
): SimilarityCandidate[] {
  return candidates
    .filter((c) => c.id !== source.id) // Do not recommend self
    .map((c) => calculateSimilarity(source, c, weights))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
