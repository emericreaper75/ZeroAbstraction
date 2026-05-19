"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/posts", label: "Posts", icon: "article" },
  { href: "/admin/projects", label: "Projects", icon: "layers" },
  { href: "/admin/research-logs", label: "Research Logs", icon: "terminal" },
  { href: "/admin/media", label: "Media", icon: "image" },
  { href: "/admin/messages", label: "Messages", icon: "mail" },
] as const;

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-on-surface font-body">
      {/* ── Fixed Left Sidebar ── */}
      <aside className="w-[240px] h-full bg-[#0d0d0d] border-r border-zinc-800 flex flex-col shrink-0 z-50">
        {/* Brand Wordmark */}
        <div className="px-6 py-8">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#c9c6c5]">terminal</span>
            <span className="font-display text-xl font-bold tracking-tighter text-on-background">
              ZeroAbstraction
            </span>
          </div>
        </div>

        {/* Vertical Nav Links */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map(({ href, label, icon }) =>
            isActive(href) ? (
              <span
                key={href}
                className="flex items-center gap-3 px-3 py-2 sidebar-active rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
                <span className="font-label text-sm uppercase tracking-wider">{label}</span>
              </span>
            ) : (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2 text-on-surface-variant hover:text-[#c9c6c5] transition-colors duration-200 group"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
                <span className="font-label text-sm uppercase tracking-wider">{label}</span>
              </Link>
            )
          )}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface truncate">
                {userEmail ?? "Admin User"}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="text-[10px] text-zinc-500 font-label hover:text-zinc-300 transition-colors text-left"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {children}
        {/* Atmospheric Glow Background Elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-900/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-zinc-900/20 blur-[100px] pointer-events-none -z-10" />
      </main>
    </div>
  );
}
