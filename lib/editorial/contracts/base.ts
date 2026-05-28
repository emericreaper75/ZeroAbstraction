/**
 * lib/editorial/contracts/base.ts
 *
 * Base editorial metadata contract — shared schema for all editorial content.
 * All content types (posts, projects, research) extend this contract.
 */

import { z } from 'zod';
import type { ZodRawShape, ZodObject } from 'zod';

/**
 * Base editorial metadata schema.
 * Every editorial entity must include these fields.
 */
export const EditorialBaseMetaSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be under 200 characters'),

  description: z
    .string()
    .max(5000, 'Description must be under 5000 characters')
    .optional()
    .default(''),

  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase with hyphens only'
    ),

  tags: z
    .array(z.string().min(1).max(50))
    .default([])
    .describe('Array of content tags for categorization and discovery'),

  published: z
    .boolean()
    .default(false)
    .describe('Whether the content is publicly visible'),

  featured: z
    .boolean()
    .default(false)
    .describe('Whether the content should be highlighted on homepage/listings'),

  createdAt: z
    .date()
    .or(z.string().datetime())
    .optional()
    .describe('ISO 8601 timestamp when content was created'),

  updatedAt: z
    .date()
    .or(z.string().datetime())
    .optional()
    .describe('ISO 8601 timestamp when content was last updated'),
});

export type EditorialBaseMeta = z.infer<typeof EditorialBaseMetaSchema>;

/**
 * Helper function to create an extended Zod schema from the base.
 * Usage: baseSchema.extend({ customField: z.string() })
 */
export function createEditorialSchema<T extends ZodRawShape>(
  additionalFields: T
): ZodObject<T & ZodRawShape> {
  return EditorialBaseMetaSchema.extend(additionalFields) as unknown as ZodObject<
    T & ZodRawShape
  >;
}

/**
 * Helper to merge base schema with relationship and timeline metadata.
 * Allows composition without deep inheritance chains.
 */
export function mergeEditorialSchemas<
  T extends ZodRawShape,
  U extends ZodRawShape,
>(baseSchema: ZodObject<T>, additional: ZodObject<U>) {
  return baseSchema.merge(additional);
}
