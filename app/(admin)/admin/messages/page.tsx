import { prisma } from "@/lib/db/prisma";

export const metadata = { title: "ZeroAbstraction | Messages" };

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

      {/* Messages Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-[#0a0a0a] z-10">
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Sender</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Email</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Subject</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500">Message</th>
                <th className="py-4 px-4 font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="material-symbols-outlined text-4xl text-zinc-700">inbox</span>
                      <p className="font-label text-xs uppercase tracking-widest text-zinc-600">No messages yet.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                messages.map((msg, i) => (
                  <tr key={msg.id} className={`${i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"} hover:bg-zinc-800/40 transition-colors group`}>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center rounded font-display font-bold text-xs text-zinc-300">
                          {msg.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-display font-bold text-zinc-200">{msg.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <a href={`mailto:${msg.email}`} className="font-label text-xs text-zinc-400 hover:text-[#c9c6c5] transition-colors">
                        {msg.email}
                      </a>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-body text-sm text-zinc-300">{msg.subject ?? "—"}</span>
                    </td>
                    <td className="py-4 px-4 max-w-xs">
                      <p className="font-body text-xs text-zinc-500 truncate">{msg.message}</p>
                    </td>
                    <td className="py-4 px-4 text-right font-label text-[10px] text-zinc-600 uppercase">
                      {msg.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
