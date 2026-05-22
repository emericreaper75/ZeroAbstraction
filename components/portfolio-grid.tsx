import React from "react";
import Link from "next/link";
import { ArrowRight, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Surface } from "@/components/ui/surface";
import { StaggerContainer, StaggerItem } from "@/components/animations/fade-in";

interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  githubUrl: string | null;
}

interface PortfolioGridProps {
  projects: PortfolioProject[];
}

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) {
    return null;
  }

  return (
    <section
      className="border-t border-zinc-800 bg-surface px-6 py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">
              Featured Work
            </p>

            <h2
              id="portfolio-heading"
              className="text-3xl font-serif font-bold text-zinc-100"
            >
              Projects & Tools
            </h2>
          </div>

          <Link
            href="/projects"
            className="hidden items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-cyan-400 sm:inline-flex"
          >
            View all
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <StaggerContainer
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.08}
        >
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <Surface variant="floating" interactive padding="lg" asChild className="h-full flex flex-col group">
                <Link href={`/projects/${project.slug}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-zinc-700 text-[10px] font-mono uppercase tracking-wider text-cyan-400"
                    >
                      Featured
                    </Badge>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 transition-colors hover:text-zinc-300 relative z-20"
                        aria-label={`${project.title} source code`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Code2 className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>

                  <h3 className="mb-2 text-lg font-serif font-semibold text-zinc-100 transition-colors group-hover:text-cyan-400">
                    {project.title}
                  </h3>

                  <p className="mb-4 flex-grow text-sm leading-relaxed text-zinc-500 line-clamp-3">
                    {project.description}
                  </p>

                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="border-zinc-800 text-[10px] font-mono text-zinc-500"
                        >
                          {tag.replace(/^"|"$/g, "")}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Link>
              </Surface>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 transition-colors hover:text-cyan-400"
          >
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}