const categoryConfig: Record<string, { label: string; color: string }> = {
  electronics: { label: 'Electronics', color: 'text-amber-400 border-amber-800 bg-amber-950/40' },
  astrophysics: { label: 'Astrophysics', color: 'text-violet-400 border-violet-800 bg-violet-950/40' },
  'physics-math': { label: 'Physics & Math', color: 'text-sky-400 border-sky-800 bg-sky-950/40' },
  communications: { label: 'Communications', color: 'text-blue-400 border-blue-800 bg-blue-950/40' },
  // Legacy fallback for any existing research-logs data
  'research-logs': { label: 'Communications', color: 'text-blue-400 border-blue-800 bg-blue-950/40' },
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
