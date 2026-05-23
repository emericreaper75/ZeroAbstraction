import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { toggleProjectPublish } from "@/actions/project-actions";

export const metadata = { title: "ZeroAbstraction | Projects" };

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "all";
  const q = params.q ?? "";

  const where = {
    ...(q ? { title: { contains: q, mode: "insensitive" as const } } : {}),
    ...(status === "live" ? { published: true } : {}),
    ...(status === "in-progress" ? { published: false } : {}),
  };

  const projects = await prisma.project.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const totalCount = await prisma.project.count();
  const liveCount = await prisma.project.count({ where: { published: true } });
  const inProgressCount = await prisma.project.count({ where: { published: false } });

  const tabs = [
    { key: "all", label: "All", count: totalCount },
    { key: "live", label: "Live", count: liveCount },
    { key: "in-progress", label: "In Progress", count: inProgressCount },
    { key: "archived", label: "Archived", count: 0 },
  ];

  function StatusBadge({ published }: { published: boolean }) {
    return published ? (
      <span className="bg-zinc-700 text-white text-[10px] font-label px-2 py-0.5 rounded uppercase">Live</span>
    ) : (
      <span className="bg-amber-900/30 text-amber-500 text-[10px] font-label px-2 py-0.5 rounded uppercase border border-amber-900">In Progress</span>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <nav className="mb-2">
            <span className="font-label text-xs tracking-widest text-zinc-500 uppercase">Admin / Projects</span>
          </nav>
          <h1 className="font-display text-[36px] font-bold leading-none text-on-surface tracking-tight">Projects</h1>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-zinc-200 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-sm transition-all duration-200 font-label text-xs uppercase font-bold tracking-widest"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Project
        </Link>
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <form className="flex-1 max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
          <input
            name="q"
            defaultValue={q}
            className="w-full bg-[#111111] border border-zinc-700 text-zinc-300 text-xs px-10 py-2.5 focus:outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-all font-body"
            placeholder="Search projects..."
            type="text"
          />
        </form>
        <nav className="flex gap-6 border-b border-zinc-800">
          {tabs.map(({ key, label }) => (
            <Link
              key={key}
              href={`/admin/projects?status=${key}`}
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
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Project</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Stack</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Status</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Featured</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Date</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-zinc-500 font-label text-xs uppercase tracking-widest">No projects found.</td>
                </tr>
              ) : (
                projects.map((proj, i) => (
                  <tr key={proj.id} className={`${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"} hover:bg-zinc-800/40 transition-colors group`}>
                    <td className="py-4 px-4">
                      <Link href={`/admin/projects/${proj.id}/edit`} className="font-display font-bold text-zinc-100 hover:text-white transition-colors">
                        {proj.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {proj.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="bg-zinc-800 text-[10px] font-label text-zinc-400 px-2 py-0.5 rounded uppercase tracking-tighter">
                            {tag.replace(/"/g, "")}
                          </span>
                        ))}
                        {proj.tags.length > 2 && (
                          <span className="text-[10px] font-label text-zinc-600">+{proj.tags.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4"><StatusBadge published={proj.published} /></td>
                    <td className="py-4 px-4">
                      {proj.featured ? (
                        <span className="bg-zinc-700 text-white text-[10px] font-label px-2 py-0.5 rounded uppercase">Featured</span>
                      ) : (
                        <span className="text-zinc-600 font-label text-[10px]">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-label text-xs text-zinc-500">
                      {proj.createdAt.toISOString().slice(0, 10).replace(/-/g, ".")}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2 text-zinc-400">
                        <Link href={`/admin/projects/${proj.id}/edit`} className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title="Edit Project">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <form action={toggleProjectPublish} className="inline">
                          <input type="hidden" name="id" value={proj.id} />
                          <input type="hidden" name="published" value={String(proj.published)} />
                          <button type="submit" className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title={proj.published ? "Unpublish" : "Publish"}>
                            <span className="material-symbols-outlined text-sm">{proj.published ? "unpublished" : "publish"}</span>
                          </button>
                        </form>
                        <Link href={`/admin/projects/${proj.id}/delete`} className="p-1.5 hover:text-[#ffb4ab] hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded transition-all duration-150 flex items-center justify-center" title="Delete Project">
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

      {/* Pagination */}
      <footer className="px-12 py-8 flex justify-end">
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-100 transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-100 bg-zinc-800 rounded-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-500 hover:text-zinc-100 transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-100 transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
}