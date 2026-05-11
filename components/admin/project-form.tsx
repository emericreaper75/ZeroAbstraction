"use client";

import { useFormState } from "react-dom";

interface ProjectFormProps {
  action: (
    prevState: {
      error: string;
    },
    formData: FormData
  ) => Promise<{
    error: string;
  }>;
  defaultValues?: {
    title?: string;
    description?: string;
    content?: string;
    tags?: string[];
    githubUrl?: string | null;
    liveUrl?: string | null;
    featured?: boolean;
    published?: boolean;
  };
}

const initialState = {
  error: "",
};

export default function ProjectForm({
  action,
  defaultValues,
}: ProjectFormProps) {
  const [state, formAction] =
    useFormState(action, initialState);

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Title
        </label>

        <input
          type="text"
          name="title"
          defaultValue={
            defaultValues?.title || ""
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Description
        </label>

        <textarea
          name="description"
          rows={3}
          defaultValue={
            defaultValues?.description || ""
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Content
        </label>

        <textarea
          name="content"
          rows={10}
          defaultValue={
            defaultValues?.content || ""
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Tags
        </label>

        <input
          type="text"
          name="tags"
          defaultValue={
            defaultValues?.tags?.join(", ") ||
            ""
          }
          placeholder="Next.js, Prisma, TypeScript"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          GitHub URL
        </label>

        <input
          type="url"
          name="githubUrl"
          defaultValue={
            defaultValues?.githubUrl || ""
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Live URL
        </label>

        <input
          type="url"
          name="liveUrl"
          defaultValue={
            defaultValues?.liveUrl || ""
          }
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-zinc-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={
              defaultValues?.featured ||
              false
            }
          />

          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            name="published"
            value="true"
            defaultChecked={
              defaultValues?.published ??
              true
            }
          />

          Published
        </label>
      </div>

      {state.error && (
        <p className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
      >
        Save Project
      </button>
    </form>
  );
}