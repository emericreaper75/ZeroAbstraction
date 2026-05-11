import fs from "fs";
import path from "path";

import matter from "gray-matter";

import { postSchema } from "@/lib/validations/post";

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

export interface PostMeta {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  date?: string;
}

export function getPosts(): PostMeta[] {
  const files = fs.readdirSync(postsDirectory);

  const posts = files.map((file): PostMeta | null => {
    const filePath = path.join(
      postsDirectory,
      file
    );

    const fileContent = fs.readFileSync(
      filePath,
      "utf8"
    );

    const { data } = matter(fileContent);

    const slug = file.replace(".mdx", "");

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
        `Invalid frontmatter in ${file}`
    );

    return null;
    }

    return validatedPost.data;
  });

  return posts
  .filter((post): post is PostMeta => post !== null)
  .sort((a, b) =>
    (b.date ?? "").localeCompare(a.date ?? "")
  );
}