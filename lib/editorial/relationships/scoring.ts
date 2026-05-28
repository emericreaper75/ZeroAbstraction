/**
 * lib/editorial/relationships/scoring.ts
 *
 * Deterministic scoring utilities for the Editorial Relationship Engine.
 * Extracts individual scoring signals to be combined by the similarity engine.
 */

import type { NormalizedEditorialEntity } from './types';
import type { EditorialTechnology } from '../contracts/relationship';

/**
 * Calculates overlap between two arrays of strings (e.g. tags).
 */
export function calculateStringOverlap(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  
  const setA = new Set(a.map((s) => s.trim().toLowerCase()));
  const setB = new Set(b.map((s) => s.trim().toLowerCase()));
  
  let overlap = 0;
  setA.forEach((item) => {
    if (setB.has(item)) overlap += 1;
  });
  
  return overlap;
}

/**
 * Calculates overlap between technologies.
 */
export function calculateTechnologyOverlap(
  a: EditorialTechnology[], 
  b: EditorialTechnology[]
): number {
  if (!a.length || !b.length) return 0;
  
  const setA = new Set(a.map((t) => t.name.trim().toLowerCase()));
  const setB = new Set(b.map((t) => t.name.trim().toLowerCase()));
  
  let overlap = 0;
  setA.forEach((item) => {
    if (setB.has(item)) overlap += 1;
  });
  
  return overlap;
}

/**
 * Returns weight if the entities share the same category.
 */
export function calculateCategoryAffinity(
  a: NormalizedEditorialEntity, 
  b: NormalizedEditorialEntity
): boolean {
  if (!a.category || !b.category) return false;
  return a.category === b.category;
}

/**
 * Checks if entities are adjacent in a series.
 */
export function calculateTimelineContinuity(
  a: NormalizedEditorialEntity, 
  b: NormalizedEditorialEntity
): boolean {
  if (!a.series || !b.series || a.series !== b.series) return false;
  if (a.seriesIndex === undefined || b.seriesIndex === undefined) return false;
  
  // They are adjacent in the series
  return Math.abs(a.seriesIndex - b.seriesIndex) === 1;
}
