-- Fix ContentCategory enum: replace RESEARCH_LOGS with COMMUNICATIONS
-- and create ResearchLog table

-- Step 1: Rename old enum type
ALTER TYPE "ContentCategory" RENAME TO "ContentCategory_old";

-- Step 2: Create new enum with correct values
CREATE TYPE "ContentCategory" AS ENUM ('ELECTRONICS', 'ASTROPHYSICS', 'PHYSICS_MATH', 'COMMUNICATIONS');

-- Step 3: Migrate column with explicit CASE WHEN casting
ALTER TABLE "ContentPost" 
  ALTER COLUMN "category" TYPE "ContentCategory" 
  USING (
    CASE category::text
      WHEN 'RESEARCH_LOGS' THEN 'COMMUNICATIONS'::"ContentCategory"
      ELSE category::text::"ContentCategory"
    END
  );

-- Step 4: Drop old enum
DROP TYPE "ContentCategory_old";

-- Step 5: Create ResearchLog table
CREATE TABLE "ResearchLog" (
    "id" TEXT NOT NULL,
    "entryNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "series" TEXT NOT NULL,
    "abstract" TEXT,
    "content" TEXT,
    "tags" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResearchLog_pkey" PRIMARY KEY ("id")
);

-- Step 6: Create indexes
CREATE UNIQUE INDEX "ResearchLog_entryNumber_key" ON "ResearchLog"("entryNumber");
CREATE UNIQUE INDEX "ResearchLog_slug_key" ON "ResearchLog"("slug");
CREATE INDEX "ResearchLog_series_idx" ON "ResearchLog"("series");
CREATE INDEX "ResearchLog_published_idx" ON "ResearchLog"("published");
