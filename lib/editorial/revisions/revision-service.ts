import "server-only";

import type { PrismaClient, Prisma as PrismaTypes } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { auth } from "@/auth";
import type { RevisionEntityType, RevisionReason } from "@prisma/client";

type CreateRevisionInput = {
  entityType: RevisionEntityType;
  entityId: string;
  entityVersion: number;
  reason: RevisionReason;
  snapshot: unknown;
  clientMutationId?: string | null;
  db?: PrismaClient | PrismaTypes.TransactionClient;
};

export async function createRevision({
  entityType,
  entityId,
  entityVersion,
  reason,
  snapshot,
  clientMutationId,
  db,
}: CreateRevisionInput) {
  const session = await auth();

  const client = db ?? prisma;

  const userId =
    session?.user && typeof session.user === "object" && "id" in session.user
      ? (session.user as { id: string }).id
      : null;

  try {
    return await client.contentRevision.create({
      data: {
        entityType,
        entityId,
        entityVersion,
        reason,
        snapshot: snapshot as Prisma.InputJsonValue,
        clientMutationId: clientMutationId ?? null,
        createdById: userId,
      },
    });
  } catch (err) {
    // Idempotency: autosave retries may re-send the same clientMutationId.
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002" &&
      clientMutationId
    ) {
      return client.contentRevision.findFirst({
        where: {
          entityType,
          entityId,
          clientMutationId,
        },
      });
    }
    throw err;
  }
}

export async function listRevisions(input: {
  entityType: RevisionEntityType;
  entityId: string;
  take?: number;
}) {
  return prisma.contentRevision.findMany({
    where: {
      entityType: input.entityType,
      entityId: input.entityId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: input.take ?? 50,
    include: {
      createdBy: true,
    },
  });
}

