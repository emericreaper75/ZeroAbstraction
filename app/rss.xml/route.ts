import { prisma } from "@/lib/db/prisma";
import { CATEGORY_ENUM_TO_ROUTE } from "@/lib/editorial/categories";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://zero-abstraction.dev";
const siteName = "Zero Abstraction";

function xmlEscape(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  // Use Prisma as single source of truth (replaces legacy MDX filesystem reads)
  const posts = await prisma.contentPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      slug: true,
      title: true,
      description: true,
      category: true,
      createdAt: true,
    },
  });

  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { updatedAt: "desc" },
    take: 25,
    select: { slug: true, title: true, description: true, updatedAt: true, createdAt: true },
  });

  const items: Array<{
    title: string;
    link: string;
    guid: string;
    pubDate: string;
    description?: string;
  }> = [];

  for (const p of posts) {
    const routeCategory = CATEGORY_ENUM_TO_ROUTE[p.category];
    const link = `${siteUrl}/${routeCategory}/${p.slug}`;
    items.push({
      title: p.title,
      link,
      guid: link,
      pubDate: p.createdAt.toUTCString(),
      description: p.description,
    });
  }

  for (const pr of projects) {
    const link = `${siteUrl}/projects/${pr.slug}`;
    items.push({
      title: `Project: ${pr.title}`,
      link,
      guid: link,
      pubDate: (pr.updatedAt ?? pr.createdAt).toUTCString(),
      description: pr.description,
    });
  }

  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(siteName)}</title>
    <link>${xmlEscape(siteUrl)}</link>
    <description>${xmlEscape("Technical writing and projects — written without abstraction.")}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items
  .slice(0, 50)
  .map((i) => {
    return `    <item>
      <title>${xmlEscape(i.title)}</title>
      <link>${xmlEscape(i.link)}</link>
      <guid>${xmlEscape(i.guid)}</guid>
      <pubDate>${xmlEscape(i.pubDate)}</pubDate>
      ${i.description ? `<description>${xmlEscape(i.description)}</description>` : ""}
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
