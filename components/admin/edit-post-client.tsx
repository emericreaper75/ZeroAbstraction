"use client";

import { useFormState } from "react-dom";
import { updateContentPost } from "@/actions/content-post-actions";
import Link from "next/link";

const CATEGORIES = ["ELECTRONICS", "ASTROPHYSICS", "PHYSICS_MATH", "COMMUNICATIONS"];

interface Props {
  postId: string;
  slug: string;
  defaultValues: {
    title: string;
    description: string | null;
    content: string | null;
    category: string;
    tags: string[];
    featured: boolean;
    published: boolean;
    thumbnail: string | null;
    thumbnailAlt: string | null;
  };
}

export default function EditPostClient({ postId, slug, defaultValues }: Props) {
  const boundAction = updateContentPost.bind(null, postId);
  const [state, formAction] = useFormState(boundAction, { error: "" });
  const isPending = false;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Status Bar */}
      <div className="px-12 py-3 bg-[#111111] border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${defaultValues.published ? "bg-emerald-500" : "bg-amber-500"}`} />
            <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">
              {defaultValues.published ? "Published" : "Draft"}
            </span>
          </div>
          <span className="font-label text-[10px] text-zinc-600 uppercase tracking-widest">ID: {postId.slice(0, 8)}</span>
        </div>
        <Link href={`/blog/${slug}`} target="_blank" className="font-label text-[10px] uppercase tracking-widest text-zinc-500 hover:text-[#c9c6c5] transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">open_in_new</span>View Live
        </Link>
      </div>

      {/* Header */}
      <header className="h-20 px-12 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30">
        <div className="flex flex-col">
          <nav className="font-label text-[10px] tracking-tight text-zinc-500 uppercase mb-1">
            Admin / Posts / <span className="text-zinc-300">{slug}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tighter text-on-surface">Edit Post</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/posts" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-label text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all duration-200">
            Cancel
          </Link>
          <Link href={`/admin/posts/${slug}/revisions`} className="font-label text-[10px] tracking-widest uppercase text-zinc-400 hover:text-[#c9c6c5] transition-colors duration-200">
            Revision History
          </Link>
          <button form="edit-post-form" name="published" value="false" type="submit" className="px-6 py-2 border border-zinc-700 font-label text-[10px] uppercase tracking-widest text-zinc-300 hover:bg-zinc-800 transition-all duration-200">
            Save Draft
          </button>
          <button form="edit-post-form" name="published" value="true" type="submit" disabled={isPending} className="px-6 py-2 bg-zinc-300 text-black font-bold font-label text-[10px] uppercase tracking-widest hover:bg-white transition-all duration-200 disabled:opacity-50">
            {isPending ? "Saving..." : "Update"}
          </button>
        </div>
      </header>

      {state.error && (
        <div className="mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      {/* Form */}
      <form id="edit-post-form" action={formAction} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 grid grid-cols-10 gap-12">
          {/* Left column (7/10) */}
          <div className="col-span-7 space-y-8">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Post Title</label>
                <input
                  name="title"
                  defaultValue={defaultValues.title}
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 text-xl font-medium focus:ring-0 focus:border-zinc-300 transition-colors focus:outline-none"
                  type="text"
                />
              </div>
              <div className="col-span-6">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">URL Slug</label>
                <div className="relative">
                  <input
                    className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-500 cursor-not-allowed"
                    disabled
                    value={slug}
                    type="text"
                    readOnly
                  />
                  <span className="material-symbols-outlined absolute right-3 top-2 text-zinc-600 text-lg cursor-pointer hover:text-zinc-300">lock_open</span>
                </div>
              </div>
              <div className="col-span-4">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Category</label>
                <select
                  name="category"
                  defaultValue={defaultValues.category}
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-300 focus:ring-0 focus:border-zinc-300 appearance-none focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Featured</label>
                <select
                  name="featured"
                  defaultValue={defaultValues.featured ? "true" : "false"}
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-300 focus:ring-0 focus:border-zinc-300 appearance-none focus:outline-none"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500">Description</label>
              </div>
              <textarea
                name="description"
                defaultValue={defaultValues.description ?? ""}
                className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 font-body text-sm leading-relaxed text-zinc-300 focus:ring-0 focus:border-zinc-300 focus:outline-none"
                rows={3}
              />
            </div>

            {/* Tags */}
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Tags (comma-separated)</label>
              <input
                name="tags"
                defaultValue={defaultValues.tags.join(", ")}
                className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-300 focus:ring-0 focus:border-zinc-300 transition-colors focus:outline-none"
                type="text"
              />
            </div>

            {/* MDX Editor */}
            <div className="space-y-0">
              <div className="flex gap-1">
                <button type="button" className="px-6 py-2 bg-[#111111] border-x border-t border-zinc-700 font-label text-[10px] uppercase tracking-widest text-zinc-200">Write</button>
                <button type="button" className="px-6 py-2 text-zinc-600 hover:text-zinc-400 font-label text-[10px] uppercase tracking-widest transition-colors">Preview</button>
              </div>
              <div className="relative bg-[#0d0d0d] border border-zinc-700 min-h-[520px]">
                <textarea
                  name="content"
                  defaultValue={defaultValues.content ?? ""}
                  className="w-full min-h-[520px] bg-transparent p-8 font-label text-sm leading-loose text-zinc-400 focus:outline-none resize-none"
                />
              </div>
            </div>

            <input type="hidden" name="thumbnail" value={defaultValues.thumbnail ?? ""} />
            <input type="hidden" name="thumbnailAlt" value={defaultValues.thumbnailAlt ?? ""} />
          </div>

          {/* Right sidebar (3/10) */}
          <aside className="col-span-3 space-y-8 sticky top-28 h-fit">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div className="space-y-1">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 block">Post ID</label>
                <p className="font-label text-sm font-bold text-[#c9c6c5]">{postId.slice(0, 16)}...</p>
              </div>
              <div className="border-l-2 border-zinc-800 pl-6 space-y-4 py-2">
                <p className="font-label text-[9px] text-zinc-600 uppercase leading-loose tracking-widest">
                  Revision history is tracked automatically on every save.
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-label text-[10px] text-zinc-400">Auto-save Active</span>
                </div>
              </div>
              <Link href={`/admin/posts/${slug}/delete`} className="block w-full text-center px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 font-label text-[10px] uppercase tracking-widest transition-colors">
                Delete Post
              </Link>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
