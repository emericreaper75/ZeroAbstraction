import { ImageResponse } from "next/og";

import { prisma } from "@/lib/db/prisma";
import { OgTemplate } from "@/lib/og/template";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: { slug: string } }) {
  const project = await prisma.project.findUnique({
    where: { slug: ctx.params.slug },
    select: {
      published: true,
      title: true,
      description: true,
      tags: true,
    },
  });

  if (!project || !project.published) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <OgTemplate
        kind="Project"
        title={project.title}
        subtitle={project.description}
        tags={project.tags}
        theme="dark"
      />
    ),
    { width: 1200, height: 630 }
  );
}

