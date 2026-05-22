# Decision: MDX Filesystem over DB

* Use flat files (`.mdx`) for content instead of storing raw Markdown in PostgreSQL.
* Allows version control of content.
* Allows rich component embedding in markdown.
* DB is used for indexing/metadata (e.g., sync script) but file is source of truth.
