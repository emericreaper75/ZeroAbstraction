import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProjectBySlug } from "@/lib/projects/get-project-by-slug";
import { getRelatedProjects } from "@/lib/projects/get-related-projects";
import RelatedProjects from "@/components/related/RelatedProjects";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import MDXContent from "@/components/mdx/MDXContent";
import { extractTOC, nestTOC } from "@/lib/toc";
import TableOfContents from "@/components/TableOfContents";
import { generateProjectMetadata } from "@/lib/metadata";

export const revalidate = 300;

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project || !project.published) return {};

  return generateProjectMetadata({
    slug: project.slug,
    title: project.title,
    description: project.description,
    tags: project.tags,
  });
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const project = await getProjectBySlug(
    params.slug
  );

  if (!project || !project.published) {
    notFound();
  }

  const toc = project.content ? nestTOC(extractTOC(project.content)) : [];

  const relatedProjects = await getRelatedProjects({
    projectId: project.id,
    tags: project.tags,
    limit: 3,
  });

  return (
    <div className="relative">
      {/* Hero */}
      <div className="border-b border-neutral-800/60 bg-gradient-to-b from-neutral-900/40 to-transparent">
        <div className="mx-auto max-w-screen-xl px-6 pb-10 pt-28">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            Project case study
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-white md:text-5xl">
            {project.title}
          </h1>
          {project.description && (
            <p className="mt-5 max-w-2xl text-lg text-neutral-400">
              {project.description}
            </p>
          )}

          {/* Metadata row */}
          <div className="mt-8 flex flex-col gap-6 border-t border-neutral-800/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-800 bg-neutral-950/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/40 px-3 py-2 text-sm text-neutral-300 transition hover:border-neutral-700 hover:bg-neutral-900/60"
                >
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="h-4 w-4 text-neutral-500" aria-hidden="true" />
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200 transition hover:border-emerald-400/50 hover:bg-emerald-500/15"
                >
                  Live
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              <Link
                href="/projects"
                className="text-sm font-mono text-neutral-500 hover:text-sky-400 transition-colors"
              >
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <main className="mx-auto max-w-screen-xl px-6 py-14">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
          {/* TOC sidebar on the left */}
          {toc.length > 0 && (
            <aside className="sticky top-28 hidden lg:block w-[220px] shrink-0 self-start">
              <TableOfContents entries={toc} />
            </aside>
          )}

          <article className="min-w-0 flex-1 max-w-[820px]">
            <div className="prose prose-neutral prose-invert max-w-none prose-headings:scroll-mt-28">
              {project.content ? (
                <MDXContent source={project.content} />
              ) : (
                <p className="text-neutral-500">
                  This project doesn’t have a long-form write-up yet.
                </p>
              )}
            </div>
          </article>

          {/* Side metadata panel (future-proof for gallery/metrics) */}
          <aside className="hidden xl:block w-[320px] shrink-0">
            <div className="sticky top-28 rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6">
              <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
                Metadata
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-neutral-500">Slug</dt>
                  <dd className="font-mono text-neutral-200">{project.slug}</dd>
                </div>
                <div>
                  <dt className="text-neutral-500">Featured</dt>
                  <dd className="text-neutral-200">{project.featured ? 'Yes' : 'No'}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        <RelatedProjects projects={relatedProjects} />
      </main>
    </div>
  );
}

