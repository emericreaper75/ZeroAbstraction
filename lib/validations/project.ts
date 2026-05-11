import { z } from "zod";

export const projectSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),

  description: z
    .string()
    .max(1000, "Description is too long")
    .optional(),

  content: z.string().optional(),

  tags: z.array(z.string()).optional(),

  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),

  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

export type ProjectSchema = z.infer<
  typeof projectSchema
>;