import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { postSchema } from "@/lib/validations/post";

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

export interface PostData {
  slug: string;
  title: string;
  description?: string;
  published: boolean;
  date: string;
  content: string;
}

export function getPostBySlug(
  slug: string
): PostData | null {
  const filePath = path.join(
    postsDirectory,
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(
    filePath,
    "utf8"
  );

  const { data, content } =
    matter(fileContent);

  const validatedPost =
    postSchema.safeParse({
      slug,
      title: data.title,
      description: data.description,
      published: data.published,
      date: data.date,
    });

  if (!validatedPost.success) {
    console.error(
      `Invalid frontmatter in ${slug}.mdx`
    );

    return null;
  }

  return {
    ...validatedPost.data,
    published: validatedPost.data.published ?? false,
    content,
  };
}