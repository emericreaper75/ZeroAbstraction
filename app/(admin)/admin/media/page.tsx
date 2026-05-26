import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export const metadata = { title: "ZeroAbstraction | Media" };

export default async function AdminMediaPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; q?: string }>;
}) {
  const params = await searchParams;
  const typeFilter = params.type ?? "all";
  const q = params.q ?? "";

  const assets = await prisma.mediaAsset.findMany({
    where: {
      ...(q ? { name: { contains: q, mode: "insensitive" as const } } : {}),
      ...(typeFilter !== "all" ? { type: { startsWith: typeFilter } } : {}),
    },
    orderBy: { createdAt: "desc" },
    take: 30,
  });

  const totalCount = await prisma.mediaAsset.count();
  const imageCount = await prisma.mediaAsset.count({ where: { type: { startsWith: "image" } } });
  const videoCount = await prisma.mediaAsset.count({ where: { type: { startsWith: "video" } } });

  const tabs = [
    { key: "all", label: "All" },
    { key: "image", label: "Images" },
    { key: "application", label: "Documents" },
    { key: "video", label: "Video" },
  ];

  function formatBytes(bytes: number | null) {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="w-full pt-12 px-4 md:px-12 pb-8 flex justify-between items-end gap-4">
        <div>
          <nav className="mb-2">
            <span className="font-label text-xs tracking-widest text-zinc-500 uppercase">Admin / Media</span>
          </nav>
          <h1 className="font-display text-[36px] font-bold leading-none text-on-surface tracking-tight">Media</h1>
        </div>
        <Link
          href="/admin/media/upload"
          className="flex items-center gap-2 bg-zinc-200 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-sm transition-all font-label text-xs uppercase font-bold tracking-widest shrink-0"
        >
          <span className="material-symbols-outlined text-sm">upload</span>
          Upload
        </Link>
      </header>

      {/* Controls */}
      <section className="px-4 md:px-12 mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
        <div className="w-full md:max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
          <input
            className="w-full bg-[#111111] border border-zinc-700 text-zinc-300 text-xs px-10 py-2.5 focus:outline-none focus:border-zinc-300 transition-all font-body"
            placeholder="Search media by filename..."
            defaultValue={q}
          />
        </div>
        <div className="w-full md:w-auto overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0">
          <nav className="flex gap-6 border-b border-zinc-800 flex-nowrap min-w-max">
            {tabs.map(({ key, label }) => (
              <Link
                key={key}
                href={`/admin/media?type=${key}`}
                className={`pb-2 px-1 text-xs font-label uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                  typeFilter === key ? "text-zinc-100 border-zinc-100" : "text-zinc-500 hover:text-zinc-300 border-transparent"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Upload Dropzone */}
      <section className="px-4 md:px-12 mb-8">
        <Link href="/admin/media/upload">
          <div className="custom-dashed-border p-8 flex flex-col items-center gap-4 cursor-pointer hover:border-zinc-500 transition-all group">
            <span className="material-symbols-outlined text-4xl text-zinc-600 group-hover:text-zinc-400 transition-colors">cloud_upload</span>
            <div className="text-center">
              <p className="font-body text-sm text-zinc-400">
                Drop files here or{" "}
                <span className="text-[#c9c6c5] hover:text-white transition-colors underline underline-offset-2">browse to upload</span>
              </p>
              <p className="font-label text-[10px] text-zinc-600 uppercase tracking-widest mt-1">PNG · JPG · SVG · MP4 · PDF · Max 64MB</p>
            </div>
          </div>
        </Link>
      </section>

      {/* Stats */}
      <div className="px-4 md:px-12 mb-6 flex items-center gap-8">
        <span className="font-label text-[10px] uppercase tracking-widest text-zinc-500">{totalCount} Total Assets</span>
        <span className="font-label text-[10px] uppercase tracking-widest text-zinc-600">{imageCount} Images · {videoCount} Videos</span>
      </div>

      {/* Media Grid */}
      <section className="flex-1 px-4 md:px-12 overflow-y-auto custom-scrollbar">
        {assets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-4">
            <span className="material-symbols-outlined text-4xl text-zinc-700">image</span>
            <p className="font-label text-xs uppercase tracking-widest text-zinc-600">No media assets found.</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {assets.map((asset) => (
              <div key={asset.id} className="masonry-item group relative overflow-hidden bg-[#111111] border border-zinc-800">
                {asset.type?.startsWith("image") ? (
                  <img
                    src={asset.url}
                    alt={asset.name ?? "Media asset"}
                    className="w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="aspect-video flex items-center justify-center">
                    <span className="material-symbols-outlined text-4xl text-zinc-600">description</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="font-label text-[10px] text-zinc-200 truncate">{asset.name ?? asset.key}</p>
                  <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest">{formatBytes(asset.size)}</p>
                  <div className="flex gap-2 mt-2">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer"
                      className="flex-1 text-center py-1.5 bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 font-label text-[9px] uppercase tracking-widest transition-colors"
                    >
                      View
                    </a>
                    <button className="flex-1 py-1.5 bg-red-900/50 hover:bg-red-900 text-red-200 font-label text-[9px] uppercase tracking-widest transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
