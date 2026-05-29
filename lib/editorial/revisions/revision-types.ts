import type { ContentPost, Project, ResearchLog } from "@prisma/client";

export type RevisionSnapshot =
  | {
      entityType: "POST";
      entity: ContentPost;
    }
  | {
      entityType: "PROJECT";
      entity: Project;
    }
  | {
      entityType: "RESEARCH_LOG";
      entity: ResearchLog;
    };
