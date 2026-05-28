/**
 * lib/editorial/relationships/graph.ts
 *
 * Provides bidirectional graph utilities for the Editorial Relationship Engine.
 * Enables connected content discovery, relationship traversal, and mapping.
 */

import type { NormalizedEditorialEntity, RelationshipGraphNode, SimilarityCandidate } from './types';

/**
 * Converts a set of similarity candidate results into graph edges.
 */
export function buildEdgesFromCandidates(
  sourceId: string,
  candidates: SimilarityCandidate[]
): RelationshipGraphNode {
  // A mock entity since we only have the ID of the source right now
  // In a full implementation, you would pass the full source entity
  const mockSourceEntity: NormalizedEditorialEntity = {
    id: sourceId,
    type: 'post',
    title: '',
    slug: '',
    description: '',
    category: '',
    tags: [],
    technologies: []
  };

  return {
    id: sourceId,
    entity: mockSourceEntity,
    edges: candidates.map((c) => ({
      targetId: c.entity.id,
      weight: c.score,
      // For now, assume semantic unless explicitly marked
      type: c.matchedFactors.includes('Timeline Continuity') ? 'chronological' : 'semantic',
    })),
  };
}

/**
 * Example future graph utility: Finds the shortest path or strong connections
 * traversing multiple relationships.
 */
export function findConnectedCluster(
  seedEntity: NormalizedEditorialEntity,
  maxDepth = 2
) {
  // Skeleton for future knowledge graph expansion
  // Would iteratively call `resolveRelated*` to build a localized graph
  return {
    seed: seedEntity.id,
    maxDepth,
    nodes: [],
    edges: []
  };
}
