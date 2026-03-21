import { Metadata } from 'next';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source tools, simulations, and research software spanning electronics, astrophysics, and computational physics.',
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === 'active');
  const completed = projects.filter((p) => p.status === 'completed');
  const archived = projects.filter((p) => p.status === 'archived');

  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-screen-xl">
        <header className="mb-12 max-w-prose">
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-neutral-600">
            Work
          </p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-100 sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-400">
            Research tools, simulators, and open-source software built across
            electronics, astrophysics, and computational physics domains.
          </p>
        </header>

        {active.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-600">
              Active
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((p) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </section>
        )}

        {completed.length > 0 && (
          <section className="mb-14">
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-600">
              Completed
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {completed.map((p) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </section>
        )}

        {archived.length > 0 && (
          <section>
            <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-600">
              Archived
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {archived.map((p) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
