# ZeroAbstraction: Database Schema & Relations

This document details the PostgreSQL schema managed via Prisma ORM, explaining the models, enums, relationships, and indexing strategies.

---

## 1. Database Schema Diagram (Logical)

```text
  +-------------------+              +-------------------------+
  |       User        |              |     ContentRevision     |
  +-------------------+              +-------------------------+
  | id (PK)           |<-------------| id (PK)                 |
  | email (Unique)    |              | entityType (Enum)       |
  | passwordHash      |              | entityId                |
  | name              |              | entityVersion           |
  | role (Enum)       |              | reason (Enum)           |
  | createdAt         |              | snapshot (Json)         |
  | updatedAt         |              | clientMutationId (Unique|
  +-------------------+              | createdById (FK)        |
           |                         | createdAt               |
           |                         +-------------------------+
           | (One-to-Many)
           |
           v
  +-------------------+
  |    MediaAsset     |
  +-------------------+
  | id (PK)           |
  | key (Unique)      |
  | url               |
  | name              |
  | type              |              +-------------------------+
  | size              |              |       ContentPost       |
  | width             |              +-------------------------+
  | height            |              | id (PK)                 |
  | metadata (Json)   |              | title                   |
  | uploadedById (FK) |              | slug (Unique)           |
  | createdAt         |              | description             |
  | updatedAt         |              | content                 |
  +-------------------+              | headings (Json)         |
                                     | readingTime             |
                                     | wordCount               |
  +-------------------+              | category (Enum)         |
  |      Project      |              | tags (String[])         |
  +-------------------+              | thumbnail               |
  | id (PK)           |              | thumbnailAlt            |
  | title             |              | featured (Bool)         |
  | slug (Unique)     |              | published (Bool)        |
  | description       |              | version                 |
  | content           |              | createdAt               |
  | tags (String[])   |              | updatedAt               |
  | thumbnail         |              +-------------------------+
  | thumbnailAlt      |
  | githubUrl         |              +-------------------------+
  | liveUrl           |              |       ResearchLog       |
  | featured (Bool)   |              +-------------------------+
  | published (Bool)  |              | id (PK)                 |
  | version           |              | entryNumber (Unique)    |
  | createdAt         |              | title                   |
  | updatedAt         |              | slug (Unique)           |
  +-------------------+              | series                  |
                                     | abstract                |
  +-------------------+              | content                 |
  |  ContactMessage   |              | tags (String[])         |
  +-------------------+              | published (Bool)        |
  | id (PK)           |              | createdAt               |
  | name              |              | updatedAt               |
  | email             |              +-------------------------+
  | subject           |
  | message           |
  | createdAt         |
  +-------------------+
```

---

## 2. Enums Definition

### `ContentCategory`
Specifies content groupings. Note that the frontend maps specific atmospheric backgrounds based on these categories:
- `ELECTRONICS`
- `ASTROPHYSICS`
- `PHYSICS_MATH`
- `COMMUNICATIONS` (replaces legacy research log categories)

### `UserRole`
Configures capabilities within the administration console:
- `ADMIN`: Full system controls, including user deletion and system configurations.
- `EDITOR`: Ability to write, update, and publish any article/project.
- `AUTHOR`: Ability to edit owned drafts and propose changes.

### `RevisionEntityType`
Determines which target entity a version snapshot points to:
- `POST`
- `PROJECT`

### `RevisionReason`
Contextual tag indicating what triggered the revision:
- `UPDATE` (standard change)
- `AUTOSAVE` (incremental automatic draft check)
- `PUBLISH` (public release state transition)
- `UNPUBLISH` (draft status reversion)
- `ROLLBACK` (reversion to an older version state)
- `BULK_OPERATION` (batch toggle or category movement)

---

## 3. Data Model Profiles

### User
Represents administrators and staff.
- `id`: CUID-based primary key.
- `email`: Unique email string used as user login.
- `passwordHash`: Optional string containing the bcrypt encrypted hash.

### ContentPost
Contains the editorial metadata for filesystem-mirrored posts.
- `slug`: Unique text string matching the URL path.
- `headings`: JSON array caching extracted MDX headings (`{ text, id, depth }`) for fast menu building.
- `readingTime` / `wordCount`: Computed properties generated automatically on compile.

### Project
Describes items in the engineering portfolio.
- Includes repository URLs (`githubUrl`) and dynamic preview sites (`liveUrl`).
- Uses tags (`tags`) to categorize language/stack tools (e.g., `["TypeScript", "FPGA"]`).

### ContentRevision
Tracks snapshots to enable safe rollback functionality.
- `snapshot`: Stores the entire state of the post or project as a raw JSON blob. This lets the schema evolve without invalidating old history.
- `clientMutationId`: Idempotency key supplied by the admin UI to prevent double saves during network retries.

### MediaAsset
Maintains tracking records for files managed via UploadThing.
- `key`: Unique UploadThing transaction slug.
- `metadata`: JSON field containing dimensions, original names, and validation checks.

### ResearchLog
Legacy chronological database entity. Note that recent releases route long-form logs to `ContentPost` under the `COMMUNICATIONS` category.

---

## 4. Indexing & Constraint Strategy

- **Index on Revisions**:
  ```prisma
  @@index([entityType, entityId, createdAt(sort: Desc)])
  @@index([entityType, entityId, entityVersion])
  ```
  Optimizes the version history queries and speeds up rolling back to a specific version number.
- **Unique Constraint on Mutation Key**:
  ```prisma
  @@unique([entityType, entityId, clientMutationId])
  ```
  Prevents duplicate database logs when browser network failures cause autosave operations to repeat.
- **Index on Media Creation**:
  ```prisma
  @@index([createdAt])
  ```
  Improves performance when loading the admin media grid, sorting from newest to oldest.
