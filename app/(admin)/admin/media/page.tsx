import MediaUploader from "@/components/media/MediaUploader";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Media</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Upload images and reuse them across posts/projects.
        </p>
      </div>

      <MediaUploader />

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Library
          </p>
          <p className="text-xs text-zinc-500">{assets.length} items</p>
        </div>

        {assets.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">No media uploaded yet.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {assets.map((a) => (
              <div
                key={a.id}
                className="group rounded-xl border border-zinc-800 bg-zinc-950/30 p-3"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/30">
                  <Image
                    src={a.url}
                    alt={a.name ?? "Media asset"}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="object-cover transition group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-3">
                  <p className="truncate text-xs font-mono text-zinc-400">
                    {a.name ?? a.key}
                  </p>
                  <p className="mt-1 truncate text-[11px] text-zinc-600">
                    {a.url}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

