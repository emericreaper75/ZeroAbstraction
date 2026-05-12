export function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}

export function tagOverlapScore(a: string[], b: string[]) {
  const A = new Set(a.map(normalizeTag));
  const B = new Set(b.map(normalizeTag));
  if (A.size === 0 || B.size === 0) return 0;
  let overlap = 0;
  // Avoid TS downlevelIteration issues by iterating an array.
  A.forEach((t) => {
    if (B.has(t)) overlap += 1;
  });
  return overlap;
}

