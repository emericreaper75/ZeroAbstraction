"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  createdAt: Date;
}

interface MessagesListProps {
  initialMessages: Array<{
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    createdAt: Date;
  }>;
}

const CATEGORIES = [
  "All",
  "General Inquiry",
  "Technical Collaboration",
  "Consulting Request",
  "Content Feedback",
] as const;

type Category = (typeof CATEGORIES)[number];

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "General Inquiry": {
    bg: "bg-zinc-900",
    text: "text-zinc-400",
    border: "border-zinc-800",
  },
  "Technical Collaboration": {
    bg: "bg-cyan-950/40",
    text: "text-cyan-400",
    border: "border-cyan-900/50",
  },
  "Consulting Request": {
    bg: "bg-purple-950/40",
    text: "text-purple-400",
    border: "border-purple-900/50",
  },
  "Content Feedback": {
    bg: "bg-emerald-950/40",
    text: "text-emerald-400",
    border: "border-emerald-900/50",
  },
};

export default function MessagesList({ initialMessages }: MessagesListProps) {
  // Convert ISO string dates back to Date objects if needed, though they are already Date objects from prisma
  const messages = initialMessages.map(m => ({
    ...m,
    createdAt: new Date(m.createdAt)
  }));

  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [copiedEmailId, setCopiedEmailId] = useState<string | null>(null);

  // Category counts
  const getCategoryCount = (category: Category) => {
    if (category === "All") return messages.length;
    return messages.filter((m) => m.subject === category).length;
  };

  // Filter messages
  const filteredMessages = messages.filter((msg) => {
    const matchesCategory =
      selectedCategory === "All" || msg.subject === selectedCategory;
    const matchesSearch =
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmailId(id);
    setTimeout(() => setCopiedEmailId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      {/* Search and Filters Header */}
      <div className="px-12 pb-6 border-b border-zinc-900 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            const count = getCategoryCount(category);
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 text-xs font-label uppercase tracking-widest transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? "bg-[#111111] text-[#c9c6c5] border-zinc-700"
                    : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-300"
                }`}
              >
                <span>{category}</span>
                <span
                  className={`px-1.5 py-0.5 text-[9px] font-mono rounded ${
                    isActive
                      ? "bg-zinc-800 text-zinc-300"
                      : "bg-zinc-900 text-zinc-600 group-hover:text-zinc-400"
                  }`}
                >
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-80 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
            search
          </span>
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#111111] border border-zinc-800 rounded-none pl-9 pr-4 py-2 text-xs text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-700 focus:ring-0 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              <span className="material-symbols-outlined text-xs">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Messages Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar pt-6">
        <div className="w-full border border-zinc-900 bg-[#0c0c0c]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-900 bg-[#111111]">
                <th className="py-4 px-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">Sender</th>
                <th className="py-4 px-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">Category / Subject</th>
                <th className="py-4 px-6 font-label text-[10px] uppercase tracking-widest text-zinc-500">Message Snippet</th>
                <th className="py-4 px-6 font-label text-[10px] uppercase tracking-widest text-zinc-500 text-right">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900/50">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="material-symbols-outlined text-4xl text-zinc-800">inbox</span>
                      <p className="font-label text-xs uppercase tracking-widest text-zinc-600">
                        {searchQuery ? "No matching messages found." : "No messages in this category."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((msg, i) => {
                  const badge = categoryColors[msg.subject || "General Inquiry"] || categoryColors["General Inquiry"];
                  return (
                    <tr
                      key={msg.id}
                      onClick={() => setSelectedMessage(msg)}
                      className={`cursor-pointer transition-colors group ${
                        selectedMessage?.id === msg.id
                          ? "bg-zinc-900/60"
                          : i % 2 === 0
                          ? "bg-[#0c0c0c] hover:bg-zinc-900/30"
                          : "bg-[#0e0e0e] hover:bg-zinc-900/30"
                      }`}
                    >
                      {/* Sender */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded font-display font-bold text-xs text-zinc-400 group-hover:border-zinc-700 transition-colors">
                            {msg.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-display font-bold text-zinc-200 group-hover:text-white transition-colors">
                              {msg.name}
                            </span>
                            <span className="font-mono text-[10px] text-zinc-500">
                              {msg.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category Badge & Subject */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-start gap-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[9px] font-mono border ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            {msg.subject || "General Inquiry"}
                          </span>
                        </div>
                      </td>

                      {/* Message Snippet */}
                      <td className="py-4 px-6 max-w-sm">
                        <p className="font-body text-xs text-zinc-400 line-clamp-1 group-hover:text-zinc-300 transition-colors">
                          {msg.message}
                        </p>
                      </td>

                      {/* Received Time */}
                      <td className="py-4 px-6 text-right font-label text-[10px] text-zinc-500 uppercase tracking-wider">
                        {msg.createdAt.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Message Detail Drawer */}
      <AnimatePresence>
        {selectedMessage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-black z-40 cursor-pointer"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-[#0e0e0e] border-l border-zinc-800 shadow-2xl z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="p-8 border-b border-zinc-900 flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 flex items-center justify-center rounded-lg font-display font-bold text-lg text-cyan-400">
                    {selectedMessage.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white leading-tight">
                      {selectedMessage.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-xs text-zinc-400">
                        {selectedMessage.email}
                      </span>
                      <button
                        onClick={() => handleCopyEmail(selectedMessage.email, selectedMessage.id)}
                        className="text-zinc-500 hover:text-zinc-300 p-1 flex items-center"
                        title="Copy email address"
                      >
                        <span className="material-symbols-outlined text-xs">
                          {copiedEmailId === selectedMessage.id ? "done" : "content_copy"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-zinc-500 hover:text-zinc-300 p-1 border border-zinc-800 hover:border-zinc-700 bg-zinc-900/50 flex items-center justify-center transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6">
                {/* Meta details */}
                <div className="grid grid-cols-2 gap-4 bg-zinc-900/30 p-4 border border-zinc-900">
                  <div>
                    <span className="block font-label text-[9px] text-zinc-500 uppercase tracking-widest">
                      Category
                    </span>
                    <span
                      className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-mono border ${
                        categoryColors[selectedMessage.subject || "General Inquiry"]?.bg || "bg-zinc-900"
                      } ${
                        categoryColors[selectedMessage.subject || "General Inquiry"]?.text || "text-zinc-400"
                      } ${
                        categoryColors[selectedMessage.subject || "General Inquiry"]?.border || "border-zinc-800"
                      }`}
                    >
                      {selectedMessage.subject || "General Inquiry"}
                    </span>
                  </div>
                  <div>
                    <span className="block font-label text-[9px] text-zinc-500 uppercase tracking-widest">
                      Received
                    </span>
                    <span className="block mt-1.5 font-mono text-xs text-zinc-300">
                      {selectedMessage.createdAt.toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="space-y-2">
                  <span className="block font-label text-[9px] text-zinc-500 uppercase tracking-widest">
                    Message
                  </span>
                  <div className="bg-[#0a0a0a] border border-zinc-900 p-6 rounded-none font-body text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap selection:bg-cyan-500/20 selection:text-cyan-300">
                    {selectedMessage.message}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-8 border-t border-zinc-900 bg-zinc-950 flex gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject || "Your inquiry"
                  )}`}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-black font-label text-xs uppercase tracking-widest py-3 flex justify-center items-center gap-2 transition-colors font-bold"
                >
                  <span className="material-symbols-outlined text-sm">reply</span>
                  Reply via Email
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-3 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200 text-zinc-400 font-label text-xs uppercase tracking-widest transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
