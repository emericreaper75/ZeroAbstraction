export type ContentCategory =
  | "ELECTRONICS"
  | "ASTROPHYSICS"
  | "PHYSICS_MATH"
  | "COMMUNICATIONS";

export const CATEGORY_ROUTE_TO_ENUM: Record<string, ContentCategory> = {
  electronics: "ELECTRONICS",
  astrophysics: "ASTROPHYSICS",
  "physics-math": "PHYSICS_MATH",
  communications: "COMMUNICATIONS",
};

export const CATEGORY_ENUM_TO_ROUTE: Record<ContentCategory, string> = {
  ELECTRONICS: "electronics",
  ASTROPHYSICS: "astrophysics",
  PHYSICS_MATH: "physics-math",
  COMMUNICATIONS: "communications",
};

export const CATEGORY_LABELS: Record<string, string> = {
  electronics: "Electronics",
  astrophysics: "Astrophysics",
  "physics-math": "Physics & Math",
  communications: "Communications",
};
