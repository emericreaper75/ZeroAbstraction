import Link from 'next/link';
import type { Project } from '@prisma/client';

export default function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section className="mt-16 border-t border-neutral-800/60 pt-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
        More work
      </p>
      <h2 className="mt-2 font-serif text-2xl font-bold text-white">
        Related projects
      </h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.slug}`}
            className="rounded-xl border border-neutral-800 bg-neutral-900/30 p-5 transition hover:border-neutral-700 hover:bg-neutral-900/50"
          >
            <h3 className="font-serif text-lg font-semibold text-neutral-100">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-neutral-400 line-clamp-3">
              {p.description}
            </p>
            {p.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-neutral-800 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

