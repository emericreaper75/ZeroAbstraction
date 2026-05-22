"use client";

import { Skeleton } from "@/components/ui/Skeleton";

// Reusable Shimmering Header for Public Pages
function PublicHeaderSkeleton() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#050810]/95 border-b border-zinc-800/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-12 bg-neutral-800" />
          <Skeleton className="h-6 w-24 bg-neutral-800" />
        </div>
        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-14" />
        </div>
        {/* Search & Theme Toggle */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
      </div>
    </header>
  );
}

// Reusable Shimmering Footer for Public Pages
function PublicFooterSkeleton() {
  return (
    <footer className="mt-32 border-t border-neutral-800 bg-black/40 py-16">
      <div className="mx-auto max-w-screen-xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Skeleton className="h-5 w-10 bg-neutral-850" />
              <Skeleton className="h-5 w-20 bg-neutral-850" />
            </div>
            <Skeleton className="h-4 w-64 mb-2" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex flex-col space-y-3 md:items-end">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-full md:max-w-md rounded-lg" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="border-t border-neutral-850 pt-6 flex items-center justify-between">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-10" />
        </div>
      </div>
    </footer>
  );
}

// Homepage Skeleton
function HomeSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-40 pb-20 text-center max-w-4xl">
        <div className="flex justify-center mb-6">
          <Skeleton className="h-6 w-32 rounded-full" />
        </div>
        <Skeleton className="h-14 w-full max-w-2xl mx-auto mb-6 bg-neutral-800" />
        <Skeleton className="h-14 w-3/4 max-w-lg mx-auto mb-8 bg-neutral-800" />
        <Skeleton className="h-5 w-5/6 max-w-xl mx-auto mb-4" />
        <Skeleton className="h-5 w-2/3 max-w-md mx-auto mb-12" />
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-36 rounded-lg bg-cyan-950/20 border border-cyan-900/30" />
          <Skeleton className="h-12 w-36 rounded-lg" />
        </div>
      </section>

      {/* Domain Cards */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-8 rounded-xl bg-zinc-900/20 border border-zinc-800/40 space-y-4">
              <Skeleton className="h-10 w-10 rounded-lg bg-neutral-800" />
              <Skeleton className="h-6 w-32 bg-neutral-800" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-4 flex items-center space-x-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-3 w-3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-6 py-20 border-t border-neutral-900">
        <div className="flex justify-between items-center mb-12">
          <Skeleton className="h-8 w-48 bg-neutral-800" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-800/40 overflow-hidden bg-zinc-900/10 space-y-4 p-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-5/6 bg-neutral-800" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="pt-2 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="container mx-auto px-6 py-20 border-t border-neutral-900">
        <div className="flex justify-between items-center mb-12">
          <Skeleton className="h-8 w-48 bg-neutral-800" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-5 space-y-4">
              <Skeleton className="h-44 w-full rounded-lg" />
              <div className="flex space-x-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
              <Skeleton className="h-6 w-3/4 bg-neutral-800" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pt-2 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <PublicFooterSkeleton />
    </div>
  );
}

// Blog / Projects list skeleton
function ListSkeleton({ type }: { type: "blog" | "projects" }) {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />
      
      <div className="container mx-auto px-6 pt-32 pb-12">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4 bg-neutral-800" />
          <Skeleton className="h-5 w-full" />
        </div>

        {/* Filters / Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-zinc-900">
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md" />
            ))}
          </div>
          <Skeleton className="h-10 w-full md:max-w-xs rounded-lg" />
        </div>

        {/* Grid List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl border border-zinc-800/40 bg-zinc-900/10 p-5 space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              {type === "projects" ? (
                <div className="flex space-x-2">
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              ) : (
                <Skeleton className="h-4 w-20" />
              )}
              <Skeleton className="h-6 w-5/6 bg-neutral-800" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <div className="pt-2 flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <PublicFooterSkeleton />
    </div>
  );
}

// Category details page skeleton (fallback for single category layouts)
function CategorySkeleton() {
  return <ListSkeleton type="blog" />;
}

// About page skeleton
function AboutSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />

      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Page Header */}
        <div className="mb-16 space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-12 w-2/3 bg-neutral-800" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>

        {/* Split Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-start py-12 border-t border-neutral-900">
          <div className="space-y-6">
            <Skeleton className="h-8 w-40 bg-neutral-800" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="space-y-4 pt-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          
          <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm space-y-6">
            <Skeleton className="h-4 w-36" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 bg-cyan-900" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core disciplines */}
        <div className="py-24 border-t border-neutral-900">
          <div className="flex justify-center mb-12">
            <Skeleton className="h-8 w-48 bg-neutral-800" />
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-xl bg-zinc-900/30 border border-zinc-800/50 space-y-4">
                <Skeleton className="h-10 w-10 text-2xl" />
                <Skeleton className="h-6 w-32 bg-neutral-800" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="py-24 border-t border-neutral-900">
          <div className="flex justify-center mb-12">
            <Skeleton className="h-8 w-32 bg-neutral-800" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 rounded-lg bg-white/5 border border-white/10 h-28 space-y-2 text-center">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <PublicFooterSkeleton />
    </div>
  );
}

// Contact page skeleton
function ContactSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />

      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Page Header */}
        <div className="mb-16 space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-12 w-2/3 bg-neutral-800" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>

        {/* Content split */}
        <div className="grid lg:grid-cols-2 gap-16 items-start py-12 border-t border-neutral-900">
          <div className="space-y-8">
            <Skeleton className="h-8 w-40 bg-neutral-800" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-11/12" />

            <div className="space-y-6 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-3.5 w-16" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/50 space-y-2">
              <Skeleton className="h-5 w-48 bg-neutral-800" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm shadow-2xl space-y-6">
            <Skeleton className="h-5 w-36 bg-neutral-850" />
            <div className="space-y-5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              ))}
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
              <Skeleton className="h-12 w-full rounded-lg bg-cyan-950/20 border border-cyan-900/30" />
            </div>
          </div>
        </div>
      </div>

      <PublicFooterSkeleton />
    </div>
  );
}

// Timeline page skeleton
function TimelineSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />

      <div className="container mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-10 w-48 bg-neutral-800" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>

        <div className="max-w-2xl w-full mx-auto space-y-8">
          {/* Timeline filter badges */}
          <div className="flex flex-wrap gap-2 justify-start pb-6 border-b border-zinc-900">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-20 rounded-md" />
            ))}
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l border-zinc-800/80 ml-4 pl-8 space-y-12 py-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative">
                {/* Bullet node */}
                <div className="absolute -left-12 top-1.5 w-8 h-8 rounded-full border border-zinc-800 bg-[#050810] flex items-center justify-center">
                  <Skeleton className="w-2.5 h-2.5 rounded-full bg-cyan-900" />
                </div>
                {/* Card */}
                <div className="bg-zinc-900/20 border border-zinc-800/40 p-6 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-3/4 bg-neutral-800" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PublicFooterSkeleton />
    </div>
  );
}

// Single Post / Article layout skeleton
function PostSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />

      <article className="container mx-auto max-w-3xl px-6 pt-32 pb-24">
        {/* Breadcrumb / Back button */}
        <Skeleton className="h-5 w-32 mb-8" />

        {/* Title & Author Meta */}
        <div className="space-y-4 mb-8">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-10 w-full bg-neutral-800" />
          <Skeleton className="h-10 w-2/3 bg-neutral-800" />
          <div className="flex items-center space-x-4 pt-4 border-t border-zinc-900">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        </div>

        {/* Cover image placeholder */}
        <Skeleton className="h-[400px] w-full rounded-xl mb-12 bg-neutral-900/55" />

        {/* Article Body */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          
          <Skeleton className="h-6 w-48 bg-neutral-800 pt-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />

          {/* Code block skeleton */}
          <div className="p-5 rounded-lg bg-zinc-900/30 border border-zinc-800/50 font-mono space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>
      </article>
      <PublicFooterSkeleton />
    </div>
  );
}

// Navigation items for the sidebar skeleton
const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/posts", label: "Posts", icon: "article" },
  { href: "/admin/projects", label: "Projects", icon: "layers" },
  { href: "/admin/research-logs", label: "Research Logs", icon: "terminal" },
  { href: "/admin/media", label: "Media", icon: "image" },
  { href: "/admin/messages", label: "Messages", icon: "mail" },
] as const;

function isActive(href: string, pathname: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

// Shared layout wrapper for admin skeletons
function AdminLayoutSkeleton({ pathname, children }: { pathname: string; children: React.ReactNode }) {
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
            isActive(href, pathname) ? (
              <span
                key={href}
                className="flex items-center gap-3 px-3 py-2 sidebar-active rounded-lg"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
                <span className="font-label text-sm uppercase tracking-wider">{label}</span>
              </span>
            ) : (
              <span
                key={href}
                className="flex items-center gap-3 px-3 py-2 text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-xl">{icon}</span>
                <span className="font-label text-sm uppercase tracking-wider">{label}</span>
              </span>
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
                Admin User
              </span>
              <span className="text-[10px] text-zinc-500 font-label">
                SIGN OUT
              </span>
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

// Admin Dashboard Overview Skeleton
function AdminDashboardOverviewSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-12 space-y-16 bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
          <Skeleton className="h-10 w-48 bg-neutral-800" />
          <Skeleton className="h-4 w-32 bg-neutral-800/60 mt-2" />
        </div>
        <div>
          <Skeleton className="h-9 w-36 bg-neutral-800 border border-zinc-750" />
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-700 p-6 flex flex-col justify-between h-32">
            <Skeleton className="h-9 w-12 bg-neutral-800" />
            <Skeleton className="h-4 w-24 bg-neutral-800" />
          </div>
        ))}
      </section>

      {/* Row 2: Recent Posts + Recent Projects */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <Skeleton className="h-7 w-32 bg-neutral-800" />
            <Skeleton className="h-7 w-20 bg-neutral-850" />
          </div>
          <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
            <div className="h-10 border-b border-zinc-850 bg-[#0a0a0a]" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-zinc-800">
                <Skeleton className="h-5 w-48 bg-neutral-800" />
                <Skeleton className="h-5 w-16 bg-neutral-850" />
                <Skeleton className="h-4 w-20 bg-neutral-850" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
            <Skeleton className="h-7 w-36 bg-neutral-800" />
            <Skeleton className="h-7 w-24 bg-neutral-850" />
          </div>
          <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
            <div className="h-10 border-b border-zinc-850 bg-[#0a0a0a]" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 border-b border-zinc-800">
                <Skeleton className="h-5 w-40 bg-neutral-800" />
                <Skeleton className="h-5 w-12 bg-neutral-850" />
                <Skeleton className="h-4 w-20 bg-neutral-850" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Row 3: In Progress Tasks */}
      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
          <Skeleton className="h-7 w-48 bg-neutral-800" />
        </div>
        <div className="bg-[#111111] border border-zinc-700 overflow-hidden">
          <div className="h-10 border-b border-zinc-850 bg-[#0a0a0a]" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between items-center px-4 py-4 border-b border-zinc-800">
              <Skeleton className="h-4 w-16 bg-neutral-850" />
              <Skeleton className="h-5 w-64 bg-neutral-800" />
              <Skeleton className="h-5 w-24 bg-neutral-850" />
              <Skeleton className="h-5 w-12 bg-neutral-850" />
              <Skeleton className="h-4 w-20 bg-neutral-850" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Posts List Skeleton
function AdminPostsListSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-32 bg-neutral-800" />
        </div>
        <Skeleton className="h-10 w-28 bg-neutral-800" />
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <Skeleton className="h-10 w-full max-w-md bg-neutral-850" />
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 bg-neutral-850" />
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4"><Skeleton className="h-4 w-32 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4.5 w-14 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-24 bg-neutral-850" /></th>
                <th className="py-4 px-4 text-right"><Skeleton className="h-4 w-16 ml-auto bg-neutral-850" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"}>
                  <td className="py-4 px-4"><Skeleton className="h-6 w-64 bg-neutral-800" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-20 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-16 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-20 bg-neutral-850" /></td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      <footer className="px-12 py-8 flex justify-end">
        <Skeleton className="h-8 w-36 bg-neutral-850" />
      </footer>
    </div>
  );
}

// New Post Skeleton
function AdminNewPostSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="h-24 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div>
          <Skeleton className="h-4.5 w-48 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-44 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20 bg-neutral-850" />
          <Skeleton className="h-10 w-24 bg-neutral-800" />
        </div>
      </header>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <section className="px-12 py-8 max-w-5xl space-y-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-20 bg-neutral-850" />
            <Skeleton className="h-14 w-full bg-neutral-800" />
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-neutral-850" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-12 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-neutral-850" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-16 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-neutral-850" />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32 bg-neutral-850" />
            <Skeleton className="h-24 w-full bg-neutral-850" />
          </div>

          {/* MDX Editor */}
          <div className="flex flex-col">
            <Skeleton className="h-10 w-48 mb-1 bg-neutral-850" />
            <Skeleton className="h-[520px] w-full bg-[#0d0d0d] border border-zinc-700" />
          </div>
        </section>
      </div>

      {/* Status Bar */}
      <footer className="bg-surface-container-lowest border-t border-zinc-800 px-6 h-8 flex items-center justify-between z-30">
        <Skeleton className="h-3.5 w-32 bg-neutral-850" />
        <Skeleton className="h-3.5 w-44 bg-neutral-850" />
      </footer>
    </div>
  );
}

// Edit Post Skeleton
function AdminEditPostSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Status Bar */}
      <div className="px-12 py-3 bg-[#111111] border-b border-zinc-800 flex items-center justify-between">
        <Skeleton className="h-4.5 w-36 bg-neutral-850" />
        <Skeleton className="h-4.5 w-20 bg-neutral-850" />
      </div>

      {/* Header */}
      <header className="h-20 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div>
          <Skeleton className="h-3.5 w-36 mb-1 bg-neutral-850" />
          <Skeleton className="h-9 w-40 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-4 w-28 bg-neutral-850" />
          <Skeleton className="h-9 w-24 bg-neutral-850" />
          <Skeleton className="h-9 w-20 bg-neutral-805" />
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 grid grid-cols-10 gap-12">
          {/* Left column (7/10) */}
          <div className="col-span-7 space-y-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
                <Skeleton className="h-12 w-full bg-[#111111] border border-zinc-700" />
              </div>
              <div className="col-span-6">
                <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
              <div className="col-span-4">
                <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
              <div className="col-span-2">
                <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
              <Skeleton className="h-20 w-full bg-[#111111] border border-zinc-700" />
            </div>

            <div>
              <Skeleton className="h-4 w-36 mb-2 bg-neutral-850" />
              <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
            </div>

            <div className="flex flex-col">
              <Skeleton className="h-8 w-44 bg-neutral-850" />
              <Skeleton className="h-[520px] w-full bg-[#0d0d0d] border border-zinc-700" />
            </div>
          </div>

          {/* Right sidebar (3/10) */}
          <aside className="col-span-3 space-y-8">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div className="space-y-1">
                <Skeleton className="h-3.5 w-16 bg-neutral-850" />
                <Skeleton className="h-5 w-32 bg-neutral-800" />
              </div>
              <div className="border-l-2 border-zinc-800 pl-6 space-y-4 py-2">
                <Skeleton className="h-12 w-full bg-neutral-850" />
              </div>
              <Skeleton className="h-10 w-full bg-neutral-850" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Delete Warning Confirmation Skeleton
function AdminDeleteSkeleton({ type }: { type: "Post" | "Project" | "Research Log" }) {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] relative">
      <div className="relative z-10 p-12 max-w-7xl">
        {/* Breadcrumbs */}
        <div className="mb-16">
          <Skeleton className="h-4 w-44 mb-4 bg-neutral-850" />
          <Skeleton className="h-10 w-64 bg-neutral-800" />
        </div>

        {/* Confirmation Card */}
        <div className="flex justify-center items-center py-12">
          <div className="w-full max-w-[560px] bg-[#111111] border border-outline-variant p-12">
            <div className="flex flex-col items-center">
              <div className="mb-6">
                <span className="material-symbols-outlined text-[40px] text-on-surface-variant">warning</span>
              </div>
              <Skeleton className="h-8 w-44 mb-4 bg-neutral-800" />
              <Skeleton className="h-7 w-64 mb-6 bg-neutral-850" />

              <div className="w-full flex justify-between items-center mb-4 px-2">
                <Skeleton className="h-4 w-20 bg-neutral-850" />
                <Skeleton className="h-4 w-16 bg-neutral-850" />
              </div>

              <div className="w-full h-px bg-surface-container-highest mb-8" />
              <Skeleton className="h-12 w-full max-w-xs mb-10 bg-neutral-850" />

              <div className="w-full space-y-3">
                <Skeleton className="h-12 w-full bg-[#7f1d1d]/30 border border-red-900" />
                <Skeleton className="h-12 w-full bg-neutral-850" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Revisions History Skeleton
function AdminRevisionsSkeleton({ type }: { type: "Post" | "Project" }) {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a] p-12">
      <div className="max-w-5xl">
        {/* AdminPageHeader */}
        <div className="mb-10 border-b border-zinc-800/60 pb-6">
          <div className="grid grid-cols-[1fr_auto] items-start gap-6">
            <div>
              <Skeleton className="h-10 w-48 bg-neutral-850" />
              <Skeleton className="h-4.5 w-64 mt-2 bg-neutral-800" />
            </div>
            <Skeleton className="h-9 w-28 bg-neutral-850" />
          </div>
        </div>

        {/* AdminTable */}
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-800">
              <thead className="bg-zinc-950/50">
                <tr className="border-b border-zinc-800">
                  {["When", "Reason", "Version", "Author", "Actions"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left">
                      <Skeleton className="h-4 w-12 bg-neutral-850" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {[1, 2, 3].map((i) => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="h-4.5 w-24 bg-neutral-850" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4.5 w-32 bg-neutral-850" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4.5 w-8 bg-neutral-850" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-4.5 w-28 bg-neutral-850" /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <Skeleton className="h-4.5 w-20 bg-neutral-850" />
                        <Skeleton className="h-4.5 w-16 bg-neutral-850" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Projects List Skeleton
function AdminProjectsListSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-36 bg-neutral-800" />
        </div>
        <Skeleton className="h-10 w-32 bg-neutral-800" />
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <Skeleton className="h-10 w-full max-w-md bg-neutral-855" />
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 bg-neutral-850" />
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4"><Skeleton className="h-4 w-24 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-14 bg-neutral-855" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4 text-right"><Skeleton className="h-4 w-16 ml-auto bg-neutral-850" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"}>
                  <td className="py-4 px-4"><Skeleton className="h-6 w-48 bg-neutral-800" /></td>
                  <td className="py-4 px-4">
                    <div className="flex gap-1">
                      <Skeleton className="h-5 w-12 bg-neutral-850" />
                      <Skeleton className="h-5 w-12 bg-neutral-850" />
                    </div>
                  </td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-16 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-16 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-20 bg-neutral-850" /></td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pagination */}
      <footer className="px-12 py-8 flex justify-end">
        <Skeleton className="h-8 w-28 bg-neutral-850" />
      </footer>
    </div>
  );
}

// New Project Skeleton
function AdminNewProjectSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex justify-between items-center h-20 px-12 border-b border-outline-variant sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30">
        <div>
          <Skeleton className="h-3.5 w-32 mb-1 bg-neutral-850" />
          <Skeleton className="h-10 w-44 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20 bg-neutral-850" />
          <Skeleton className="h-10 w-24 bg-neutral-800" />
        </div>
      </header>

      {/* Form Area */}
      <div className="flex flex-1 overflow-y-auto custom-scrollbar">
        {/* Left Column (65%) */}
        <section className="w-[65%] p-12 space-y-8">
          <div>
            <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
            <Skeleton className="h-14 w-full bg-neutral-800" />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
              <Skeleton className="h-10 w-full bg-neutral-850" />
            </div>
            <div>
              <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
              <Skeleton className="h-10 w-full bg-neutral-850" />
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-28 mb-2 bg-neutral-850" />
            <Skeleton className="h-24 w-full bg-neutral-850" />
          </div>

          <div>
            <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
            <Skeleton className="h-[400px] w-full bg-[#0d0d0d] border border-outline-variant" />
          </div>
        </section>

        {/* Right Column (35%) */}
        <aside className="w-[35%] p-8 space-y-10 bg-[#111111] border-l border-outline-variant">
          <div>
            <Skeleton className="h-4 w-44 mb-4 bg-neutral-850" />
            <div className="space-y-6">
              <div>
                <Skeleton className="h-4 w-12 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
              <Skeleton className="h-14 w-full bg-neutral-850" />
            </div>
          </div>
          <div>
            <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
            <Skeleton className="h-10 w-full bg-neutral-850" />
          </div>
        </aside>
      </div>
    </div>
  );
}

// Edit Project Skeleton
function AdminEditProjectSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex justify-between items-center h-20 px-12 border-b border-outline-variant sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30">
        <div>
          <Skeleton className="h-3.5 w-32 mb-1 bg-neutral-850" />
          <Skeleton className="h-9 w-40 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-6">
          <Skeleton className="h-4 w-28 bg-neutral-850" />
          <Skeleton className="h-9 w-24 bg-neutral-850" />
          <Skeleton className="h-9 w-20 bg-neutral-800" />
        </div>
      </header>

      {/* Status Bar */}
      <div className="px-12 py-3 bg-[#111111] border-b border-zinc-800">
        <Skeleton className="h-4.5 w-52 bg-neutral-850" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 grid grid-cols-12 gap-12">
          {/* Left Column (8/12) */}
          <div className="col-span-8 space-y-8">
            <div>
              <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
              <Skeleton className="h-14 w-full bg-neutral-800" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-28 mb-2 bg-neutral-850" />
              <Skeleton className="h-24 w-full bg-neutral-850" />
            </div>

            <div>
              <Skeleton className="h-4 w-24 mb-2 bg-neutral-855" />
              <Skeleton className="h-[420px] w-full bg-[#0d0d0d] border border-outline-variant" />
            </div>
          </div>

          {/* Right sidebar (4/12) */}
          <aside className="col-span-4 space-y-6">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div>
                <Skeleton className="h-4 w-32 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
              <Skeleton className="h-14 w-full bg-neutral-850" />
              <div>
                <Skeleton className="h-4 w-24 mb-2 bg-neutral-855" />
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Research Logs List Skeleton
function AdminResearchLogsListSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-48 bg-neutral-800" />
        </div>
        <Skeleton className="h-10 w-44 bg-neutral-800" />
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <div className="flex gap-4 flex-1">
          <Skeleton className="h-10 w-full max-w-md bg-neutral-850" />
          <Skeleton className="h-10 w-32 bg-neutral-850" />
        </div>
        <div className="flex gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-6 w-16 bg-neutral-850" />
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4"><Skeleton className="h-4 w-12 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-20 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-14 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-24 bg-neutral-850" /></th>
                <th className="py-4 px-4 text-right"><Skeleton className="h-4 w-16 ml-auto bg-neutral-850" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"}>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-8 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-6 w-56 bg-neutral-800" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-24 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-16 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-20 bg-neutral-850" /></td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-3">
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-850" />
                      <Skeleton className="h-5 w-5 bg-neutral-855" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-8 flex justify-end">
        <Skeleton className="h-8.5 w-24 bg-neutral-850" />
      </footer>
    </div>
  );
}

// New Research Log Skeleton
function AdminNewResearchLogSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="h-24 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div>
          <Skeleton className="h-4.5 w-52 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-56 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20 bg-neutral-850" />
          <Skeleton className="h-10 w-24 bg-neutral-800" />
        </div>
      </header>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <section className="px-12 py-8 max-w-5xl space-y-8">
          <div>
            <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
            <Skeleton className="h-14 w-full bg-[#111111] border border-zinc-700" />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-[#111111] border border-zinc-700" />
            </div>
            <div>
              <Skeleton className="h-4 w-12 mb-2 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-[#111111] border border-zinc-700" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-[#111111] border border-zinc-700" />
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
            <Skeleton className="h-28 w-full bg-[#111111] border border-zinc-700" />
          </div>

          <div>
            <Skeleton className="h-10 w-44 bg-neutral-850" />
            <Skeleton className="h-[480px] w-full bg-[#0d0d0d] border border-zinc-700" />
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-lowest border-t border-zinc-800 px-6 h-8 flex items-center justify-between z-30">
        <Skeleton className="h-3.5 w-32 bg-neutral-850" />
        <Skeleton className="h-3.5 w-24 bg-neutral-850" />
      </footer>
    </div>
  );
}

// Edit Research Log Skeleton
function AdminEditResearchLogSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="h-20 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div>
          <Skeleton className="h-3.5 w-36 mb-1 bg-neutral-850" />
          <Skeleton className="h-9 w-48 bg-neutral-800" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-24 bg-neutral-850" />
          <Skeleton className="h-9 w-20 bg-neutral-800" />
        </div>
      </header>

      {/* Status Bar */}
      <div className="px-12 py-3 bg-[#111111] border-b border-zinc-800 flex items-center gap-6">
        <Skeleton className="h-4.5 w-44 bg-neutral-850" />
        <Skeleton className="h-4.5 w-32 bg-neutral-850" />
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 grid grid-cols-10 gap-12">
          {/* Left Main column */}
          <div className="col-span-7 space-y-8">
            <div>
              <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
              <Skeleton className="h-12 w-full bg-[#111111] border border-zinc-700" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <Skeleton className="h-4 w-12 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
              <div>
                <Skeleton className="h-4 w-12 mb-2 bg-neutral-850" />
                <Skeleton className="h-10 w-full bg-[#111111] border border-zinc-700" />
              </div>
            </div>

            <div>
              <Skeleton className="h-4 w-16 mb-2 bg-neutral-850" />
              <Skeleton className="h-24 w-full bg-[#111111] border border-zinc-700" />
            </div>

            <div className="space-y-0">
              <Skeleton className="h-8 w-44 bg-neutral-850" />
              <Skeleton className="h-[480px] w-full bg-[#0d0d0d] border border-zinc-700" />
            </div>
          </div>

          {/* Right sidebar */}
          <aside className="col-span-3 space-y-6">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div>
                <Skeleton className="h-3.5 w-16 bg-neutral-850 mb-1" />
                <Skeleton className="h-5 w-32 bg-neutral-800" />
              </div>
              <div>
                <Skeleton className="h-3.5 w-20 bg-neutral-850 mb-1" />
                <Skeleton className="h-7 w-12 bg-neutral-800" />
              </div>
              <div>
                <Skeleton className="h-3.5 w-12 bg-neutral-850 mb-1" />
                <Skeleton className="h-5 w-24 bg-neutral-800" />
              </div>
              <Skeleton className="h-5 w-20 bg-neutral-850" />
              <div className="pt-4 border-t border-zinc-800">
                <Skeleton className="h-10 w-full bg-neutral-850" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Media Manager Skeleton
function AdminMediaSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <Skeleton className="h-4 w-20 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-28 bg-neutral-800" />
        </div>
        <Skeleton className="h-10 w-24 bg-neutral-800" />
      </header>

      {/* Controls */}
      <section className="px-12 mb-8 flex justify-between items-center gap-6">
        <Skeleton className="h-10 w-full max-w-md bg-neutral-850" />
        <div className="flex gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16 bg-neutral-850" />
          ))}
        </div>
      </section>

      {/* Upload Dropzone */}
      <section className="px-12 mb-8">
        <div className="custom-dashed-border p-8 flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-10 bg-neutral-850" />
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-5 w-44 bg-neutral-800" />
            <Skeleton className="h-4 w-64 bg-neutral-850" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="px-12 mb-6 flex gap-8">
        <Skeleton className="h-4 w-24 bg-neutral-850" />
        <Skeleton className="h-4 w-32 bg-neutral-850" />
      </div>

      {/* Media Grid */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="masonry-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="masonry-item bg-[#111111] border border-zinc-800">
              <Skeleton className="w-full h-44 bg-neutral-800" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Media Upload Skeleton
function AdminMediaUploadSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
      <div className="p-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <Skeleton className="h-4 w-28 mb-4 bg-neutral-850" />
          <Skeleton className="h-10 w-48 bg-neutral-800" />
        </header>

        {/* Dropzone */}
        <div className="custom-dashed-border p-16 flex flex-col items-center justify-center gap-6 min-h-[360px]">
          <Skeleton className="h-12 w-12 bg-neutral-800" />
          <div className="text-center flex flex-col items-center gap-2">
            <Skeleton className="h-6 w-32 bg-neutral-800" />
            <Skeleton className="h-4.5 w-24 bg-neutral-850" />
            <Skeleton className="h-4 w-52 mt-2 bg-neutral-850" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Messages Skeleton
function AdminMessagesSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="w-full pt-12 px-12 pb-8 flex justify-between items-end">
        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-neutral-850" />
          <Skeleton className="h-10 w-36 bg-neutral-800" />
        </div>
        <Skeleton className="h-10 w-24 bg-neutral-850" />
      </header>

      {/* Stats */}
      <div className="px-12 mb-6 flex gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-700 px-6 py-4 flex flex-col justify-between w-32 h-20">
            <Skeleton className="h-7 w-8 bg-neutral-800" />
            <Skeleton className="h-3.5 w-16 bg-neutral-850" />
          </div>
        ))}
      </div>

      {/* Messages Table */}
      <section className="flex-1 px-12 overflow-y-auto custom-scrollbar">
        <div className="w-full border-t border-zinc-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="py-4 px-4"><Skeleton className="h-4 w-12 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-12 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-16 bg-neutral-850" /></th>
                <th className="py-4 px-4"><Skeleton className="h-4 w-32 bg-neutral-850" /></th>
                <th className="py-4 px-4 text-right"><Skeleton className="h-4 w-16 ml-auto bg-neutral-850" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-[#0f0f0f]" : "bg-[#111111]"}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded bg-neutral-800" />
                      <Skeleton className="h-5 w-20 bg-neutral-850" />
                    </div>
                  </td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-28 bg-neutral-850" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-5 w-24 bg-neutral-800" /></td>
                  <td className="py-4 px-4"><Skeleton className="h-4 w-44 bg-neutral-855" /></td>
                  <td className="py-4 px-4 text-right"><Skeleton className="h-4 w-24 ml-auto bg-neutral-850" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

// Login screen skeleton
function LoginSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-xl border border-zinc-800 backdrop-blur-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Skeleton className="h-8 w-24 bg-neutral-800" />
          </div>
          <Skeleton className="h-6 w-48 bg-neutral-855 mx-auto" />
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
          <Skeleton className="h-12 w-full rounded-lg bg-neutral-855" />
        </div>
      </div>
    </div>
  );
}

// Generic fallback
function DefaultSkeleton() {
  return (
    <div className="min-h-screen bg-[#050810]">
      <PublicHeaderSkeleton />
      <div className="container mx-auto px-6 pt-32 pb-24 space-y-8">
        <Skeleton className="h-10 w-1/2 bg-neutral-800" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <PublicFooterSkeleton />
    </div>
  );
}

// Main Selector Component
export function PageSkeleton({ pathname }: { pathname: string }) {
  if (pathname === "/") return <HomeSkeleton />;
  if (pathname === "/about") return <AboutSkeleton />;
  if (pathname === "/contact") return <ContactSkeleton />;
  if (pathname === "/timeline") return <TimelineSkeleton />;
  if (pathname === "/blog" || pathname === "/projects") {
    return <ListSkeleton type={pathname === "/blog" ? "blog" : "projects"} />;
  }
  
  if (pathname.startsWith("/admin")) {
    let content = <AdminDashboardOverviewSkeleton />;
    
    if (pathname === "/admin/posts") {
      content = <AdminPostsListSkeleton />;
    } else if (pathname === "/admin/posts/new") {
      content = <AdminNewPostSkeleton />;
    } else if (pathname.startsWith("/admin/posts/") && pathname.endsWith("/edit")) {
      content = <AdminEditPostSkeleton />;
    } else if (pathname.startsWith("/admin/posts/") && pathname.endsWith("/delete")) {
      content = <AdminDeleteSkeleton type="Post" />;
    } else if (pathname.startsWith("/admin/posts/") && pathname.endsWith("/revisions")) {
      content = <AdminRevisionsSkeleton type="Post" />;
    } else if (pathname === "/admin/projects") {
      content = <AdminProjectsListSkeleton />;
    } else if (pathname === "/admin/projects/new") {
      content = <AdminNewProjectSkeleton />;
    } else if (pathname.startsWith("/admin/projects/") && pathname.endsWith("/edit")) {
      content = <AdminEditProjectSkeleton />;
    } else if (pathname.startsWith("/admin/projects/") && pathname.endsWith("/delete")) {
      content = <AdminDeleteSkeleton type="Project" />;
    } else if (pathname.startsWith("/admin/projects/") && pathname.endsWith("/revisions")) {
      content = <AdminRevisionsSkeleton type="Project" />;
    } else if (pathname === "/admin/research-logs") {
      content = <AdminResearchLogsListSkeleton />;
    } else if (pathname === "/admin/research-logs/new") {
      content = <AdminNewResearchLogSkeleton />;
    } else if (pathname.startsWith("/admin/research-logs/") && pathname.endsWith("/edit")) {
      content = <AdminEditResearchLogSkeleton />;
    } else if (pathname.startsWith("/admin/research-logs/") && pathname.endsWith("/delete")) {
      content = <AdminDeleteSkeleton type="Research Log" />;
    } else if (pathname === "/admin/media") {
      content = <AdminMediaSkeleton />;
    } else if (pathname === "/admin/media/upload") {
      content = <AdminMediaUploadSkeleton />;
    } else if (pathname === "/admin/messages") {
      content = <AdminMessagesSkeleton />;
    }

    return <AdminLayoutSkeleton pathname={pathname}>{content}</AdminLayoutSkeleton>;
  }
  
  if (pathname === "/login") return <LoginSkeleton />;

  // Support for category list pages e.g. /electronics, /astrophysics, /physics-math, /communications, /research
  const publicCategories = ["/electronics", "/astrophysics", "/physics-math", "/communications", "/research"];
  if (publicCategories.includes(pathname)) {
    return <ListSkeleton type="blog" />;
  }
  
  // Dynamic posts or categories (e.g. /blog/[slug], /projects/[slug], /[category]/[slug])
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length === 2 || pathname.startsWith("/blog/") || pathname.startsWith("/projects/")) {
    return <PostSkeleton />;
  }

  return <DefaultSkeleton />;
}
