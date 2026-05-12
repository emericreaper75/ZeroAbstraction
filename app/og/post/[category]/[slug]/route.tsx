import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/lib/posts";
import { OgTemplate } from "@/lib/og/template";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: { category: string; slug: string } }
) {
  const post = getPostBySlug(ctx.params.category, ctx.params.slug);
  if (!post || post.published === false) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    (
      <OgTemplate
        kind="Post"
        title={post.title}
        subtitle={post.description}
        tags={post.tags}
        theme="dark"
      />
    ),
    { width: 1200, height: 630 }
  );
}

