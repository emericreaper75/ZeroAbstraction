import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";
import { deleteResearchLog } from "@/actions/research-log-actions";

export default async function DeleteResearchLogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const log = await prisma.researchLog.findUnique({ where: { id } });
  if (!log) notFound();

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-900/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-12 max-w-7xl">
        <div className="mb-16">
          <nav className="flex items-center gap-2 mb-4">
            <span className="font-label text-xs uppercase tracking-widest text-on-primary-container">Admin</span>
            <span className="material-symbols-outlined text-[10px] text-outline">chevron_right</span>
            <Link href="/admin/research-logs" className="font-label text-xs uppercase tracking-widest text-on-primary-container hover:text-[#c9c6c5] transition-colors">Research Logs</Link>
            <span className="material-symbols-outlined text-[10px] text-outline">chevron_right</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#c9c6c5]">Delete</span>
          </nav>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#c9c6c5]">Delete Research Log</h1>
        </div>

        <div className="flex justify-center items-center py-12">
          <div className="w-full max-w-[560px] bg-[#111111] border border-outline-variant p-12">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant">warning</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-on-background mb-4">Confirm Deletion</h2>
              <p className="font-body text-lg italic text-[#c9c6c5] mb-6 text-center">&ldquo;{log.title}&rdquo;</p>

              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="font-label text-[10px] uppercase tracking-widest text-on-primary-container">
                  Entry #{String(log.entryNumber).padStart(3, "0")}
                </span>
                <span className="text-zinc-700">·</span>
                <span className="bg-zinc-800 px-2 py-0.5 font-label text-[10px] uppercase tracking-widest text-zinc-400">{log.series}</span>
              </div>

              <div className="w-full h-px bg-surface-container-highest mb-8" />

              <p className="font-body text-sm text-on-primary-container leading-relaxed text-center mb-10 max-w-sm">
                This research log and all its content will be permanently deleted from the system.
              </p>

              <div className="w-full space-y-3">
                <form action={deleteResearchLog}>
                  <input type="hidden" name="id" value={log.id} />
                  <button
                    type="submit"
                    className="w-full bg-[#7f1d1d] hover:bg-[#991b1b] text-on-background font-label text-xs uppercase tracking-widest py-4 transition-colors duration-200"
                  >
                    Delete Research Log
                  </button>
                </form>
                <Link
                  href={`/admin/research-logs/${id}/edit`}
                  className="block w-full text-center text-on-surface-variant hover:text-on-surface font-label text-xs uppercase tracking-widest py-4 transition-all"
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
