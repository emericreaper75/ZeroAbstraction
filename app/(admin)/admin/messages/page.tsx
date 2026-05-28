import { prisma } from "@/lib/db/prisma";
import MessagesList from "@/components/admin/messages-list";

export const metadata = { title: "ZeroAbstraction | Messages" };

export const dynamic = "force-dynamic";
export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <nav className="mb-2">
            <span className="font-label text-xs tracking-widest text-zinc-500 uppercase">Admin / Messages</span>
          </nav>
          <h1 className="font-display text-[36px] font-bold leading-none text-on-surface tracking-tight">Messages</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#111111] border border-zinc-800">
            <span className="material-symbols-outlined text-sm text-zinc-500">inbox</span>
            <span className="font-label text-xs text-zinc-400 uppercase tracking-widest">{messages.length} Total</span>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="px-12 mb-6 flex items-center gap-6">
        <div className="bg-zinc-900 border border-zinc-700 px-6 py-4 flex flex-col justify-between">
          <div className="font-display font-bold text-2xl text-on-background">{messages.length}</div>
          <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Total Messages</div>
        </div>
        <div className="bg-zinc-900 border border-zinc-700 px-6 py-4 flex flex-col justify-between">
          <div className="font-display font-bold text-2xl text-on-background">
            {messages.filter((m) => {
              const d = new Date(m.createdAt);
              const today = new Date();
              return d.toDateString() === today.toDateString();
            }).length}
          </div>
          <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Today</div>
        </div>
      </div>

      {/* Interactive Messages Section */}
      <MessagesList initialMessages={messages} />
    </div>
  );
}

