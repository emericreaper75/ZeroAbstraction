"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import Link from "next/link";

type UploadState = "idle" | "drag" | "preview" | "progress" | "success";

interface FilePreview {
  file: File;
  objectUrl: string;
}

export default function MediaUploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [preview, setPreview] = useState<FilePreview | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || !files[0]) return;
    const file = files[0];
    const objectUrl = URL.createObjectURL(file);
    setPreview({ file, objectUrl });
    setUploadState("preview");
  }, []);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setUploadState("drag");
  };
  const handleDragLeave = () => {
    if (uploadState === "drag") setUploadState("idle");
  };
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!preview) return;
    setUploadState("progress");
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedUrl(URL.createObjectURL(preview.file));
          setUploadState("success");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview.objectUrl);
    setPreview(null);
    setProgress(0);
    setUploadedUrl(null);
    setUploadState("idle");
  };

  function formatBytes(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 p-12 max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <nav className="flex items-center gap-2 mb-4">
            <Link href="/admin/media" className="font-label text-xs uppercase tracking-widest text-zinc-500 hover:text-[#c9c6c5] transition-colors">Media</Link>
            <span className="material-symbols-outlined text-[10px] text-zinc-700">chevron_right</span>
            <span className="font-label text-xs uppercase tracking-widest text-[#c9c6c5]">Upload</span>
          </nav>
          <h1 className="font-display text-4xl font-bold text-on-surface tracking-tight">Upload Media</h1>
        </header>

        {/* ── IDLE STATE ── */}
        {uploadState === "idle" && (
          <div
            className="custom-dashed-border p-16 flex flex-col items-center justify-center gap-6 cursor-pointer min-h-[360px] hover:bg-zinc-900/20 transition-all"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
          >
            <span className="material-symbols-outlined text-5xl text-zinc-600">cloud_upload</span>
            <div className="text-center">
              <p className="font-headline text-xl font-bold text-on-surface mb-2">Drop files here</p>
              <p className="font-body text-sm text-zinc-500">
                or{" "}
                <span className="text-[#c9c6c5] underline underline-offset-2 cursor-pointer hover:text-white">browse to upload</span>
              </p>
              <p className="font-label text-[10px] uppercase tracking-widest text-zinc-600 mt-4">PNG · JPG · SVG · MP4 · PDF · Max 64MB</p>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleInputChange} />
          </div>
        )}

        {/* ── DRAG STATE ── */}
        {uploadState === "drag" && (
          <div
            className="border-2 border-[#c9c6c5] p-16 flex flex-col items-center justify-center gap-6 min-h-[360px] bg-zinc-900/30"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <span className="material-symbols-outlined text-5xl text-[#c9c6c5] animate-bounce">cloud_upload</span>
            <p className="font-headline text-xl font-bold text-[#c9c6c5]">Release to upload</p>
          </div>
        )}

        {/* ── PREVIEW STATE ── */}
        {uploadState === "preview" && preview && (
          <div className="bg-[#111111] border border-zinc-700 p-8 space-y-8">
            {preview.file.type.startsWith("image") ? (
              <div className="aspect-video overflow-hidden bg-zinc-900">
                <img src={preview.objectUrl} alt="Preview" className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-zinc-900">
                <span className="material-symbols-outlined text-6xl text-zinc-600">description</span>
              </div>
            )}
            <div className="space-y-2">
              <p className="font-label text-xs text-zinc-300 uppercase tracking-widest">{preview.file.name}</p>
              <div className="flex gap-4">
                <span className="font-label text-[10px] text-zinc-500 uppercase">{preview.file.type || "Unknown"}</span>
                <span className="font-label text-[10px] text-zinc-500 uppercase">{formatBytes(preview.file.size)}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={handleUpload} className="flex-1 py-3 bg-zinc-200 hover:bg-white text-black font-label text-xs uppercase tracking-widest font-bold transition-all">
                Upload File
              </button>
              <button onClick={reset} className="px-6 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-label text-xs uppercase tracking-widest transition-all">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── PROGRESS STATE ── */}
        {uploadState === "progress" && (
          <div className="bg-[#111111] border border-zinc-700 p-12 space-y-8">
            <div className="flex flex-col items-center gap-6">
              <span className="material-symbols-outlined text-5xl text-[#c9c6c5] animate-pulse">cloud_upload</span>
              <p className="font-headline text-xl font-bold text-on-surface">Uploading...</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between font-label text-[10px] uppercase text-zinc-500">
                <span>{preview?.file.name}</span>
                <span>{Math.round(Math.min(progress, 100))}%</span>
              </div>
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c9c6c5] transition-all duration-200"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ── SUCCESS STATE ── */}
        {uploadState === "success" && (
          <div className="bg-[#111111] border border-zinc-700 p-12 space-y-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-emerald-900/30 border border-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-emerald-400">check_circle</span>
              </div>
              <p className="font-headline text-2xl font-bold text-on-surface">Upload Complete</p>
              <p className="font-label text-[10px] uppercase tracking-widest text-zinc-500">{preview?.file.name}</p>
            </div>
            <div className="flex gap-4">
              <button onClick={reset} className="flex-1 py-3 bg-zinc-200 hover:bg-white text-black font-label text-xs uppercase tracking-widest font-bold transition-all">
                Upload Another
              </button>
              <Link href="/admin/media" className="flex-1 py-3 border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-label text-xs uppercase tracking-widest transition-all text-center">
                Back to Media
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
