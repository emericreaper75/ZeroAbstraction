"use client";

import { useState, useEffect, useRef } from "react";
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const asideRef = useRef<HTMLElement>(null);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  // Close mobile navigation on path changes
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Handle mobile drawer scroll locking
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavOpen]);

  // Handle escape key close and focus trapping
  useEffect(() => {
    if (!isMobileNavOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileNavOpen(false);
        return;
      }

      if (e.key === "Tab" && asideRef.current) {
        const focusableElements = asideRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileNavOpen]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-on-surface font-body">
      {/* ── Mobile Nav Overlay ── */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* ── Right-Side Mobile Drawer / Left-Side Desktop Sidebar ── */}
      <aside 
        ref={asideRef}
        className={`fixed lg:static inset-y-0 right-0 left-auto lg:left-0 lg:right-auto w-[240px] bg-[#0d0d0d] border-l lg:border-l-0 lg:border-r border-zinc-800 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileNavOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Brand Wordmark */}
        <div className="px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#c9c6c5]">terminal</span>
            <span className="font-display text-xl font-bold tracking-tighter text-on-background">
              ZeroAbstraction
            </span>
          </div>
          <button className="lg:hidden text-zinc-400 hover:text-white" onClick={() => setIsMobileNavOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Vertical Nav Links */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMobileNavOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 group ${
                isActive(href)
                  ? "sidebar-active text-white"
                  : "text-on-surface-variant hover:text-[#c9c6c5]"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{icon}</span>
              <span className="font-label text-sm uppercase tracking-wider">{label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer / User Profile */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
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
      <main id="main-content" className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-[#0d0d0d] z-30 shrink-0">
           <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#c9c6c5] text-xl">terminal</span>
            <span className="font-display text-lg font-bold tracking-tighter text-on-background">
              ZeroAbstraction
            </span>
          </div>
          <button className="text-zinc-400 hover:text-white" onClick={() => setIsMobileNavOpen(true)}>
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
        {/* Atmospheric Glow Background Elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-900/10 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/4 -left-24 w-64 h-64 bg-zinc-900/20 blur-[100px] pointer-events-none -z-10" />
      </main>
    </div>
  );
}
