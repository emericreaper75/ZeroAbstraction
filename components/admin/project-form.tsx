"use client";

import { useMemo } from "react";
import { useFormState } from "react-dom";
import { SaveStatusIndicator } from "@/components/admin/editor/save-status";
import { useAutosaveDraft } from "@/components/admin/editor/use-autosave-draft";

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
  autosave?: {
    enabled: boolean;
    storageKey: string;
    save: (
      draft: {
        title: string;
        description: string;
        content: string;
        tags: string[];
        githubUrl: string;
        liveUrl: string;
        featured: boolean;
        published: boolean;
      },
      clientMutationId: string
    ) => Promise<
      | { ok: true; updatedAt: string; version?: number }
      | { ok: false; error: string }
    >;
  };
}

const initialState = {
  error: "",
};

export default function ProjectForm({
  action,
  defaultValues,
  autosave,
}: ProjectFormProps) {
  const [state, formAction] =
    useFormState(action, initialState);

  const initialDraft = useMemo(
    () => ({
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      content: defaultValues?.content || "",
      tags: defaultValues?.tags || [],
      githubUrl: defaultValues?.githubUrl || "",
      liveUrl: defaultValues?.liveUrl || "",
      featured: defaultValues?.featured || false,
      published: defaultValues?.published ?? true,
    }),
    [defaultValues]
  );

  const autosaveState = useAutosaveDraft({
    enabled: autosave?.enabled ?? false,
    storageKey: autosave?.storageKey ?? "draft:project:disabled",
    initialDraft,
    save: async (draft, clientMutationId) => {
      if (!autosave?.save) {
        return { ok: false, error: "Autosave not configured" };
      }
      return autosave.save(draft, clientMutationId);
    },
  });

  const d = autosaveState.draft;

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
    >
      {autosave?.enabled && (
        <div className="flex items-center justify-between">
          <SaveStatusIndicator status={autosaveState.status} />
          <button
            type="button"
            onClick={() => autosaveState.flush()}
            className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-xs text-zinc-200 transition hover:border-zinc-600"
          >
            Save now
          </button>
        </div>
      )}
      <div>
        <label className="mb-2 block text-sm text-zinc-300">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={autosave?.enabled ? d.title : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.title || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    title: e.target.value,
                  })
              : undefined
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
          value={autosave?.enabled ? d.description : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.description || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    description: e.target.value,
                  })
              : undefined
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
          value={autosave?.enabled ? d.content : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.content || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    content: e.target.value,
                  })
              : undefined
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
          value={autosave?.enabled ? d.tags.join(", ") : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.tags?.join(", ") || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
              : undefined
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
          value={autosave?.enabled ? d.githubUrl : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.githubUrl || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    githubUrl: e.target.value,
                  })
              : undefined
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
          value={autosave?.enabled ? d.liveUrl : undefined}
          defaultValue={autosave?.enabled ? undefined : defaultValues?.liveUrl || ""}
          onChange={
            autosave?.enabled
              ? (e) =>
                  autosaveState.setDraft({
                    ...d,
                    liveUrl: e.target.value,
                  })
              : undefined
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
            checked={autosave?.enabled ? d.featured : undefined}
            defaultChecked={autosave?.enabled ? undefined : defaultValues?.featured || false}
            onChange={
              autosave?.enabled
                ? (e) =>
                    autosaveState.setDraft({
                      ...d,
                      featured: e.target.checked,
                    })
                : undefined
            }
          />

          Featured
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            name="published"
            value="true"
            checked={autosave?.enabled ? d.published : undefined}
            defaultChecked={autosave?.enabled ? undefined : defaultValues?.published ?? true}
            onChange={
              autosave?.enabled
                ? (e) =>
                    autosaveState.setDraft({
                      ...d,
                      published: e.target.checked,
                    })
                : undefined
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