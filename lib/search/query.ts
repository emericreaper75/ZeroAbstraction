import { prisma } from "@/lib/db/prisma";
import type { SearchResultItem } from "@/lib/search/types";

const POST_LIMIT_HARD_CAP = 25;

function normalizeQuery(q: string) {
  return q.trim().replace(/\s+/g, " ");
}

/**
 * Shared entrypoint for searching across content types.
 *
 * Architecture notes:
 * - Posts are indexed into `ContentPost` (see `scripts/index-content.ts`) so we can use PostgreSQL FTS in production.
 * - Projects live in PostgreSQL already, so we query directly.
 * - We use `websearch_to_tsquery` for resilient user input (quotes, operators).
 * - We rank with `ts_rank_cd` and keep limits small for instant-search UX.
 */
export async function searchContent(opts: {
  query: string;
  limit?: number;
}): Promise<SearchResultItem[]> {
  const q = normalizeQuery(opts.query);
  if (!q) return [];

  const limit = Math.min(Math.max(opts.limit ?? 10, 1), POST_LIMIT_HARD_CAP);

  // NOTE: Use parameterized raw SQL to:
  // - use expression indexes created in the migration (GIN on to_tsvector(...))
  // - rank with `ts_rank_cd`
  const rows = await prisma.$queryRaw<SearchResultItem[]>`
    WITH
      query AS (
        SELECT websearch_to_tsquery('english', ${q}) AS tsq
      ),
      posts AS (
        SELECT
          'post'::text AS type,
          p.id AS id,
          p.title AS title,
          NULLIF(p.description, '') AS description,
          ('/' || LOWER(
            CASE p.category
              WHEN 'ELECTRONICS' THEN 'electronics'
              WHEN 'ASTROPHYSICS' THEN 'astrophysics'
              WHEN 'PHYSICS_MATH' THEN 'physics-math'
              WHEN 'COMMUNICATIONS' THEN 'communications'
            END
          ) || '/' || p.slug) AS href,
          COALESCE(p.tags, ARRAY[]::text[]) AS tags,
          ts_rank_cd(
            to_tsvector('english', p.title || ' ' || p.description || ' ' || COALESCE(p.content, '')),
            (SELECT tsq FROM query)
          ) AS score,
          LOWER(
            CASE p.category
              WHEN 'ELECTRONICS' THEN 'electronics'
              WHEN 'ASTROPHYSICS' THEN 'astrophysics'
              WHEN 'PHYSICS_MATH' THEN 'physics-math'
              WHEN 'COMMUNICATIONS' THEN 'communications'
            END
          ) AS category,
          p.thumbnail AS thumbnail
        FROM "ContentPost" p, query
        WHERE
          p.published = true
          AND to_tsvector('english', p.title || ' ' || p.description || ' ' || COALESCE(p.content, '')) @@ query.tsq
      ),
      projects AS (
        SELECT
          'project'::text AS type,
          pr.id AS id,
          pr.title AS title,
          NULLIF(pr.description, '') AS description,
          ('/projects/' || pr.slug) AS href,
          COALESCE(pr.tags, ARRAY[]::text[]) AS tags,
          ts_rank_cd(
            to_tsvector('english', pr.title || ' ' || pr.description || ' ' || COALESCE(pr.content, '')),
            (SELECT tsq FROM query)
          ) AS score,
          NULL::text AS category,
          pr.thumbnail AS thumbnail
        FROM "Project" pr, query
        WHERE
          pr.published = true
          AND to_tsvector('english', pr.title || ' ' || pr.description || ' ' || COALESCE(pr.content, '')) @@ query.tsq
      ),
      research AS (
        SELECT
          'research'::text AS type,
          rl.id AS id,
          rl.title AS title,
          NULLIF(rl.abstract, '') AS description,
          ('/research/' || rl.slug) AS href,
          COALESCE(rl.tags, ARRAY[]::text[]) AS tags,
          ts_rank_cd(
            to_tsvector('english', rl.title || ' ' || COALESCE(rl.abstract, '') || ' ' || COALESCE(rl.content, '')),
            (SELECT tsq FROM query)
          ) AS score,
          'research'::text AS category,
          NULL::text AS thumbnail
        FROM "ResearchLog" rl, query
        WHERE
          rl.published = true
          AND to_tsvector('english', rl.title || ' ' || COALESCE(rl.abstract, '') || ' ' || COALESCE(rl.content, '')) @@ query.tsq
      )
    SELECT * FROM (
      SELECT * FROM posts
      UNION ALL
      SELECT * FROM projects
      UNION ALL
      SELECT * FROM research
    ) AS combined
    ORDER BY score DESC, title ASC
    LIMIT ${limit};
  `;

  // Ensure numeric score for JSON consumers.
  return rows.map((r) => ({
    ...r,
    score: typeof r.score === "number" ? r.score : Number(r.score),
  }));
}

