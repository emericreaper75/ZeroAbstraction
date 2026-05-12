import type { ContentPost, Project } from "@prisma/client";

export type RevisionSnapshot =
  | {
      entityType: "POST";
      entity: ContentPost;
    }
  | {
      entityType: "PROJECT";
      entity: Project;
    };

