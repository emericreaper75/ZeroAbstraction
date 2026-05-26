import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { toggleContentPostPublish } from "@/actions/content-post-actions";

export const metadata = { title: "ZeroAbstraction | Posts" };

type FilterStatus = "all" | "published" | "draft" | "archived";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const params = await searchParams;
  const status = (params.status ?? "all") as FilterStatus;
  const q = params.q ?? "";

  const where = {
    ...(q ? { title: { contains: q, mode: "insensitive" as const } } : {}),
    ...(status === "published" ? { published: true } : {}),
    ...(status === "draft" ? { published: false } : {}),
  };

  const posts = await prisma.contentPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.contentPost.groupBy({
    by: ["published"],
    _count: { id: true },
  });
  const totalCount = counts.reduce((acc, c) => acc + c._count.id, 0);
  const publishedCount = counts.find((c) => c.published)?._count.id ?? 0;
  const draftCount = counts.find((c) => !c.published)?._count.id ?? 0;

  function StatusBadge({ published }: { published: boolean }) {
    return published ? (
      <span className="bg-zinc-700 text-white text-[10px] font-label px-2 py-0.5 rounded uppercase">Published</span>
    ) : (
      <span className="bg-amber-900/30 text-amber-500 text-[10px] font-label px-2 py-0.5 rounded uppercase border border-amber-900">Draft</span>
    );
  }

  const tabs: { key: FilterStatus; label: string; count: number }[] = [
    { key: "all", label: "All", count: totalCount },
    { key: "published", label: "Published", count: publishedCount },
    { key: "draft", label: "Draft", count: draftCount },
    { key: "archived", label: "Archived", count: 0 },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="w-full pt-12 px-4 md:px-12 pb-8 flex justify-between items-end gap-4">
        <div>
          <nav className="mb-2">
            <span className="font-label text-xs tracking-widest text-zinc-500 uppercase">Admin / Posts</span>
          </nav>
          <h1 className="font-display text-[36px] font-bold leading-none text-on-surface tracking-tight">Posts</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-zinc-200 hover:bg-white text-zinc-950 px-5 py-2.5 rounded-sm transition-all duration-200 font-label text-xs uppercase font-bold tracking-widest shrink-0"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          New Post
        </Link>
      </header>

      {/* Controls */}
      <section className="px-4 md:px-12 mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-6">
        <form className="w-full md:max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">search</span>
          <input
            name="q"
            defaultValue={q}
            className="w-full bg-[#111111] border border-zinc-700 text-zinc-300 text-xs px-10 py-2.5 focus:outline-none focus:border-zinc-300 focus:ring-1 focus:ring-zinc-300 transition-all font-body"
            placeholder="Search posts by title..."
            type="text"
          />
        </form>
        <div className="w-full md:w-auto overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0">
          <nav className="flex gap-6 border-b border-zinc-800 flex-nowrap min-w-max">
            {tabs.map(({ key, label }) => (
              <Link
                key={key}
                href={`/admin/posts?status=${key}`}
                className={`pb-2 px-1 text-xs font-label uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                  status === key
                    ? "text-zinc-100 border-zinc-100"
                    : "text-zinc-500 hover:text-zinc-300 border-transparent"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Table */}
      <section className="flex-1 px-4 md:px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800 overflow-x-auto [scrollbar-width:thin]">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10">
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Title</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Category</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Status</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Published Date</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-zinc-500 font-label text-xs uppercase tracking-widest">
                    No posts found.
                  </td>
                </tr>
              ) : (
                posts.map((post, i) => (
                  <tr key={post.id} className={`${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"} hover:bg-zinc-800/40 transition-colors group`}>
                    <td className="py-4 px-4 font-display font-bold text-zinc-100">
                      <Link href={`/admin/posts/${post.slug}/edit`} className="hover:text-white transition-colors">
                        {post.title}
                      </Link>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-zinc-800 text-[10px] font-label text-zinc-400 px-2 py-0.5 rounded uppercase tracking-tighter">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4"><StatusBadge published={post.published} /></td>
                    <td className="py-4 px-4 font-label text-xs text-zinc-500">
                      {post.published ? post.updatedAt.toISOString().slice(0, 10).replace(/-/g, ".") : "----.--.--"}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2 text-zinc-400">
                        <Link href={`/admin/posts/${post.slug}/edit`} className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title="Edit Post">
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </Link>
                        <form action={toggleContentPostPublish} className="inline">
                          <input type="hidden" name="id" value={post.id} />
                          <button type="submit" className="p-1.5 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 rounded transition-all duration-150 flex items-center justify-center" title={post.published ? "Unpublish" : "Publish"}>
                            <span className="material-symbols-outlined text-sm">{post.published ? "unpublished" : "publish"}</span>
                          </button>
                        </form>
                        <Link href={`/admin/posts/${post.slug}/delete`} className="p-1.5 hover:text-[#ffb4ab] hover:bg-red-950/20 border border-transparent hover:border-red-900/30 rounded transition-all duration-150 flex items-center justify-center" title="Delete Post">
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
      <footer className="px-4 md:px-12 py-8 flex justify-end">
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-100 transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-100 bg-zinc-800 rounded-sm">1</button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-500 hover:text-zinc-100 transition-colors">2</button>
          <button className="w-8 h-8 flex items-center justify-center font-label text-xs text-zinc-500 hover:text-zinc-100 transition-colors">3</button>
          <button className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-zinc-100 transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
}