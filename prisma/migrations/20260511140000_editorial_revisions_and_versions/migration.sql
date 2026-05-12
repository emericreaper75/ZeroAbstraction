-- Ensure enums exist
DO $$
BEGIN
  CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'AUTHOR');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "RevisionEntityType" AS ENUM ('POST', 'PROJECT');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
  CREATE TYPE "RevisionReason" AS ENUM ('UPDATE', 'AUTOSAVE', 'PUBLISH', 'UNPUBLISH', 'ROLLBACK', 'BULK_OPERATION');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Add columns expected by the codebase
ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "role" "UserRole" NOT NULL DEFAULT 'AUTHOR';

ALTER TABLE "Project"
  ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1;

ALTER TABLE "ContentPost"
  ADD COLUMN IF NOT EXISTS "version" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS "headings" JSONB,
  ADD COLUMN IF NOT EXISTS "readingTime" INTEGER,
  ADD COLUMN IF NOT EXISTS "wordCount" INTEGER;

-- Revisions table
CREATE TABLE IF NOT EXISTS "ContentRevision" (
  "id" TEXT NOT NULL,
  "entityType" "RevisionEntityType" NOT NULL,
  "entityId" TEXT NOT NULL,
  "entityVersion" INTEGER NOT NULL,
  "reason" "RevisionReason" NOT NULL,
  "snapshot" JSONB NOT NULL,
  "clientMutationId" TEXT,
  "createdById" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "ContentRevision_pkey" PRIMARY KEY ("id")
);

-- Indexes for common admin/editor flows
CREATE INDEX IF NOT EXISTS "ContentRevision_entityType_entityId_createdAt_idx"
  ON "ContentRevision"("entityType", "entityId", "createdAt" DESC);

CREATE INDEX IF NOT EXISTS "ContentRevision_entityType_entityId_entityVersion_idx"
  ON "ContentRevision"("entityType", "entityId", "entityVersion");

-- Idempotency for autosave retries
CREATE UNIQUE INDEX IF NOT EXISTS "ContentRevision_entityType_entityId_clientMutationId_key"
  ON "ContentRevision"("entityType", "entityId", "clientMutationId");

-- Foreign key to users (optional)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'ContentRevision_createdById_fkey'
  ) THEN
    ALTER TABLE "ContentRevision"
    ADD CONSTRAINT "ContentRevision_createdById_fkey"
    FOREIGN KEY ("createdById") REFERENCES "User"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

