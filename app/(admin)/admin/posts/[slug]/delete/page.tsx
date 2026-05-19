import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { deleteContentPost } from "@/actions/content-post-actions";

export default async function DeletePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.contentPost.findUnique({ where: { slug } });
  if (!post) notFound();

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-16">
          <nav className="flex items-center gap-2 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-primary-container">Admin</span>
            <span className="material-symbols-outlined text-[10px] text-outline">chevron_right</span>
            <Link href="/admin/posts" className="font-label text-xs uppercase tracking-widest text-on-primary-container hover:text-[#c9c6c5] transition-colors">Posts</Link>
            <span className="material-symbols-outlined text-[10px] text-outline">chevron_right</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#c9c6c5]">Delete</span>
          </nav>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#c9c6c5]">Delete Post</h1>
        </div>

        {/* Confirmation Card */}
        <div className="flex justify-center items-center py-12">
          <div className="w-full max-w-[560px] bg-[#111111] border border-outline-variant p-12 transition-all duration-200">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant">warning</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-on-background mb-4">Confirm Deletion</h2>
              <p className="font-body text-lg italic text-[#c9c6c5] mb-8 text-center">&ldquo;{post.title}&rdquo;</p>

              <div className="w-full flex justify-between items-center mb-4 px-2">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-primary-container">{post.category}</span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-on-primary-container">
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="w-full h-px bg-surface-container-highest mb-8" />

              <p className="font-body text-sm text-on-primary-container leading-relaxed text-center mb-10 max-w-sm">
                This action is permanent. The post and all associated revision history will be deleted from the database.
              </p>

              <div className="w-full space-y-3">
                <form action={deleteContentPost}>
                  <input type="hidden" name="id" value={post.id} />
                  <button
                    type="submit"
                    className="w-full bg-[#7f1d1d] hover:bg-[#991b1b] text-on-background font-label text-xs uppercase tracking-widest py-4 transition-colors duration-200 border border-transparent"
                  >
                    Delete Post
                  </button>
                </form>
                <Link
                  href={`/admin/posts/${slug}/edit`}
                  className="block w-full text-center bg-transparent hover:bg-surface-container-highest text-on-surface-variant font-label text-xs uppercase tracking-widest py-4 transition-all duration-200 border border-transparent"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
