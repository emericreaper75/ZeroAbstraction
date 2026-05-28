import { z } from "zod";
import { ResearchInputSchema } from "@/lib/editorial/contracts";

/**
 * Research log schema for database and API validation.
 * Directly uses the canonical research contract.
 */
export const researchLogSchema = ResearchInputSchema;

export type ResearchLogSchema = z.infer<typeof researchLogSchema>;
