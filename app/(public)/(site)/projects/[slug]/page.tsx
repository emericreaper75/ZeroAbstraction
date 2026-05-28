import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { getProjectBySlug } from "@/lib/projects/get-project-by-slug";
import { getRelatedNodes } from "@/lib/graph/engine";
import ContentEcosystemView from "@/components/graph/ContentEcosystemView";
import MDXContent from "@/components/mdx/MDXContent";
import { extractTOC, nestTOC } from "@/lib/toc";
import { generateProjectMetadata } from "@/lib/metadata";
import ProjectLayout from "@/components/ProjectLayout";
import matter from "gray-matter";
import { splitMDXContent } from "@/lib/mdx/split";
import { timelineEntries } from "@/lib/timeline";
import { calculateStringOverlap } from "@/lib/editorial/relationships/scoring";
import { normalizeProject } from "@/lib/editorial/relationships/normalize";
import { resolveRelatedPosts, resolveRelatedProjects, resolveRelatedResearch } from "@/lib/editorial/relationships/resolve-relationships";
import { orchestrateRelationships } from "@/lib/editorial/presentation/orchestration";

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

  // 1. Normalize the current project
  const sourceEntity = normalizeProject(project);

  // 2. Resolve candidates across all domains
  const [relatedPosts, relatedProjects, relatedResearch] = await Promise.all([
    resolveRelatedPosts(sourceEntity, { limit: 10 }),
    resolveRelatedProjects(sourceEntity, { limit: 10 }),
    resolveRelatedResearch(sourceEntity, { limit: 10 }),
  ]);

  // 3. Orchestrate into presentation buckets
  const allCandidates = [...relatedPosts, ...relatedProjects, ...relatedResearch].sort((a, b) => b.score - a.score);
  const groupedRelationships = orchestrateRelationships(sourceEntity, allCandidates);

  const { data, content: mdxBody } = matter(project.content ?? "");
  const abstract = data.abstract ?? undefined;
  const previewSections = typeof data.previewSections === 'number' ? data.previewSections : 2;
  const { previewMDX, remainingMDX } = splitMDXContent(mdxBody, previewSections);

  // Filter timeline entries by tag overlap with this project
  const relatedTimeline = timelineEntries
    .filter((e) => calculateStringOverlap(e.tags ?? [], project.tags) > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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
        groupedRelationships={groupedRelationships}
        timelineEntries={relatedTimeline}
      />
    </div>
  );
}

