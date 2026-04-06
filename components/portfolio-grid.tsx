import React from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/lib/projects';

type PortfolioGridProps = {
  projects: Project[];
};

const statusColors: Record<string, string> = {
  active: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
  completed: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400',
  archived: 'border-zinc-500/30 bg-zinc-500/10 text-zinc-400',
};

export default function PortfolioGrid({ projects }: PortfolioGridProps) {
  if (projects.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-surface border-t border-zinc-800" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
              Open Source
            </p>
            <h2 id="portfolio-heading" className="text-3xl font-serif font-bold text-zinc-100">
              Projects &amp; Tools
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              {/* Status indicator */}
              <div className="mb-4 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider ${statusColors[project.status]}`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-600 hover:text-zinc-300 transition-colors"
                      aria-label={`${project.title} source code`}
                    >
                      <Code2 className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-serif font-semibold text-zinc-100 mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-sm text-zinc-500 leading-relaxed mb-4 flex-grow line-clamp-3">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.tech.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[10px] font-mono text-zinc-500 border-zinc-800">
                    {tech}
                  </Badge>
                ))}
                {project.tech.length > 3 && (
                  <Badge variant="outline" className="text-[10px] font-mono text-zinc-600 border-zinc-800">
                    +{project.tech.length - 3}
                  </Badge>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "view all" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
          >
            View all projects
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
