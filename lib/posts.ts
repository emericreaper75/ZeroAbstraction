import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

export type PostFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags: string[];
  category: string;
  slug: string;
};

export type Post = PostFrontmatter & {
  readingTime: string;
  content: string;
};

export const VALID_CATEGORIES = [
  'electronics',
  'astrophysics',
  'physics-math',
  'research-logs',
] as const;

export type Category = (typeof VALID_CATEGORIES)[number];

const contentDir = path.join(process.cwd(), 'content');

function getMDXFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
}

function parsePost(filePath: string): Post {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    title: data.title ?? 'Untitled',
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    category: data.category ?? '',
    slug: data.slug ?? path.basename(filePath, '.mdx'),
    readingTime: stats.text,
    content,
  };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const category of VALID_CATEGORIES) {
    const dir = path.join(contentDir, category);
    const files = getMDXFiles(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      posts.push(parsePost(filePath));
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostsByCategory(category: string): Post[] {
  const dir = path.join(contentDir, category);
  const files = getMDXFiles(dir);

  return files
    .map((file) => parsePost(path.join(dir, file)))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(category: string, slug: string): Post | null {
  const filePath = path.join(contentDir, category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filePath);
}

export function getAllPostSlugs(): { category: string; slug: string }[] {
  const slugs: { category: string; slug: string }[] = [];

  for (const category of VALID_CATEGORIES) {
    const dir = path.join(contentDir, category);
    const files = getMDXFiles(dir);
    for (const file of files) {
      slugs.push({ category, slug: path.basename(file, '.mdx') });
    }
  }

  return slugs;
}
