const categoryConfig: Record<string, { label: string; color: string }> = {
  electronics: { label: 'Electronics', color: 'text-cyan-400 border-cyan-800 bg-cyan-950/40' },
  astrophysics: { label: 'Astrophysics', color: 'text-violet-400 border-violet-800 bg-violet-950/40' },
  'physics-math': { label: 'Physics & Math', color: 'text-emerald-400 border-emerald-800 bg-emerald-950/40' },
  communications: { label: 'Communications', color: 'text-pink-400 border-pink-800 bg-pink-950/40' },
  research: { label: 'Research', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
  'research-logs': { label: 'Research', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
};

type Props = { category: string };

export default function CategoryBadge({ category }: Props) {
  const config = categoryConfig[category] ?? {
    label: category,
    color: 'text-neutral-400 border-neutral-700 bg-neutral-800/40',
  };

  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium uppercase tracking-wider ${config.color}`}
    >
      {config.label}
    </span>
  );
}
