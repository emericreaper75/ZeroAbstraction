import type { ContentCategory } from "@prisma/client";

export const CATEGORY_ROUTE_TO_ENUM: Record<string, ContentCategory> = {
  electronics: "ELECTRONICS",
  astrophysics: "ASTROPHYSICS",
  "physics-math": "PHYSICS_MATH",
  "research-logs": "RESEARCH_LOGS",
};

export const CATEGORY_ENUM_TO_ROUTE: Record<ContentCategory, string> = {
  ELECTRONICS: "electronics",
  ASTROPHYSICS: "astrophysics",
  PHYSICS_MATH: "physics-math",
  RESEARCH_LOGS: "research-logs",
};

export const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Electronics",
  astrophysics: "Astrophysics",
  "physics-math": "Physics & Math",
  "research-logs": "Research Logs",
};

