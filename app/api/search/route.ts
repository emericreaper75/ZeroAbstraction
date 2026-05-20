import { NextResponse } from "next/server";
import { z } from "zod";

import { searchContent } from "@/lib/search/query";
import {
  checkRateLimit,
  rateLimitHeaders,
  RATE_LIMITS,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";

/** Maximum request body / URL size validation */
const MAX_QUERY_LENGTH = 200;

const SearchParamsSchema = z.object({
  q: z.string().max(MAX_QUERY_LENGTH).default(""),
  limit: z.coerce.number().int().min(1).max(25).optional(),
});

export async function GET(req: Request) {
  // ── Rate limiting ──────────────────────────────────────────────────
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const rateLimitResult = checkRateLimit(`search:${ip}`, RATE_LIMITS.search);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  // ── Input validation ───────────────────────────────────────────────
  const url = new URL(req.url);
  const parsed = SearchParamsSchema.safeParse({
    q: url.searchParams.get("q") ?? "",
    limit: url.searchParams.get("limit") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Invalid query parameters" },
      { status: 400, headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  const q = parsed.data.q.trim();
  if (!q) {
    return NextResponse.json(
      { success: true, query: "", limit: parsed.data.limit ?? 10, items: [] },
      { headers: rateLimitHeaders(rateLimitResult) }
    );
  }

  const items = await searchContent({
    query: q,
    limit: parsed.data.limit ?? 10,
  });

  return NextResponse.json(
    { success: true, query: q, limit: parsed.data.limit ?? 10, items },
    { headers: rateLimitHeaders(rateLimitResult) }
  );
}
