export type NodeType = 'post' | 'project' | 'research' | 'timeline';

export interface ContentNode {
  id: string; // A unique identifier across all types (e.g., "post:/category/slug", "project:my-project", "timeline:tl-001")
  type: NodeType;
  title: string;
  description: string;
  date: string; // ISO string, for timeline/projects it might be generalized (e.g., year -> "2024-01-01")
  url: string; // The canonical URL to visit this content
  tags: string[]; // Normalized array of tags/tech/domain
  category: string; // e.g. 'electronics', 'astrophysics', or domain
  
  // Type-specific original data references can be attached if needed, 
  // but we keep the node flat for the graph engine
  raw?: unknown;
}

export type RelationType = 
  | 'shares_tags'
  | 'timeline_event'
  | 'shares_category'
  | 'explicit_link';

export interface GraphEdge {
  sourceId: string;
  targetId: string;
  type: RelationType;
  weight: number; // 0.0 to 1.0 or higher depending on scoring
}

export interface ScoredNode {
  node: ContentNode;
  score: number;
  reasons: string[];
}
