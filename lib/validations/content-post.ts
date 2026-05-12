import { z } from "zod";
import { ContentCategory } from "@prisma/client";

export const contentPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be under 120 characters"),

  description: z
    .string()
    .max(300, "Description must be under 300 characters")
    .optional(),

  content: z.string().optional(),

  category: z.nativeEnum(ContentCategory),

  tags: z.array(z.string()).optional(),

  featured: z.boolean().optional(),
  published: z.boolean().optional(),

  thumbnail: z.string().optional(),
  thumbnailAlt: z.string().optional(),
});

export type ContentPostSchema = z.infer<typeof contentPostSchema>;

