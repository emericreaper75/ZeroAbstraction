export function clampText(text: string, maxLen: number) {
  const t = text.trim().replace(/\s+/g, " ");
  if (t.length <= maxLen) return t;
  return t.slice(0, Math.max(0, maxLen - 1)).trimEnd() + "…";
}

export function normalizeTags(tags: string[] | null | undefined, max = 4) {
  return (tags ?? [])
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, max);
}

