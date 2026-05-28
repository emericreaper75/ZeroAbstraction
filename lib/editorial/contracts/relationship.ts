/**
 * lib/editorial/contracts/relationship.ts
 *
 * Editorial relationship metadata contract.
 * Defines semantic relationships between content entities for discovery and knowledge graph.
 */

import { z } from 'zod';
import {
  RelationshipType,
} from './taxonomy';

/**
 * Individual relationship reference to another content entity.
 */
export const EditorialRelationshipRefSchema = z.object({
  contentType: z.enum(['post', 'project', 'research'] as const),
  slug: z.string().describe('Slug of the related content'),
  title: z.string().optional().describe('Cached title for quick display'),
  relationshipType: z
    .nativeEnum(RelationshipType)
    .optional()
    .default(RelationshipType.RELATED)
    .describe('How this content relates to the linked content'),
});

export type EditorialRelationshipRef = z.infer<
  typeof EditorialRelationshipRefSchema
>;

/**
 * Concept reference for knowledge graph.
 */
export const EditorialConceptSchema = z.object({
  name: z.string().describe('Name of the concept'),
  namespace: z
    .string()
    .optional()
    .describe('Optional namespace for disambiguation'),
  confidence: z
    .number()
    .min(0)
    .max(1)
    .optional()
    .default(1)
    .describe('Confidence level of this concept extraction (0-1)'),
});

export type EditorialConcept = z.infer<typeof EditorialConceptSchema>;

/**
 * Technology reference for knowledge of tools, languages, frameworks used.
 */
export const EditorialTechnologySchema = z.object({
  name: z.string().describe('Name of the technology'),
  category: z
    .enum(['language', 'framework', 'tool', 'library', 'platform'] as const)
    .optional()
    .describe('Category of technology'),
  role: z
    .string()
    .optional()
    .describe('How it was used in this content (e.g., "implementation", "analysis")'),
});

export type EditorialTechnology = z.infer<typeof EditorialTechnologySchema>;

/**
 * Full relationship metadata schema.
 * Enriches editorial content with semantic connections.
 */
export const EditorialRelationshipMetaSchema = z.object({
  relatedPosts: z
    .array(EditorialRelationshipRefSchema)
    .default([])
    .describe('Links to related posts in the same domain'),

  relatedProjects: z
    .array(EditorialRelationshipRefSchema)
    .default([])
    .describe('Links to related projects'),

  relatedResearch: z
    .array(EditorialRelationshipRefSchema)
    .default([])
    .describe('Links to related research logs'),

  concepts: z
    .array(EditorialConceptSchema)
    .default([])
    .describe(
      'Key concepts discussed in this content (for knowledge graph and discovery)'
    ),

  technologies: z
    .array(EditorialTechnologySchema)
    .default([])
    .describe(
      'Technologies, languages, and frameworks mentioned or used in content'
    ),

  series: z
    .string()
    .optional()
    .describe('Optional series identifier for multi-part content or research series'),

  seriesIndex: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Position in series (0-indexed)'),

  seriesTotal: z
    .number()
    .int()
    .min(1)
    .optional()
    .describe('Total number of entries in series'),
});

export type EditorialRelationshipMeta = z.infer<
  typeof EditorialRelationshipMetaSchema
>;
