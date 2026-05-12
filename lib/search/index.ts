import "server-only";

export type SearchDocument = {
  id: string;
  type: "post" | "project";
  title: string;
  description?: string;
  tags?: string[];
  url: string;
};

/**
 * Search abstraction for future Meilisearch integration.
 */
export async function indexDocuments(_docs: SearchDocument[]) {
  void _docs;
  return { ok: true as const };
}

export async function deleteDocuments(_ids: { type: "post" | "project"; id: string }[]) {
  void _ids;
  return { ok: true as const };
}

