"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/lib/mdx/mdx-components";

interface AdminMDXPreviewProps {
  /** Form field name for the textarea (e.g. "content") */
  name: string;
  /** Default value for the textarea */
  defaultValue?: string;
  /** Minimum height class for the textarea (Tailwind) */
  minHeightClass?: string;
  /** Placeholder text */
  placeholder?: string;
}

export default function AdminMDXPreview({
  name,
  defaultValue = "",
  minHeightClass = "min-h-[320px] md:min-h-[520px]",
  placeholder = "# Title\n\nStart writing your MDX content here...",
}: AdminMDXPreviewProps) {
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [content, setContent] = useState(defaultValue);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Sync content from textarea on mode switch
  const handlePreview = useCallback(async () => {
    // Read latest value from textarea DOM in case React state is stale
    const currentContent = textareaRef.current?.value ?? content;
    setContent(currentContent);
    setMode("preview");
    setLoading(true);
    setError(null);

    // Cancel any in-flight preview request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/preview-mdx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: currentContent }),
        signal: controller.signal,
      });

      const data = await res.json();

      if (!controller.signal.aborted) {
        if (data.success) {
          setMdxSource(data.mdxSource);
        } else {
          setError(data.error || "Failed to compile MDX");
        }
        setLoading(false);
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      if (!controller.signal.aborted) {
        setError("Network error — could not reach the preview API.");
        setLoading(false);
      }
    }
  }, [content]);

  const handleWrite = useCallback(() => {
    setMode("write");
    // Restore focus to textarea when switching back
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, []);

  // Cleanup abort controller on unmount
  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  return (
    <div className="flex flex-col border border-zinc-700 bg-[#0d0d0d]">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-[#111111] px-4 py-2 flex-wrap gap-2">
        <div className="flex gap-1">
          <button
            type="button"
            onClick={handleWrite}
            className={`px-4 py-1.5 font-label text-[9px] uppercase tracking-widest transition-colors ${
              mode === "write"
                ? "bg-[#0d0d0d] border border-zinc-700 text-zinc-200"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={handlePreview}
            className={`px-4 py-1.5 font-label text-[9px] uppercase tracking-widest transition-colors ${
              mode === "preview"
                ? "bg-[#0d0d0d] border border-zinc-700 text-zinc-200"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            Preview
          </button>
        </div>
        <div className="flex items-center gap-4 text-zinc-500 overflow-x-auto scrollbar-none py-0.5">
          {mode === "write" && (
            <>
              <span className="material-symbols-outlined text-base cursor-pointer hover:text-zinc-300">format_bold</span>
              <span className="material-symbols-outlined text-base cursor-pointer hover:text-zinc-300">code</span>
              <span className="material-symbols-outlined text-base cursor-pointer hover:text-zinc-300">image</span>
              <span className="material-symbols-outlined text-base cursor-pointer hover:text-zinc-300">table_chart</span>
            </>
          )}
          {mode === "preview" && (
            <span className="font-label text-[9px] uppercase tracking-widest text-zinc-500">
              Preview Mode
            </span>
          )}
        </div>
      </div>

      {/* Write Mode */}
      {mode === "write" && (
        <textarea
          ref={textareaRef}
          name={name}
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full ${minHeightClass} bg-transparent p-4 md:p-8 font-label text-sm leading-loose text-zinc-400 focus:outline-none resize-none`}
          placeholder={placeholder}
        />
      )}

      {/* Hidden input to preserve form value when in preview mode */}
      {mode === "preview" && (
        <input type="hidden" name={name} value={content} />
      )}

      {/* Preview Mode */}
      {mode === "preview" && (
        <div className={`w-full ${minHeightClass} overflow-y-auto custom-scrollbar p-4 md:p-8`}>
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-8 w-3/4 bg-zinc-800/60 rounded" />
              <div className="h-4 w-full bg-zinc-800/40 rounded" />
              <div className="h-4 w-5/6 bg-zinc-800/40 rounded" />
              <div className="h-4 w-4/6 bg-zinc-800/40 rounded" />
              <div className="h-32 w-full bg-zinc-800/30 rounded-lg mt-6" />
              <div className="h-4 w-full bg-zinc-800/40 rounded" />
              <div className="h-4 w-3/4 bg-zinc-800/40 rounded" />
            </div>
          )}

          {error && !loading && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-4">
              <p className="font-mono text-xs text-red-400 mb-2 uppercase tracking-widest">
                Preview Error
              </p>
              <pre className="text-sm text-red-300/80 whitespace-pre-wrap break-words">
                {error}
              </pre>
            </div>
          )}

          {!loading && !error && mdxSource && (
            <article
              className="prose prose-invert prose-zinc max-w-none
                prose-headings:font-display prose-headings:tracking-tight prose-headings:text-[#c9c6c5]
                prose-h1:text-3xl prose-h1:font-black prose-h1:mb-6
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-base
                prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-zinc-200
                prose-code:text-cyan-300 prose-code:text-sm
                prose-li:text-zinc-300 prose-li:marker:text-zinc-600
                prose-blockquote:border-cyan-500/40
                prose-img:rounded-xl"
            >
              <MDXRemote {...mdxSource} components={mdxComponents} />
            </article>
          )}

          {!loading && !error && !mdxSource && (
            <p className="text-zinc-500 italic font-label text-sm">
              No content to preview.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
