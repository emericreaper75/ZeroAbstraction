/**
 * lib/editorial/contracts/research-contract.ts
 *
 * Research log-specific editorial contract.
 * Extends base contract with research-specific metadata.
 */

import { z } from 'zod';
import {
  EditorialBaseMetaSchema,
  mergeEditorialSchemas,
} from './base';
import { EditorialRelationshipMetaSchema } from './relationship';
import { EditorialTimelineMetaSchema } from './timeline';

/**
 * Research-specific fields extending the base contract.
 */
const ResearchSpecificSchema = z.object({
  entryNumber: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Sequential entry number in research series'),

  series: z
    .string()
    .min(1)
    .describe('Research series identifier'),

  abstract: z
    .string()
    .max(5000)
    .optional()
    .describe('Abstract or summary of research findings'),

  content: z
    .string()
    .optional()
    .describe('Full research log content'),

  methodology: z
    .string()
    .optional()
    .describe('Methodology or approach used'),

  findings: z
    .array(z.string())
    .optional()
    .default([])
    .describe('Key findings from the research'),

  futureWork: z
    .string()
    .optional()
    .describe('Directions for future investigation'),

  citations: z
    .array(z.object({
      key: z.string(),
      title: z.string(),
      authors: z.array(z.string()).optional(),
      year: z.number().int().optional(),
      url: z.string().url().optional(),
    }))
    .optional()
    .default([])
    .describe('Academic citations referenced in research'),

  datasetUrl: z
    .string()
    .url()
    .optional()
    .describe('URL to research dataset or supporting materials'),

  reproducibilityScore: z
    .number()
    .min(0)
    .max(1)
    .optional()
    .describe('Score indicating reproducibility level (0-1)'),
});

/**
 * Complete research contract combining base, relationships, and timeline metadata.
 */
export const ResearchContractSchema = mergeEditorialSchemas(
  EditorialBaseMetaSchema.merge(ResearchSpecificSchema),
  EditorialRelationshipMetaSchema
).merge(EditorialTimelineMetaSchema);

export type ResearchContract = z.infer<typeof ResearchContractSchema>;

/**
 * Research input schema for mutations (omitting computed fields).
 */
export const ResearchInputSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  series: z.string().min(1),
  entryNumber: z.number().int().min(0).optional(),
  abstract: z.string().max(5000).optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  methodology: z.string().optional(),
  findings: z.array(z.string()).optional(),
  futureWork: z.string().optional(),
  citations: z.array(z.object({
    key: z.string(),
    title: z.string(),
    authors: z.array(z.string()).optional(),
    year: z.number().int().optional(),
    url: z.string().url().optional(),
  })).optional(),
  datasetUrl: z.string().url().optional(),
  reproducibilityScore: z.number().min(0).max(1).optional(),
  relatedResearch: z.array(z.object({
    slug: z.string(),
    relationshipType: z.string().optional(),
  })).optional(),
  concepts: z.array(z.object({
    name: z.string(),
    namespace: z.string().optional(),
  })).optional(),
  technologies: z.array(z.object({
    name: z.string(),
    category: z.string().optional(),
    role: z.string().optional(),
  })).optional(),
});

export type ResearchInput = z.infer<typeof ResearchInputSchema>;
