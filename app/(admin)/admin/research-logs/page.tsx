import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { toggleResearchLogPublish } from "@/actions/research-log-actions";

export const metadata = { title: "ZeroAbstraction | Research Logs" };

export default async function AdminResearchLogsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; series?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "all";
  const q = params.q ?? "";
  const seriesFilter = params.series ?? "";

  const where = {
    ...(q ? { title: { contains: q, mode: "insensitive" as const } } : {}),
    ...(status === "published" ? { published: true } : {}),
    ...(status === "draft" ? { published: false } : {}),
    ...(seriesFilter ? { series: seriesFilter } : {}),
  };

  const [logs, allSeries, totalCount, publishedCount, draftCount] = await Promise.all([
    prisma.researchLog.findMany({ where, orderBy: { entryNumber: "desc" } }),
    prisma.researchLog.findMany({ distinct: ["series"], select: { series: true } }),
    prisma.researchLog.count(),
    prisma.researchLog.count({ where: { published: true } }),
    prisma.researchLog.count({ where: { published: false } }),
  ]);

  const tabs = [
    { key: "all", label: "All", count: totalCount },
    { key: "published", label: "Published", count: publishedCount },
    { key: "draft", label: "Draft", count: draftCount },
  ];

  function StatusBadge({ published }: { published: boolean }) {
    return published ? (
      <span className="bg-zinc-700 text-white text-[10px] font-label px-2 py-0.5 rounded uppercase">Published</span>
    ) : (
      <span className="bg-amber-900/30 text-amber-500 text-[10px] font-label px-2 py-0.5 rounded uppercase border border-amber-900">Draft</span>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <nav className="mb-2">
            <span className="font-label text-xs tracking-widest text-zinc-500 uppercase">Admin / Research Logs</span>
          </nav>
          <h1 className="font-display text-[36px] font-bold leading-none text-on-surface tracking-tight">Research Logs</h1>
        </div>
        <Link
          href="/admin/research-logs/new"
          className="flex items-center gap-2 bg-zinc-200 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-sm transition-all duration-200 font-label text-xs uppercase font-bold tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Research Log
        </Link>
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <form className="flex gap-4 flex-1">
          <div className="flex-1 max-w-md relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
            <input
              name="q"
              defaultValue={q}
              className="w-full bg-[#111111] border border-zinc-700 text-zinc-300 text-xs px-10 py-2.5 focus:outline-none focus:border-zinc-300 transition-all font-body"
              placeholder="Search logs by title..."
            />
          </div>
          <select
            name="series"
            defaultValue={seriesFilter}
            className="bg-[#111111] border border-zinc-700 text-zinc-300 text-xs px-4 py-2.5 focus:outline-none focus:border-zinc-300 font-label uppercase appearance-none"
          >
            <option value="">All Series</option>
            {allSeries.map(({ series }) => (
              <option key={series} value={series}>{series}</option>
            ))}
          </select>
        </form>
        <nav className="flex gap-6 border-b border-zinc-800">
          {tabs.map(({ key, label }) => (
            <Link
              key={key}
              href={`/admin/research-logs?status=${key}`}
              className={`pb-2 px-1 text-xs font-label uppercase tracking-widest border-b-2 transition-colors ${
                status === key ? "text-zinc-100 border-zinc-100" : "text-zinc-500 hover:text-zinc-300 border-transparent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </section>

      {/* Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10">
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Entry #</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Log Title</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Series</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Status</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Published Date</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-zinc-500 font-label text-xs uppercase tracking-widest">No research logs found.</td>
                </tr>
              ) : (
                logs.map((log, i) => (
                  <tr key={log.id} className={`${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"} hover:bg-zinc-800/40 transition-colors`}>
                    <td className="py-4 px-4 font-label text-sm text-zinc-500 font-bold">
                      #{String(log.entryNumber).padStart(3, "0")}
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/admin/research-logs/${log.id}/edit`} className="font-display font-bold text-zinc-100 hover:text-white transition-colors">
                        {log.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-zinc-800 text-[10px] font-label text-zinc-400 px-2 py-0.5 rounded uppercase tracking-tighter whitespace-nowrap">{log.series}</span>
                    </td>
                    <td className="py-4 px-4"><StatusBadge published={log.published} /></td>
                    <td className="py-4 px-4 font-label text-xs text-zinc-500">
                      {log.published ? log.updatedAt.toISOString().slice(0, 10).replace(/-/g, ".") : "----.--.--"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2 text-zinc-400">
                        <Link href={`/admin/research-logs/${log.id}/edit`} className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title="Edit Research Log">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <form action={toggleResearchLogPublish} className="inline">
                          <input type="hidden" name="id" value={log.id} />
                          <button type="submit" className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title={log.published ? "Unpublish" : "Publish"}>
                            <span className="material-symbols-outlined text-sm">{log.published ? "unpublished" : "publish"}</span>
                          </button>
                        </form>
                        <Link href={`/admin/research-logs/${log.id}/delete`} className="p-1.5 hover:text-[#ffb4ab] hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded transition-all duration-150 flex items-center justify-center" title="Delete Research Log">
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="px-12 py-8 flex justify-end">
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-100 bg-zinc-800 rounded-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
        </div>
      </footer>
    </div>
  );
}
