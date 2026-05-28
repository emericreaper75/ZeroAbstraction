import { PrismaClient } from "@prisma/client";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Auto-detect host vs docker environment for DATABASE_URL
let databaseUrl = process.env.DATABASE_URL;
if (databaseUrl && databaseUrl.includes("host.docker.internal")) {
  const isDocker = fs.existsSync("/.dockerenv");
  if (!isDocker) {
    databaseUrl = databaseUrl.replace("host.docker.internal", "localhost");
  }
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: databaseUrl
      ? {
          db: {
            url: databaseUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "production" ? ["error"] : ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}