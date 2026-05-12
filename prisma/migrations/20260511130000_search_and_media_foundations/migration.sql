-- ContentPost indexed fields (schema drift fix)
ALTER TABLE "ContentPost"
  ADD COLUMN IF NOT EXISTS "headings" JSONB,
  ADD COLUMN IF NOT EXISTS "readingTime" INTEGER,
  ADD COLUMN IF NOT EXISTS "wordCount" INTEGER;

-- ---- Full-text search indexes (production)
-- We use expression indexes so we don't need to maintain separate tsvector columns.
-- `websearch_to_tsquery` queries will use these GIN indexes via the matching expression.

CREATE INDEX IF NOT EXISTS "ContentPost_fts_idx"
  ON "ContentPost"
  USING GIN (to_tsvector('english', "title" || ' ' || "description" || ' ' || COALESCE("content", '')));

CREATE INDEX IF NOT EXISTS "Project_fts_idx"
  ON "Project"
  USING GIN (to_tsvector('english', "title" || ' ' || "description" || ' ' || COALESCE("content", '')));

