export type TOCEntry = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function extractTOC(content: string): TOCEntry[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const entries: TOCEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 1 | 2 | 3;
    const text = match[2].replace(/\*\*|__|\*|_|`/g, '').trim();
    const id = slugify(text);
    entries.push({ id, text, level });
  }

  return entries;
}
