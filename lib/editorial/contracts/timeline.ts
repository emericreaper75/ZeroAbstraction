/**
 * lib/editorial/contracts/timeline.ts
 *
 * Editorial timeline metadata contract.
 * Tracks milestones, phases, and chronological continuity for content.
 */

import { z } from 'zod';
import { MilestonePhase, TimelineGroup } from './taxonomy';

/**
 * Individual milestone in a content's timeline.
 */
export const EditorialMilestoneSchema = z.object({
  id: z.string().describe('Unique identifier for this milestone'),
  date: z
    .string()
    .datetime()
    .or(z.string().date())
    .describe('ISO 8601 date of the milestone'),
  phase: z
    .nativeEnum(MilestonePhase)
    .describe('Phase in the content lifecycle'),
  title: z.string().describe('Title of the milestone'),
  description: z
    .string()
    .optional()
    .describe('Detailed description of the milestone'),
  metadata: z
    .record(z.string(), z.unknown())
    .optional()
    .default({})
    .describe('Additional phase-specific metadata'),
});

export type EditorialMilestone = z.infer<typeof EditorialMilestoneSchema>;

/**
 * Timeline group information for organizing entries.
 */
export const EditorialTimelineGroupSchema = z.object({
  group: z
    .nativeEnum(TimelineGroup)
    .describe('Group classification'),
  metadata: z
    .record(z.string(), z.unknown())
    .optional()
    .default({})
    .describe('Group-specific metadata'),
});

export type EditorialTimelineGroup = z.infer<typeof EditorialTimelineGroupSchema>;

/**
 * Chronology identifier for tracking content evolution and continuity.
 * Useful for linking versions, iterations, and related work over time.
 */
export const EditorialChronologySchema = z.object({
  continuityId: z
    .string()
    .optional()
    .describe('UUID or identifier linking related content across versions/iterations'),
  version: z
    .number()
    .int()
    .min(1)
    .optional()
    .default(1)
    .describe('Version number of this content'),
  previousVersion: z
    .string()
    .optional()
    .describe('Slug of previous version'),
  nextVersion: z
    .string()
    .optional()
    .describe('Slug of next version (if exists)'),
  lastReviewDate: z
    .string()
    .datetime()
    .or(z.string().date())
    .optional()
    .describe('When this content was last reviewed/updated'),
});

export type EditorialChronology = z.infer<typeof EditorialChronologySchema>;

/**
 * Full timeline metadata schema.
 * Enriches editorial content with temporal and milestone information.
 */
export const EditorialTimelineMetaSchema = z.object({
  timeline: z
    .array(EditorialMilestoneSchema)
    .default([])
    .describe('Timeline milestones tracking content progression'),

  primaryMilestone: z
    .nativeEnum(MilestonePhase)
    .optional()
    .describe('Primary lifecycle phase of this content'),

  timelineGroup: EditorialTimelineGroupSchema.optional().describe(
    'Classification for timeline entry aggregation'
  ),

  chronology: EditorialChronologySchema.optional().describe(
    'Version and continuity tracking for iterative content'
  ),

  estimatedReadingTime: z
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
    .describe('Total word count of content'),
});

export type EditorialTimelineMeta = z.infer<typeof EditorialTimelineMetaSchema>;
