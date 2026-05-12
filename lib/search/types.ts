export type SearchEntityType = "post" | "project";

export type SearchResultItem = {
  type: SearchEntityType;
  id: string;
  title: string;
  description: string | null;
  href: string;
  tags: string[];
  score: number;
  /**
   * Optional display metadata.
   * - posts: category slug used for canonical URL construction
   */
  category?: string;
  /**
   * Optional thumbnail url for richer UIs later.
   */
  thumbnail?: string | null;
};

export type SearchResponse = {
  query: string;
  limit: number;
  items: SearchResultItem[];
};

