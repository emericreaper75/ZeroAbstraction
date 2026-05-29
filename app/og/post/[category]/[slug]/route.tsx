import { ImageResponse } from "next/og";

import { getPublishedPostByCategoryAndSlug } from "@/lib/public/content-posts";
import { CATEGORY_ROUTE_TO_ENUM } from "@/lib/editorial/categories";
import { OgTemplate } from "@/lib/og/template";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  ctx: { params: { category: string; slug: string } }
) {
  const categoryEnum = CATEGORY_ROUTE_TO_ENUM[ctx.params.category];
  if (!categoryEnum) {
    return new Response("Not found", { status: 404 });
  }

  const post = await getPublishedPostByCategoryAndSlug({
    category: categoryEnum,
    slug: ctx.params.slug,
  });

  if (!post) {
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
