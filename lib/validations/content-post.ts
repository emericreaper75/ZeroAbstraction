import { z } from "zod";
import { PostInputSchema } from "@/lib/editorial/contracts";

/**
 * Content post schema for database and API validation.
 * Extends the canonical post contract with content-post-specific constraints.
 */
export const contentPostSchema = PostInputSchema.extend({
  content: z.string().optional(),
});

export type ContentPostSchema = z.infer<typeof contentPostSchema>;
