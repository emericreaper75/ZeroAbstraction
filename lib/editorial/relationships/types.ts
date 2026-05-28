/**
 * lib/editorial/relationships/types.ts
 *
 * Core types for the Editorial Relationship Engine.
 * Defines the normalized entity structure and scoring primitives.
 */

import { ContentCategory } from '@prisma/client';
import type { EditorialTechnology } from '../contracts/relationship';

export type EditorialEntityType = 'post' | 'project' | 'research';

/**
 * Normalized representation of any editorial content piece
 * used for unified scoring and relationship graphing.
 */
export interface NormalizedEditorialEntity {
  id: string;
  type: EditorialEntityType;
  title: string;
  slug: string;
  description: string;
  category: ContentCategory | string;
  tags: string[];
  technologies: EditorialTechnology[];
  series?: string;
  seriesIndex?: number;
  featuredImage?: string | null;
  relationshipScore?: number;
  // Raw metadata from DB/MDX for extended context if needed
  createdAt?: Date | string;
}

/**
 * Weighting configuration for the similarity scoring engine.
 */
export interface SimilarityWeights {
  explicitLink: number;       // Mentions or hardcoded relations
  sharedCategory: number;     // Same domain/category
  sharedTag: number;          // Per shared tag
  sharedTechnology: number;   // Per shared tech
  timelineContinuity: number; // Adjacent in a series
}

export interface SimilarityCandidate {
  entity: NormalizedEditorialEntity;
  score: number;
  matchedFactors: string[];
}

export interface RelationshipGraphNode {
  id: string;
  entity: NormalizedEditorialEntity;
  edges: RelationshipGraphEdge[];
}

export interface RelationshipGraphEdge {
  targetId: string;
  weight: number;
  type: 'explicit' | 'semantic' | 'chronological';
}
