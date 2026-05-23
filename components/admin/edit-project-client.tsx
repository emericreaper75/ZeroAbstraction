"use client";

import { useFormState } from "react-dom";
import { updateProject } from "@/actions/project-actions";
import Link from "next/link";

interface Props {
  projectId: string;
  defaultValues: {
    title: string;
    description: string;
    content: string;
    tags: string[];
    githubUrl: string;
    liveUrl: string;
    featured: boolean;
    published: boolean;
    thumbnail: string;
    thumbnailAlt: string;
    updatedAt: string;
  };
}

export default function EditProjectClient({ projectId, defaultValues }: Props) {
  const boundAction = updateProject.bind(null, projectId);
  const [state, formAction] = useFormState(boundAction, { error: "" });
  const isPending = false;

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0a0a]">
      {/* Top Header */}
      <header className="flex justify-between items-center h-20 px-12 border-b border-outline-variant sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-md z-30">
        <div className="flex flex-col">
          <nav className="font-label text-[10px] tracking-widest text-zinc-500 uppercase mb-1">
            Admin / Projects / <span className="text-[#c9c6c5]">Edit</span>
          </nav>
          <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">Edit Project</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/admin/projects" className="px-6 py-2 border border-zinc-700 text-zinc-300 font-label text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all duration-200">
            Cancel
          </Link>
          <Link href={`/admin/projects/${projectId}/revisions`} className="font-label text-[10px] tracking-widest uppercase text-zinc-500 hover:text-[#c9c6c5] transition-colors">
            Revision History
          </Link>
          <button form="edit-project-form" name="published" value="false" type="submit" className="px-6 py-2 border border-zinc-700 font-label text-[10px] uppercase tracking-widest text-zinc-300 hover:bg-zinc-800 transition-all">
            Save Draft
          </button>
          <button form="edit-project-form" name="published" value="true" type="submit" disabled={isPending} className="px-6 py-2 bg-zinc-300 text-black font-bold font-label text-[10px] uppercase tracking-widest hover:bg-white transition-all disabled:opacity-50">
            {isPending ? "Saving..." : "Update"}
          </button>
        </div>
      </header>

      {/* Status bar */}
      <div className="px-12 py-3 bg-[#111111] border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${defaultValues.published ? "bg-emerald-500" : "bg-amber-500"}`} />
          <span className="font-label text-[10px] uppercase tracking-widest text-zinc-400">
            {defaultValues.published ? "Live" : "In Progress"} · Last modified {defaultValues.updatedAt.slice(0, 10)}
          </span>
        </div>
      </div>

      {state.error && (
        <div className="mx-12 mt-4 px-4 py-3 bg-red-900/30 border border-red-800 text-red-300 font-label text-xs uppercase tracking-widest">
          {state.error}
        </div>
      )}

      {/* Form */}
      <form id="edit-project-form" action={formAction} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-12 py-12 grid grid-cols-12 gap-12">
          {/* Left column (8/12) */}
          <div className="col-span-8 space-y-8">
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Project Title</label>
              <input
                name="title"
                defaultValue={defaultValues.title}
                required
                className="w-full bg-transparent border-b border-outline-variant py-4 text-3xl font-headline font-bold text-on-surface focus:border-[#c9c6c5] focus:outline-none transition-all"
                type="text"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">GitHub URL</label>
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant px-3">
                  <span className="material-symbols-outlined text-sm text-zinc-600">terminal</span>
                  <input
                    name="githubUrl"
                    defaultValue={defaultValues.githubUrl}
                    className="w-full bg-transparent border-none py-3 font-label text-xs text-[#c9c6c5] focus:ring-0 focus:outline-none"
                    placeholder="Repository URL"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Live URL</label>
                <div className="flex items-center bg-surface-container-lowest border border-outline-variant px-3">
                  <span className="material-symbols-outlined text-sm text-zinc-600">public</span>
                  <input
                    name="liveUrl"
                    defaultValue={defaultValues.liveUrl}
                    className="w-full bg-transparent border-none py-3 font-label text-xs text-[#c9c6c5] focus:ring-0 focus:outline-none"
                    placeholder="Live URL"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Short Description</label>
              <textarea
                name="description"
                defaultValue={defaultValues.description}
                required
                className="w-full bg-surface-container-lowest border border-outline-variant p-4 font-body text-sm text-on-surface leading-relaxed focus:outline-none focus:border-zinc-300"
                rows={3}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-label text-[10px] uppercase tracking-widest text-zinc-500">MDX Content</label>
                <div className="flex gap-4">
                  {["format_bold", "code", "image"].map((ic) => (
                    <span key={ic} className="material-symbols-outlined text-sm text-zinc-600 cursor-pointer hover:text-[#c9c6c5] transition-colors">{ic}</span>
                  ))}
                </div>
              </div>
              <textarea
                name="content"
                defaultValue={defaultValues.content}
                className="w-full min-h-[420px] p-6 bg-[#0d0d0d] border border-outline-variant font-label text-sm leading-loose text-zinc-400 focus:outline-none focus:border-zinc-300 resize-none custom-scrollbar"
              />
            </div>

            <input type="hidden" name="thumbnail" value={defaultValues.thumbnail} />
            <input type="hidden" name="thumbnailAlt" value={defaultValues.thumbnailAlt} />
          </div>

          {/* Right metadata card (4/12) */}
          <aside className="col-span-4 space-y-6 sticky top-28 h-fit">
            <div className="bg-[#111111] border border-zinc-700 p-6 space-y-6">
              <div>
                <span className="text-[11px] text-zinc-400 font-label uppercase tracking-tighter mb-2 block">Status & Visibility</span>
                <select
                  name="published"
                  defaultValue={defaultValues.published ? "true" : "false"}
                  className="w-full bg-surface-container-highest border border-outline-variant p-3 font-label text-xs text-on-surface uppercase tracking-widest focus:outline-none appearance-none"
                >
                  <option value="false">In Progress</option>
                  <option value="true">Live</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-surface-container border border-outline-variant">
                <span className="text-[11px] text-zinc-400 font-label uppercase tracking-tighter">Featured Project</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input name="featured" type="checkbox" value="true" defaultChecked={defaultValues.featured} className="sr-only peer" />
                  <div className="w-10 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-500 after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#c9c6c5]/20 peer-checked:after:bg-[#c9c6c5]" />
                </label>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 font-label uppercase tracking-tighter mb-2 block">Tech Stack Tags</span>
                <input
                  name="tags"
                  defaultValue={defaultValues.tags.join(", ")}
                  className="w-full bg-surface-container-lowest border border-outline-variant p-3 font-label text-xs text-on-surface focus:outline-none focus:border-zinc-300"
                  placeholder="nextjs, typescript..."
                  type="text"
                />
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <p className="font-label text-[9px] text-zinc-600 uppercase tracking-widest mb-3">Danger Zone</p>
                <Link
                  href={`/admin/projects/${projectId}/delete`}
                  className="block w-full text-center px-4 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 font-label text-[10px] uppercase tracking-widest transition-colors"
                >
                  Delete Project
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </div>
  );
}
