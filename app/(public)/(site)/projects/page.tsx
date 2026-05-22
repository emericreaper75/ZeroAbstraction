import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
              count={projects.length}
              countLabel="projects"
            />
          </FadeIn>

          {projects.length === 0 ? (
            <FadeIn delay={0.2}>
              <div className="mt-12 w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ minHeight: 'calc(100vh - 64px - 200px)' }}>
                <ComingSoonBanner count={6} category="projects" />
              </div>
            </FadeIn>
          ) : (
            <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 grid-rows-[auto] auto-rows-fr">
              {projects.map((project) => (
                <StaggerItem key={project.id} className="h-full">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 transition-all duration-300 hover:border-rose-400/40 hover:bg-neutral-900/60 hover:shadow-[0_0_30px_rgba(244,63,94,0.08)]"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      <h2 className="font-serif text-xl font-semibold leading-snug text-white group-hover:text-rose-300 transition-colors duration-200">
                        {project.title}
                      </h2>
                    </div>

                    {/* Description — grows to fill space */}
                    {project.description && (
                      <p className="flex-1 text-sm leading-relaxed text-neutral-400 line-clamp-4 mb-5">
                        {project.description}
                      </p>
                    )}
                    {!project.description && <div className="flex-1" />}

                    {/* Footer — pinned to bottom */}
                    <div className="mt-auto space-y-4 border-t border-neutral-800/60 pt-4">
                      {project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-neutral-700 bg-neutral-800/60 px-2.5 py-0.5 font-mono text-[10px] text-neutral-400"
                            >
                              {tag.replace(/^"|"$/g, '')}
                            </span>
                          ))}
                          {project.tags.length > 4 && (
                            <span className="rounded-full border border-neutral-800 px-2.5 py-0.5 font-mono text-[10px] text-neutral-600">
                              +{project.tags.length - 4}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-neutral-600 uppercase tracking-wider">View Project</span>
                        <ArrowRight className="h-4 w-4 text-neutral-600 transition-all duration-200 group-hover:text-rose-400 group-hover:translate-x-0.5" aria-hidden="true" />
                      </div>
                    </div>
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

