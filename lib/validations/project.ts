import { z } from "zod";
import { ProjectInputSchema } from "@/lib/editorial/contracts";

/**
 * Project schema for form and API validation.
 * Directly uses the canonical project contract.
 */
export const projectSchema = ProjectInputSchema;

export type ProjectSchema = z.infer<typeof projectSchema>;