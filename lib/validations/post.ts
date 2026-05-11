import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),

  description: z
    .string()
    .max(300, "Description must be under 300 characters")
    .optional(),

  published: z.boolean().default(false),

  date: z.string(),

  slug: z
    .string()
    .min(1, "Slug is required"),
});

export type PostSchema = z.infer<
  typeof postSchema
>;