import { z } from "zod";
import { PostInputSchema } from "@/lib/editorial/contracts";

/**
 * Post schema for frontmatter validation.
 * Extends the canonical post contract with MDX-specific fields.
 */
export const postSchema = PostInputSchema.extend({
  date: z
    .string()
    .datetime()
    .or(z.string().date())
    .describe("Publication date in ISO 8601 format"),
}).omit({ content: true });

export type PostSchema = z.infer<typeof postSchema>;