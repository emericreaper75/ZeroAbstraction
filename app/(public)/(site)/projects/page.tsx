import Link from "next/link";

import { getProjects } from "@/lib/projects/get-projects";

import ProjectsBg from "@/components/backgrounds/projects-bg";
import PageHeader from "@/components/page-header";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations/fade-in";
import ComingSoonBanner from "@/components/ComingSoonBanner";

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ProjectsBg />

      <div className="absolute top-0 left-0 z-0 h-[120px] w-full bg-gradient-to-b from-[#050810] to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-screen-xl">
          <FadeIn>
            <PageHeader
              label="WORK"
              title="Projects"
              subtitle="Research tools, simulations, and engineering systems."
              accentColor="rose"
            />
          </FadeIn>

          {projects.length === 0 ? (
            <FadeIn delay={0.2}>
              <div className="mt-12 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 text-neutral-400" style={{ minHeight: 'calc(100vh - 64px - 200px)' }}>
                <div className="w-full grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  <ComingSoonBanner count={6} category="projects" />
                </div>
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <StaggerItem key={project.id} className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="h-full block rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition hover:border-neutral-700"
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
                            {tag.replace(/^"|"$/g, '')}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </StaggerItem>
              ))}
              {projects.length < 6 && (
                <StaggerItem className="h-full">
                  <ComingSoonBanner count={6 - projects.length} category="projects" />
                </StaggerItem>
              )}
            </StaggerContainer>
          )}
        </div>
      </div>
    </div>
  );
}

