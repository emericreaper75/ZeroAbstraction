import { notFound } from "next/navigation";

import { getProjectBySlug } from "@/lib/projects/get-project-by-slug";

interface ProjectPageProps {
  params: {
    slug: string;
  };
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

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Project
        </p>

        <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
          {project.title}
        </h1>

        {project.description && (
          <p className="mt-6 text-lg text-zinc-400">
            {project.description}
          </p>
        )}
      </div>

      {project.tags.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {project.content && (
        <div className="prose prose-invert max-w-none">
          <p>{project.content}</p>
        </div>
      )}

      <div className="mt-12 flex items-center gap-6">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 transition hover:text-blue-300"
          >
            GitHub
          </a>
        )}

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 transition hover:text-emerald-300"
          >
            Live Demo
          </a>
        )}
      </div>
    </main>
  );
}