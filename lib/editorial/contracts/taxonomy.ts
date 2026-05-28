/**
 * lib/editorial/contracts/taxonomy.ts
 *
 * Canonical taxonomy system — single source of truth for all editorial classifications.
 * These enums and constants are used across validation, contracts, services, and rendering.
 */

/**
 * Content categories mirroring ContentCategory from Prisma.
 * Used to organize posts and research into thematic groups.
 */
export enum ContentCategory {
  ELECTRONICS = 'ELECTRONICS',
  ASTROPHYSICS = 'ASTROPHYSICS',
  PHYSICS_MATH = 'PHYSICS_MATH',
  COMMUNICATIONS = 'COMMUNICATIONS',
}

export const CONTENT_CATEGORIES = [
  ContentCategory.ELECTRONICS,
  ContentCategory.ASTROPHYSICS,
  ContentCategory.PHYSICS_MATH,
  ContentCategory.COMMUNICATIONS,
] as const;
export type ContentCategoryType = typeof CONTENT_CATEGORIES[number];

/**
 * Normalized, lowercase versions for route segments and slugs.
 */
export const CATEGORY_ROUTE_MAP: Record<ContentCategory, string> = {
  [ContentCategory.ELECTRONICS]: 'electronics',
  [ContentCategory.ASTROPHYSICS]: 'astrophysics',
  [ContentCategory.PHYSICS_MATH]: 'physics-math',
  [ContentCategory.COMMUNICATIONS]: 'communications',
};

/**
 * Human-readable labels for categories.
 */
export const CATEGORY_LABELS: Record<ContentCategory, string> = {
  [ContentCategory.ELECTRONICS]: 'Electronics',
  [ContentCategory.ASTROPHYSICS]: 'Astrophysics',
  [ContentCategory.PHYSICS_MATH]: 'Physics & Mathematics',
  [ContentCategory.COMMUNICATIONS]: 'Communications',
};

/**
 * Content type classification: posts, projects, research logs, etc.
 */
export enum ContentType {
  POST = 'POST',
  PROJECT = 'PROJECT',
  RESEARCH_LOG = 'RESEARCH_LOG',
  CASE_STUDY = 'CASE_STUDY',
  SNIPPET = 'SNIPPET',
}

export const CONTENT_TYPES = [
  ContentType.POST,
  ContentType.PROJECT,
  ContentType.RESEARCH_LOG,
  ContentType.CASE_STUDY,
  ContentType.SNIPPET,
] as const;
export type ContentTypeValue = typeof CONTENT_TYPES[number];

/**
 * Publication status: draft, published, archived, etc.
 */
export enum PublishStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
  SCHEDULED = 'SCHEDULED',
}

export const PUBLISH_STATUSES = [
  PublishStatus.DRAFT,
  PublishStatus.PUBLISHED,
  PublishStatus.ARCHIVED,
  PublishStatus.SCHEDULED,
] as const;
export type PublishStatusValue = typeof PUBLISH_STATUSES[number];

/**
 * Difficulty level for content (useful for filtering, discovery, learning paths).
 */
export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export const DIFFICULTY_LEVELS = [
  DifficultyLevel.BEGINNER,
  DifficultyLevel.INTERMEDIATE,
  DifficultyLevel.ADVANCED,
  DifficultyLevel.EXPERT,
] as const;
export type DifficultyLevelValue = typeof DIFFICULTY_LEVELS[number];

/**
 * Milestone phases for research and project timelines.
 * Used to track progress through conception, development, publication, etc.
 */
export enum MilestonePhase {
  CONCEPT = 'CONCEPT',
  RESEARCH = 'RESEARCH',
  DEVELOPMENT = 'DEVELOPMENT',
  TESTING = 'TESTING',
  PUBLICATION = 'PUBLICATION',
  MAINTENANCE = 'MAINTENANCE',
  SUNSET = 'SUNSET',
}

export const MILESTONE_PHASES = [
  MilestonePhase.CONCEPT,
  MilestonePhase.RESEARCH,
  MilestonePhase.DEVELOPMENT,
  MilestonePhase.TESTING,
  MilestonePhase.PUBLICATION,
  MilestonePhase.MAINTENANCE,
  MilestonePhase.SUNSET,
] as const;
export type MilestonePhaseValue = typeof MILESTONE_PHASES[number];

/**
 * Timeline groups for semantic grouping of events.
 * Used to organize timeline entries by source type.
 */
export enum TimelineGroup {
  PUBLICATION = 'PUBLICATION',
  RELEASE = 'RELEASE',
  MILESTONE = 'MILESTONE',
  BREAKTHROUGH = 'BREAKTHROUGH',
  COLLABORATION = 'COLLABORATION',
  CONFERENCE = 'CONFERENCE',
  AWARD = 'AWARD',
}

export const TIMELINE_GROUPS = [
  TimelineGroup.PUBLICATION,
  TimelineGroup.RELEASE,
  TimelineGroup.MILESTONE,
  TimelineGroup.BREAKTHROUGH,
  TimelineGroup.COLLABORATION,
  TimelineGroup.CONFERENCE,
  TimelineGroup.AWARD,
] as const;
export type TimelineGroupValue = typeof TIMELINE_GROUPS[number];

/**
 * Relationship types for semantic linking.
 * Used to describe how content relates to other content.
 */
export enum RelationshipType {
  RELATED = 'RELATED',
  PREREQUISITE = 'PREREQUISITE',
  CONTINUATION = 'CONTINUATION',
  VARIANT = 'VARIANT',
  REFERENCE = 'REFERENCE',
  INSPIRED_BY = 'INSPIRED_BY',
  BUILDS_ON = 'BUILDS_ON',
}

export const RELATIONSHIP_TYPES = [
  RelationshipType.RELATED,
  RelationshipType.PREREQUISITE,
  RelationshipType.CONTINUATION,
  RelationshipType.VARIANT,
  RelationshipType.REFERENCE,
  RelationshipType.INSPIRED_BY,
  RelationshipType.BUILDS_ON,
] as const;
export type RelationshipTypeValue = typeof RELATIONSHIP_TYPES[number];

/**
 * User roles for authorization.
 */
export enum UserRole {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  AUTHOR = 'AUTHOR',
}

export const USER_ROLES = [
  UserRole.ADMIN,
  UserRole.EDITOR,
  UserRole.AUTHOR,
] as const;
export type UserRoleValue = typeof USER_ROLES[number];

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.ADMIN]: 'Administrator',
  [UserRole.EDITOR]: 'Editor',
  [UserRole.AUTHOR]: 'Author',
};

/**
 * Role hierarchy for permission checking.
 * ADMIN > EDITOR > AUTHOR
 */
export const ROLE_ORDER: Record<UserRole, number> = {
  [UserRole.ADMIN]: 3,
  [UserRole.EDITOR]: 2,
  [UserRole.AUTHOR]: 1,
};
