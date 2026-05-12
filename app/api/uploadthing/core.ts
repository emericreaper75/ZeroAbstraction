import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";

const f = createUploadthing();

export const ourFileRouter = {
  media: f({
    image: { maxFileSize: "8MB", maxFileCount: 10 },
  })
    .middleware(async () => {
      const session = await auth();
      const userId = (session?.user as { id?: string } | undefined)?.id;

      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Persist upload metadata for a real "media library".
      // UploadThing provides `file` details (url, key, name, size, type).
      await prisma.mediaAsset.upsert({
        where: { key: file.key },
        create: {
          key: file.key,
          url: file.url,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedById: metadata.userId,
        },
        update: {
          url: file.url,
          name: file.name,
          type: file.type,
          size: file.size,
          uploadedById: metadata.userId,
        },
      });

      return { key: file.key, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

