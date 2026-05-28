"use client";

import { useFormState } from "react-dom";
import { updateResearchLog } from "@/actions/research-log-actions";
import Link from "next/link";
import AdminMDXPreview from "@/components/admin/admin-mdx-preview";

const SERIES_OPTIONS = [
  "Signal Processing",
  "Systems Architecture",
  "Astrophysics Notes",
  "Electronics Lab",
  "Physics Abstractions",
  "Communications Theory",
];

interface Props {
  logId: string;
  defaultValues: {
    title: string;
    slug: string;
    series: string;
    abstract: string;
    content: string;
    tags: string[];
    entryNumber: number;
    featured: boolean;
    published: boolean;
    updatedAt: string;
  };
}

export default function EditResearchLogClient({ logId, defaultValues }: Props) {
  const boundAction = updateResearchLog.bind(null, logId);
  const [state, formAction] = useFormState(boundAction, { error: "" });
  const isPending = false;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Header */}
      <header className="h-auto min-h-20 py-4 md:py-0 md:h-20 px-4 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30 border-b border-outline-variant/30 gap-4">
        <div>
          <nav className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-1">
            Admin / Research Logs / <span className="text-[#c9c6c5]">Edit</span>
          </nav>
          <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface tracking-tight">Edit Research Log</h1>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Link href="/admin/research-logs" className="px-4 md:px-6 py-2 border border-zinc-700 text-zinc-300 font-label text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all duration-200">
            Cancel
          </Link>
          <button form="edit-log-form" name="published" value="false" type="submit" className="px-4 md:px-6 py-2 border border-zinc-700 font-label text-[10px] uppercase tracking-widest text-zinc-300 hover:bg-zinc-800 transition-all">
            Save Draft
          </button>
          <button form="edit-log-form" name="published" value="true" type="submit" disabled={isPending} className="px-4 md:px-6 py-2 bg-zinc-300 text-black font-bold font-label text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
            {isPending ? "Saving..." : "Update"}
          </button>
        </div>
      </header>

      {/* Status bar */}
      <div className="px-4 md:px-12 py-3 bg-[#111111] border-b border-zinc-800 flex flex-col sm:flex-row gap-2 sm:items-center justify-between sm:gap-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${defaultValues.published ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">
            {defaultValues.published ? "Published" : "Draft"} · Entry #{String(defaultValues.entryNumber).padStart(3, "0")}
          </span>
        </div>
        <span className="font-label text-[10px] text-zinc-600 uppercase">Last saved: {defaultValues.updatedAt.slice(0, 10)}</span>
      </div>

      {state.error && (
        <div className="mx-4 md:mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      <form id="edit-log-form" action={formAction} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-4 pt-6 pb-20 md:px-12 md:pt-12 md:pb-24 grid grid-cols-1 md:grid-cols-10 gap-6 md:gap-12">
          {/* Main editor (7/10) */}
          <div className="col-span-1 md:col-span-7 space-y-8">
            <div>
              <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Log Title</label>
              <input
                name="title"
                defaultValue={defaultValues.title}
                required
                className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 text-xl font-bold font-headline text-on-surface focus:outline-none focus:border-zinc-300 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Series</label>
                <select
                  name="series"
                  defaultValue={defaultValues.series}
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-300 focus:outline-none focus:border-zinc-300 appearance-none"
                >
                  {SERIES_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">URL Slug</label>
                <input
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-600 cursor-not-allowed"
                  defaultValue={defaultValues.slug}
                  disabled
                  readOnly
                />
              </div>
              <div>
                <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Tags</label>
                <input
                  name="tags"
                  defaultValue={defaultValues.tags.join(", ")}
                  className="w-full bg-[#111111] border border-zinc-700 px-4 py-2 font-label text-sm text-zinc-300 focus:outline-none focus:border-zinc-300 transition-all"
                  placeholder="tag1, tag2..."
                />
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] uppercase text-zinc-500 tracking-widest mb-2 block">Abstract</label>
              <textarea
                name="abstract"
                defaultValue={defaultValues.abstract}
                className="w-full bg-[#111111] border border-zinc-700 px-4 py-3 text-sm text-on-surface font-body leading-relaxed focus:outline-none focus:border-zinc-300 resize-none"
                rows={4}
              />
            </div>

            {/* MDX Editor */}
            <AdminMDXPreview
              name="content"
              defaultValue={defaultValues.content}
              minHeightClass="min-h-[320px] md:min-h-[480px]"
              placeholder="# Research Entry&#10;&#10;Begin documenting your findings..."
            />
          </div>

          {/* Right sidebar (3/10) */}
          <aside className="col-span-1 md:col-span-3 space-y-6 sticky top-28 h-fit">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div>
                <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Entry ID</p>
                <p className="font-label text-sm font-bold text-[#c9c6c5]">{logId.slice(0, 16)}...</p>
              </div>
              <div>
                <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Entry Number</p>
                <p className="font-label text-2xl font-bold text-on-surface">#{String(defaultValues.entryNumber).padStart(3, "0")}</p>
              </div>
              <div>
                <p className="font-label text-[9px] text-zinc-500 uppercase tracking-widest mb-1">Series</p>
                <p className="font-label text-sm text-zinc-300">{defaultValues.series}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${defaultValues.published ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`} />
                <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">
                  {defaultValues.published ? "Published" : "Draft"}
                </span>
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <label className="flex items-center gap-2 font-label text-[10px] uppercase text-zinc-300 tracking-widest cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    value="true"
                    defaultChecked={defaultValues.featured}
                    className="w-4 h-4 bg-[#111111] border-zinc-700 rounded text-cyan-500 focus:ring-cyan-500/20 focus:ring-offset-0 focus:ring-2"
                  />
                  Featured Research Log
                </label>
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <Link
                  href={`/admin/research-logs/${logId}/delete`}
                  className="block w-full text-center px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 font-label text-[10px] uppercase tracking-widest transition-colors"
                >
                  Delete Log
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
