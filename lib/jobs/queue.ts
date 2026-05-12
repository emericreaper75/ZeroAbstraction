import "server-only";

import type { Job, JobName, JobPayloadByName } from "@/lib/jobs/types";

/**
 * Queue abstraction so we can swap in Upstash QStash, BullMQ, SQS, etc later
 * without changing business logic.
 *
 * For now this is a no-op in production and in-memory in dev.
 */
const devQueue: Job[] = [];

export async function enqueue<TName extends JobName>(name: TName, payload: JobPayloadByName[TName]) {
  const job: Job<TName> = {
    name,
    payload,
    createdAt: new Date().toISOString(),
  };

  if (process.env.NODE_ENV !== "production") {
    devQueue.push(job);
  }

  return { ok: true as const, job };
}

export async function listDevJobs() {
  return devQueue.slice().reverse();
}

