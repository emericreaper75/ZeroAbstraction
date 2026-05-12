export type JobName =
  | "homepage.rebuild"
  | "search.reindex"
  | "analytics.flush";

export type JobPayloadByName = {
  "homepage.rebuild": { reason: string };
  "search.reindex": { entity: "post" | "project"; id?: string };
  "analytics.flush": { reason: string };
};

export type Job<TName extends JobName = JobName> = {
  name: TName;
  payload: JobPayloadByName[TName];
  createdAt: string;
};

