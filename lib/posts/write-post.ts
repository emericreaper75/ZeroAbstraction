import fs from "fs";
import path from "path";

import matter from "gray-matter";

interface WritePostInput {
  slug: string;
  title: string;
  description?: string;
  published: boolean;
  date: string;
  content: string;
}

const postsDirectory = path.join(
  process.cwd(),
  "content/posts"
);

export function writePost({
  slug,
  title,
  description,
  published,
  date,
  content,
}: WritePostInput) {
  const filePath = path.join(
    postsDirectory,
    `${slug}.mdx`
  );

  const mdxContent = matter.stringify(content, {
    title,
    description,
    published,
    date,
  });

  fs.writeFileSync(filePath, mdxContent);
}