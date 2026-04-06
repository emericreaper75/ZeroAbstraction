import { Metadata } from 'next';
import { projects } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';
import ProjectsBg from '@/components/backgrounds/projects-bg';
import PageHeader from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Open-source tools, simulations, and research software spanning electronics, astrophysics, and computational physics.',
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === 'active');
  const completed = projects.filter((p) => p.status === 'completed');
  const archived = projects.filter((p) => p.status === 'archived');

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ProjectsBg />
      
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-[120px] bg-gradient-to-b from-[#050810] to-transparent z-0 pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <PageHeader 
            label="WORK"
            title="Projects"
            subtitle="Research tools, simulators, and open-source software built across electronics, astrophysics, and computational physics domains."
            accentColor="rose"
          />

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
    </div>
  );
}
