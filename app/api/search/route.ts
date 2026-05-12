import { NextResponse } from "next/server";
import { z } from "zod";

import { searchContent } from "@/lib/search/query";

export const runtime = "nodejs";

const SearchParamsSchema = z.object({
  q: z.string().default(""),
  limit: z.coerce.number().int().min(1).max(25).optional(),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parsed = SearchParamsSchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    limit: url.searchParams.get("limit") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters" },
      { status: 400 }
    );
  }

  const q = parsed.data.q.trim();
  if (!q) {
    return NextResponse.json({ query: "", limit: parsed.data.limit ?? 10, items: [] });
  }

  const items = await searchContent({
    query: q,
    limit: parsed.data.limit ?? 10,
  });

  return NextResponse.json({
    query: q,
    limit: parsed.data.limit ?? 10,
    items,
  });
}

