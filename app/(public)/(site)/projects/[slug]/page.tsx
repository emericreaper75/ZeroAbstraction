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
import ProjectLayout from "@/components/ProjectLayout";
import matter from "gray-matter";
import { splitMDXContent } from "@/lib/mdx/split";

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

  const { data, content: mdxBody } = matter(project.content ?? "");
  const abstract = data.abstract ?? undefined;
  const previewSections = typeof data.previewSections === 'number' ? data.previewSections : 2;
  const { previewMDX, remainingMDX } = splitMDXContent(mdxBody, previewSections);

  return (
    <div className="relative">
      <ProjectLayout
        project={{
          slug: project.slug,
          title: project.title,
          description: project.description,
          tags: project.tags,
          githubUrl: project.githubUrl,
          liveUrl: project.liveUrl,
          featured: project.featured,
        }}
        toc={toc}
        abstract={abstract}
        previewContent={
          project.content ? (
            <MDXContent source={previewMDX} />
          ) : (
            <p className="text-neutral-500">This project doesn’t have a long-form write-up yet.</p>
          )
        }
        remainingContent={remainingMDX ? <MDXContent source={remainingMDX} /> : null}
        relatedContent={<RelatedProjects projects={relatedProjects} />}
      />
    </div>
  );
}

