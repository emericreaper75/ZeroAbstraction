"use client";

import { useRef } from "react";
import { useFormState } from "react-dom";
import { createContentPost } from "@/actions/content-post-actions";
import Link from "next/link";

const CATEGORIES = ["ELECTRONICS", "ASTROPHYSICS", "PHYSICS_MATH", "COMMUNICATIONS"];

export default function NewPostPage() {
  const [state, formAction] = useFormState(createContentPost, { error: "" });
  const isPending = false;
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      <div className="cinematic-glow" />

      {/* Header */}
      <header className="h-24 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div className="flex flex-col">
          <nav className="flex items-center gap-2 mb-2">
            <span className="font-label text-xs text-zinc-500 uppercase tracking-widest">Admin</span>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
            <span className="font-label text-xs text-zinc-500 uppercase tracking-widest">Posts</span>
            <span className="material-symbols-outlined text-zinc-600 text-sm">chevron_right</span>
            <span className="font-label text-xs text-[#c9c6c5] uppercase tracking-widest">New Post</span>
          </nav>
          <h1 className="text-[36px] font-black font-headline tracking-tighter text-on-surface">New Post</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/admin/posts" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-label text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all">
            Cancel
          </Link>
          <button
            form="new-post-form"
            type="submit"
            disabled={isPending}
            name="published"
            value="true"
            className="px-8 py-2 bg-zinc-300 text-black font-label text-xs font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50"
          >
            {isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </header>

      {state.error && (
        <div className="mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      {/* Form */}
      <form id="new-post-form" ref={formRef} action={formAction}>
        <section className="px-12 py-8 max-w-5xl space-y-8">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest">Post Title</label>
            <input
              name="title"
              required
              className="w-full px-4 py-4 text-2xl font-bold font-headline text-on-surface bg-[#111111] border border-zinc-700 rounded-none focus:outline-none focus:border-zinc-300 transition-all"
              placeholder="Enter post title..."
              type="text"
            />
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest">Category</label>
              <select
                name="category"
                className="w-full px-4 py-3 font-label text-sm text-zinc-300 rounded-none bg-[#111111] border border-zinc-700 focus:outline-none focus:border-zinc-300 appearance-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest">Tags</label>
              <input
                name="tags"
                className="w-full px-4 py-3 font-label text-sm text-zinc-300 rounded-none bg-[#111111] border border-zinc-700 focus:outline-none focus:border-zinc-300 transition-all"
                placeholder="tag1, tag2, tag3"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest">Featured</label>
              <select
                name="featured"
                className="w-full px-4 py-3 font-label text-sm text-zinc-300 rounded-none bg-[#111111] border border-zinc-700 focus:outline-none focus:border-zinc-300 appearance-none"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 relative">
            <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest">Excerpt / Description</label>
            <textarea
              name="description"
              className="w-full px-4 py-3 text-sm text-on-surface rounded-none resize-none bg-[#111111] border border-zinc-700 focus:outline-none focus:border-zinc-300 transition-all"
              placeholder="Brief summary of the post..."
              rows={3}
            />
          </div>

          {/* MDX Editor */}
          <div className="flex flex-col">
            <div className="flex gap-8 mb-[2px] border-b border-zinc-800">
              <button type="button" className="px-8 py-3 font-label text-xs uppercase tracking-widest text-[#c9c6c5] border-b-2 border-[#c9c6c5]">Write</button>
              <button type="button" className="px-8 py-3 font-label text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">Preview</button>
            </div>
            <div className="relative bg-[#0d0d0d] border border-zinc-700 min-h-[520px]">
              <div className="absolute top-4 right-6 flex gap-4 text-zinc-600">
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-zinc-300">format_bold</span>
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-zinc-300">code</span>
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-zinc-300">image</span>
                <span className="material-symbols-outlined text-lg cursor-pointer hover:text-zinc-300">table_chart</span>
              </div>
              <textarea
                name="content"
                className="w-full h-full min-h-[520px] bg-transparent p-8 font-label text-sm leading-relaxed text-zinc-400 focus:outline-none resize-none"
                placeholder="# Post Title&#10;&#10;Start writing your MDX content here..."
              />
            </div>
          </div>

          {/* Hidden fields */}
          <input type="hidden" name="published" value="false" />
          <input type="hidden" name="thumbnail" value="" />
          <input type="hidden" name="thumbnailAlt" value="" />
        </section>
      </form>

      {/* Status Bar */}
      <footer className="fixed bottom-0 left-[240px] right-0 bg-surface-container-lowest border-t border-zinc-800 px-6 h-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-label text-[9px] text-zinc-500 uppercase tracking-widest">Auto-save Enabled</span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="font-label text-[9px] text-zinc-600 uppercase tracking-widest">MDX Syntax Active</span>
          <span className="font-label text-[9px] text-zinc-600 uppercase tracking-widest">UTF-8</span>
        </div>
      </footer>
    </div>
  );
}