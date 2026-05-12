export type TOCEntry = {
  id: string;
  text: string;
  level: 1 | 2 | 3;
};

export type TOCNode = TOCEntry & {
  children: TOCNode[];
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

export function nestTOC(entries: TOCEntry[]): TOCNode[] {
  const roots: TOCNode[] = [];
  const stack: TOCNode[] = [];

  for (const entry of entries) {
    const node: TOCNode = { ...entry, children: [] };

    while (stack.length > 0 && stack[stack.length - 1]!.level >= node.level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }

    stack.push(node);
  }

  return roots;
}
