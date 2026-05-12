import Link from "next/link";

import { getProjects } from "@/lib/projects/get-projects";

import ProjectsBg from "@/components/backgrounds/projects-bg";
import PageHeader from "@/components/page-header";

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ProjectsBg />

      <div className="absolute top-0 left-0 z-0 h-[120px] w-full bg-gradient-to-b from-[#050810] to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <PageHeader
            label="WORK"
            title="Projects"
            subtitle="Research tools, simulations, and engineering systems."
            accentColor="rose"
          />

          {projects.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-neutral-400">
              No published projects found.
            </div>
          ) : (
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-neutral-700"
                >
                  <h2 className="text-2xl font-semibold text-white">
                    {project.title}
                  </h2>

                  {project.description && (
                    <p className="mt-4 text-neutral-400">
                      {project.description}
                    </p>
                  )}

                  {project.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-neutral-700 px-3 py-1 text-xs text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

