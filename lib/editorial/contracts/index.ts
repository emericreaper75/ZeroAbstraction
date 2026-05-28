/**
 * lib/editorial/contracts/index.ts
 *
 * Centralized export of all editorial contracts.
 * Single import point for contract schemas, types, and taxonomy.
 */

// Taxonomy — canonical enums and constants
export {
  ContentCategory,
  CONTENT_CATEGORIES,
  CATEGORY_ROUTE_MAP,
  CATEGORY_LABELS,
  ContentType,
  CONTENT_TYPES,
  PublishStatus,
  PUBLISH_STATUSES,
  DifficultyLevel,
  DIFFICULTY_LEVELS,
  MilestonePhase,
  MILESTONE_PHASES,
  TimelineGroup,
  TIMELINE_GROUPS,
  RelationshipType,
  RELATIONSHIP_TYPES,
  UserRole,
  USER_ROLES,
  ROLE_LABELS,
  ROLE_ORDER,
  type ContentCategoryType,
  type ContentTypeValue,
  type PublishStatusValue,
  type DifficultyLevelValue,
  type MilestonePhaseValue,
  type TimelineGroupValue,
  type RelationshipTypeValue,
  type UserRoleValue,
} from './taxonomy';

// Base editorial contract
export {
  EditorialBaseMetaSchema,
  createEditorialSchema,
  mergeEditorialSchemas,
  type EditorialBaseMeta,
} from './base';

// Relationship contract
export {
  EditorialRelationshipRefSchema,
  EditorialConceptSchema,
  EditorialTechnologySchema,
  EditorialRelationshipMetaSchema,
  type EditorialRelationshipRef,
  type EditorialConcept,
  type EditorialTechnology,
  type EditorialRelationshipMeta,
} from './relationship';

// Timeline contract
export {
  EditorialMilestoneSchema,
  EditorialTimelineGroupSchema,
  EditorialChronologySchema,
  EditorialTimelineMetaSchema,
  type EditorialMilestone,
  type EditorialTimelineGroup,
  type EditorialChronology,
  type EditorialTimelineMeta,
} from './timeline';

// Post contract
export {
  PostContractSchema,
  PostInputSchema,
  type PostContract,
  type PostInput,
} from './post-contract';

// Project contract
export {
  ProjectContractSchema,
  ProjectInputSchema,
  type ProjectContract,
  type ProjectInput,
} from './project-contract';

// Research contract
export {
  ResearchContractSchema,
  ResearchInputSchema,
  type ResearchContract,
  type ResearchInput,
} from './research-contract';
