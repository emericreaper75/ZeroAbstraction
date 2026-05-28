/**
 * lib/editorial/contracts/post-contract.ts
 *
 * Post-specific editorial contract.
 * Extends base contract with post-specific metadata.
 */

import { z } from 'zod';
import {
  EditorialBaseMetaSchema,
  createEditorialSchema,
  mergeEditorialSchemas,
} from './base';
import { EditorialRelationshipMetaSchema } from './relationship';
import { EditorialTimelineMetaSchema } from './timeline';
import { ContentCategory } from './taxonomy';

/**
 * Post-specific fields extending the base contract.
 */
const PostSpecificSchema = z.object({
  category: z
    .nativeEnum(ContentCategory)
    .describe('Content category for post organization'),

  thumbnail: z
    .string()
    .url()
    .optional()
    .describe('Featured image URL for post'),

  thumbnailAlt: z
    .string()
    .max(200)
    .optional()
    .describe('Alt text for featured image'),

  readingTime: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Estimated reading time in minutes'),

  wordCount: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe('Total word count of post content'),

  content: z
    .string()
    .optional()
    .describe('Full post content (MDX or markdown)'),

  headings: z
    .array(
      z.object({
        level: z.number().int().min(1).max(6),
        text: z.string(),
        slug: z.string(),
      })
    )
    .optional()
    .describe('Table of contents extracted from headings'),
});

/**
 * Complete post contract combining base, relationships, and timeline metadata.
 */
export const PostContractSchema = mergeEditorialSchemas(
  EditorialBaseMetaSchema.merge(PostSpecificSchema),
  EditorialRelationshipMetaSchema
).merge(EditorialTimelineMetaSchema);

export type PostContract = z.infer<typeof PostContractSchema>;

/**
 * Post input schema for mutations (omitting computed fields).
 */
export const PostInputSchema = z.object({
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
  category: z
    .nativeEnum(ContentCategory)
    .describe('Content category'),
  thumbnail: z.string().url().optional(),
  thumbnailAlt: z.string().max(200).optional(),
  content: z.string().optional(),
  relatedPosts: z.array(z.object({
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

export type PostInput = z.infer<typeof PostInputSchema>;
