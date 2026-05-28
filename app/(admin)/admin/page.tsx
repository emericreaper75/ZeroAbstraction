import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "ZeroAbstraction | Admin Dashboard",
};

export default async function AdminPage() {
  const [
    totalPosts,
    totalProjects,
    totalResearchLogs,
    draftPosts,
    draftProjects,
    mediaAssets,
    recentPosts,
    recentProjects,
  ] = await Promise.all([
    prisma.contentPost.count(),
    prisma.project.count(),
    prisma.researchLog.count(),
    prisma.contentPost.count({ where: { published: false } }),
    prisma.project.count({ where: { published: false } }),
    prisma.mediaAsset.count(),
    prisma.contentPost.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, title: true, slug: true, published: true, createdAt: true },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, title: true, slug: true, published: true, updatedAt: true },
    }),
  ]);

  const totalDrafts = draftPosts + draftProjects;

  function postStatusBadge(published: boolean) {
    return published
      ? <span className="inline-block px-2 py-0.5 bg-zinc-700 text-on-background font-label text-[10px] rounded-sm uppercase">Published</span>
      : <span className="inline-block px-2 py-0.5 bg-amber-900 text-amber-200 font-label text-[10px] rounded-sm uppercase">Draft</span>;
  }

  function projectStatusBadge(published: boolean) {
    return published
      ? <span className="inline-block px-2 py-0.5 bg-zinc-700 text-on-background font-label text-[10px] rounded-sm uppercase">Active</span>
      : <span className="inline-block px-2 py-0.5 bg-amber-900 text-amber-200 font-label text-[10px] rounded-sm uppercase">Dev</span>;
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-12 space-y-16 bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <h1 className="font-display font-bold text-4xl text-on-background tracking-tight">Dashboard</h1>
          <div className="font-label text-xs text-zinc-500 mt-2 uppercase tracking-widest">Admin / Overview</div>
        </div>
        <div>
          <button className="bg-zinc-800 hover:bg-zinc-700 text-on-background font-label text-xs px-4 py-2 border border-zinc-700 transition-all duration-200 flex items-center space-x-2">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            <span>Sync Systems</span>
          </button>
        </div>
      </header>

      {/* Row 1: Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { value: totalPosts, label: "Posts" },
          { value: totalProjects, label: "Projects" },
          { value: totalResearchLogs, label: "Research Logs" },
          { value: totalDrafts, label: "Drafts" },
          { value: mediaAssets.toLocaleString(), label: "Media Count" },
        ].map(({ value, label }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-700 p-6 flex flex-col justify-between h-32 hover:shadow-[0_0_32px_rgba(30,41,59,0.4)] transition-all duration-200">
            <div className="font-display font-bold text-3xl text-on-background">{value}</div>
            <div className="font-label text-xs text-on-surface-variant uppercase tracking-widest">{label}</div>
          </div>
        ))}
      </section>

      {/* Row 2: Recent Posts + Recent Projects */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="font-display font-semibold text-lg text-on-background">Recent Posts</h2>
            <Link href="/admin/posts/new" className="bg-zinc-300 text-black hover:bg-zinc-200 font-label text-xs px-3 py-1.5 transition-all duration-200">
              New Post
            </Link>
          </div>
          <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
            <table className="w-full text-left font-body text-sm">
              <thead className="font-label text-xs text-on-surface-variant uppercase border-b border-zinc-800 bg-[#0a0a0a]">
                <tr>
                  <th className="py-3 px-4 font-normal">Title</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 font-normal text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recentPosts.map((post, i) => (
                  <tr key={post.id} className={`${i % 2 === 1 ? "bg-[#0f0f0f]" : ""} hover:bg-zinc-800 transition-colors duration-200`}>
                    <td className="py-3 px-4 font-medium">
                      <Link href={`/admin/posts/${post.slug}/edit`} className="hover:text-[#c9c6c5] transition-colors">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{postStatusBadge(post.published)}</td>
                    <td className="py-3 px-4 text-right text-on-surface-variant font-label text-xs">
                      {post.createdAt.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <h2 className="font-display font-semibold text-lg text-on-background">Recent Projects</h2>
            <Link href="/admin/projects/new" className="bg-transparent border border-zinc-700 text-on-background hover:bg-zinc-800 font-label text-xs px-3 py-1.5 transition-all duration-200">
              New Project
            </Link>
          </div>
          <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
            <table className="w-full text-left font-body text-sm">
              <thead className="font-label text-xs text-on-surface-variant uppercase border-b border-zinc-800 bg-[#0a0a0a]">
                <tr>
                  <th className="py-3 px-4 font-normal">Project Name</th>
                  <th className="py-3 px-4 font-normal">Status</th>
                  <th className="py-3 px-4 font-normal text-right">Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recentProjects.map((proj, i) => (
                  <tr key={proj.id} className={`${i % 2 === 1 ? "bg-[#0f0f0f]" : ""} hover:bg-zinc-800 transition-colors duration-200`}>
                    <td className="py-3 px-4 font-medium">
                      <Link href={`/admin/projects/${proj.id}/edit`} className="hover:text-[#c9c6c5] transition-colors">
                        {proj.title}
                      </Link>
                    </td>
                    <td className="py-3 px-4">{projectStatusBadge(proj.published)}</td>
                    <td className="py-3 px-4 text-right text-on-surface-variant font-label text-xs">
                      {proj.updatedAt.toISOString().slice(0, 10)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Row 3: In Progress Tasks (static) */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <h2 className="font-display font-semibold text-lg text-on-background">In Progress Tasks</h2>
        </div>
        <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
          <table className="w-full text-left font-body text-sm">
            <thead className="font-label text-xs text-on-surface-variant uppercase border-b border-zinc-800 bg-[#0a0a0a]">
              <tr>
                <th className="py-3 px-4 font-normal">Task ID</th>
                <th className="py-3 px-4 font-normal">Description</th>
                <th className="py-3 px-4 font-normal">Assignee</th>
                <th className="py-3 px-4 font-normal">Priority</th>
                <th className="py-3 px-4 font-normal text-right">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              <tr className="hover:bg-zinc-800 transition-colors duration-200">
                <td className="py-4 px-4 font-label text-xs text-zinc-500">TSK-001</td>
                <td className="py-4 px-4 font-medium">Implement new authentication flow</td>
                <td className="py-4 px-4 text-on-surface-variant">System Auth</td>
                <td className="py-4 px-4"><span className="text-[#ffb4ab] font-label text-[10px] uppercase">High</span></td>
                <td className="py-4 px-4 text-right text-on-surface-variant font-label text-xs">Today</td>
              </tr>
              <tr className="bg-[#0f0f0f] hover:bg-zinc-800 transition-colors duration-200">
                <td className="py-4 px-4 font-label text-xs text-zinc-500">TSK-002</td>
                <td className="py-4 px-4 font-medium">Optimize database queries for dashboard</td>
                <td className="py-4 px-4 text-on-surface-variant">Data Team</td>
                <td className="py-4 px-4"><span className="text-[#c9c6c5] font-label text-[10px] uppercase">Medium</span></td>
                <td className="py-4 px-4 text-right text-on-surface-variant font-label text-xs">Tomorrow</td>
              </tr>
              <tr className="hover:bg-zinc-800 transition-colors duration-200">
                <td className="py-4 px-4 font-label text-xs text-zinc-500">TSK-003</td>
                <td className="py-4 px-4 font-medium">Update UI component library</td>
                <td className="py-4 px-4 text-on-surface-variant">Design Eng</td>
                <td className="py-4 px-4"><span className="text-on-surface-variant font-label text-[10px] uppercase">Low</span></td>
                <td className="py-4 px-4 text-right text-on-surface-variant font-label text-xs">Next Week</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}