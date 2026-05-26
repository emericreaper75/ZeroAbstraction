"use client";

import { useFormState } from "react-dom";
import { createProject } from "@/actions/project-actions";
import Link from "next/link";

export default function NewProjectPage() {
  const [state, formAction] = useFormState(createProject, { error: "" });
  const isPending = false;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center h-auto min-h-20 py-4 md:py-0 md:h-20 px-4 md:px-12 border-b border-outline-variant sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 gap-4">
        <div className="flex flex-col">
          <nav className="font-label text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
            Admin / Projects / <span className="text-[#c9c6c5]">New</span>
          </nav>
          <h1 className="text-2xl md:text-4xl font-headline font-bold text-on-surface tracking-tight">New Project</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="px-6 py-2 border border-outline-variant text-on-surface font-label text-xs uppercase tracking-widest hover:bg-surface-variant transition-all">
            Cancel
          </Link>
          <button
            form="new-project-form"
            type="submit"
            name="published"
            value="true"
            disabled={isPending}
            className="px-8 py-2 bg-zinc-300 text-black font-label text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all shadow-[0_0_20px_rgba(30,41,59,0.2)] disabled:opacity-50"
          >
            {isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </header>

      {state.error && (
        <div className="mx-4 md:mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      {/* Form Area */}
      <form id="new-project-form" action={formAction} className="flex flex-col md:flex-row flex-1 overflow-y-auto custom-scrollbar">
        {/* Left Column: Primary Fields (65%) */}
        <section className="w-full md:w-[65%] px-4 pt-6 pb-20 md:px-12 md:pt-12 md:pb-24 space-y-8">
          {/* Title */}
          <div>
            <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Project Title</label>
            <input
              name="title"
              required
              className="w-full bg-transparent border-b border-outline-variant py-4 text-2xl md:text-3xl font-headline font-bold text-on-surface focus:border-[#c9c6c5] focus:outline-none transition-all placeholder:text-zinc-800"
              placeholder="Enter high-level project name..."
              type="text"
            />
          </div>

          {/* Slug + GithubUrl */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div>
              <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-2">GitHub URL</label>
              <div className="flex items-center bg-surface-container-lowest border border-outline-variant px-4 py-2">
                <span className="material-symbols-outlined text-sm text-zinc-600 mr-2">terminal</span>
                <input
                  name="githubUrl"
                  className="w-full bg-transparent border-none p-0 font-label text-xs text-[#c9c6c5] focus:ring-0 focus:outline-none"
                  placeholder="https://github.com/..."
                  type="text"
                />
              </div>
            </div>
            <div>
              <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Live URL</label>
              <div className="flex items-center bg-surface-container-lowest border border-outline-variant px-4 py-2">
                <span className="material-symbols-outlined text-sm text-zinc-600 mr-2">public</span>
                <input
                  name="liveUrl"
                  className="w-full bg-transparent border-none p-0 font-label text-xs text-[#c9c6c5] focus:ring-0 focus:outline-none"
                  placeholder="https://..."
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-2">Short Description</label>
            <textarea
              name="description"
              required
              className="w-full bg-surface-container-lowest border border-outline-variant p-4 font-body text-base text-on-surface leading-relaxed placeholder:text-zinc-800 focus:outline-none focus:border-zinc-300"
              placeholder="Define the core intent of this deployment in a few sentences..."
              rows={3}
            />
          </div>

          {/* MDX Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest">MDX Content</label>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-xs text-zinc-600 cursor-pointer hover:text-[#c9c6c5] transition-colors">format_bold</span>
                <span className="material-symbols-outlined text-xs text-zinc-600 cursor-pointer hover:text-[#c9c6c5] transition-colors">format_italic</span>
                <span className="material-symbols-outlined text-xs text-zinc-600 cursor-pointer hover:text-[#c9c6c5] transition-colors">code</span>
                <span className="material-symbols-outlined text-xs text-zinc-600 cursor-pointer hover:text-[#c9c6c5] transition-colors">image</span>
              </div>
            </div>
            <textarea
              name="content"
              className="w-full min-h-[300px] md:min-h-[400px] p-4 md:p-6 bg-[#0d0d0d] border border-outline-variant font-label text-sm leading-relaxed text-zinc-300 custom-scrollbar overflow-y-auto focus:outline-none focus:border-zinc-300 resize-none"
              placeholder="# Project Documentation&#10;&#10;Start documenting the technical architecture here..."
            />
          </div>

          {/* Hidden defaults */}
          <input type="hidden" name="published" value="false" />
          <input type="hidden" name="featured" value="false" />
        </section>

        {/* Right Column: Metadata Panel (35%) */}
        <aside className="w-full md:w-[35%] p-4 md:p-8 space-y-10 bg-[#111111] border-t md:border-t-0 md:border-l border-outline-variant">
          {/* Status & Featured */}
          <div>
            <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Deployment Configuration</label>
            <div className="space-y-6">
              <div>
                <span className="text-[11px] text-zinc-400 font-label uppercase tracking-tighter mb-2 block">Status</span>
                <select
                  name="published"
                  className="w-full bg-surface-container-highest border border-outline-variant p-3 font-label text-xs text-on-surface uppercase tracking-widest focus:outline-none focus:border-zinc-300 appearance-none"
                >
                  <option value="false">In Progress</option>
                  <option value="true">Live</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant">
                <span className="text-[11px] text-zinc-400 font-label uppercase tracking-tighter">Featured Project</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input name="featured" type="checkbox" value="true" className="sr-only peer" />
                  <div className="w-10 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-500 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9c6c5]/20 peer-checked:after:bg-[#c9c6c5]" />
                </label>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block font-label text-[10px] text-zinc-500 uppercase tracking-widest mb-4">Stack Tags</label>
            <input
              name="tags"
              className="w-full bg-surface-container-lowest border border-outline-variant p-3 font-label text-xs text-on-surface focus:outline-none focus:border-zinc-300"
              placeholder="nextjs, typescript, prisma..."
              type="text"
            />
            <p className="font-label text-[9px] text-zinc-600 mt-1 uppercase tracking-tight">Comma-separated</p>
          </div>
        </aside>
      </form>
    </div>
  );
}