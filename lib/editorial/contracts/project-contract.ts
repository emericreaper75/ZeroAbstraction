/**
 * lib/editorial/contracts/project-contract.ts
 *
 * Project-specific editorial contract.
 * Extends base contract with project-specific metadata.
 */

import { z } from 'zod';
import {
  EditorialBaseMetaSchema,
  mergeEditorialSchemas,
} from './base';
import { EditorialRelationshipMetaSchema } from './relationship';
import { EditorialTimelineMetaSchema } from './timeline';

/**
 * Project-specific fields extending the base contract.
 */
const ProjectSpecificSchema = z.object({
  content: z
    .string()
    .optional()
    .describe('Project description or detailed content'),

  thumbnail: z
    .string()
    .url()
    .optional()
    .describe('Featured image URL for project'),

  thumbnailAlt: z
    .string()
    .max(200)
    .optional()
    .describe('Alt text for featured image'),

  githubUrl: z
    .string()
    .url()
    .optional()
    .describe('GitHub repository URL'),

  liveUrl: z
    .string()
    .url()
    .optional()
    .describe('Live demo or deployed URL'),

  status: z
    .enum(['active', 'completed', 'archived', 'paused'] as const)
    .default('active')
    .describe('Current status of the project'),

  startYear: z
    .number()
    .int()
    .min(2000)
    .optional()
    .describe('Year project was started'),

  endYear: z
    .number()
    .int()
    .min(2000)
    .optional()
    .describe('Year project was completed'),

  domain: z
    .string()
    .optional()
    .describe('Research or engineering domain'),
});

/**
 * Complete project contract combining base, relationships, and timeline metadata.
 */
export const ProjectContractSchema = mergeEditorialSchemas(
  EditorialBaseMetaSchema.merge(ProjectSpecificSchema),
  EditorialRelationshipMetaSchema
).merge(EditorialTimelineMetaSchema);

export type ProjectContract = z.infer<typeof ProjectContractSchema>;

/**
 * Project input schema for mutations (omitting computed fields).
 */
export const ProjectInputSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().max(10000).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  content: z.string().optional(),
  thumbnail: z.string().url().optional(),
  thumbnailAlt: z.string().max(200).optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  status: z.enum(['active', 'completed', 'archived', 'paused']).optional(),
  startYear: z.number().int().min(2000).optional(),
  endYear: z.number().int().min(2000).optional(),
  domain: z.string().optional(),
  relatedProjects: z.array(z.object({
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

export type ProjectInput = z.infer<typeof ProjectInputSchema>;
