"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import { cn } from "@/lib/cn";

type Uploaded = { url: string; key: string };

export default function MediaUploader(props: {
  onUploaded?: (files: Uploaded[]) => void;
  className?: string;
}) {
  const [uploaded, setUploaded] = useState<Uploaded[]>([]);
  const [error, setError] = useState<string | null>(null);

  const previews = useMemo(() => uploaded.slice(0, 6), [uploaded]);

  return (
    <div className={cn("space-y-4", props.className)}>
      <UploadDropzone
        endpoint="media"
        appearance={{
          container:
            "rounded-2xl border border-zinc-800 bg-zinc-900/40 text-zinc-200 transition hover:border-zinc-700",
          label: "text-zinc-200 font-medium",
          allowedContent: "text-zinc-500 text-sm",
          button:
            "ut-ready:bg-cyan-500 ut-ready:text-zinc-950 ut-ready:hover:bg-cyan-400 ut-uploading:cursor-not-allowed",
        }}
        onUploadError={(err: Error) => {
          setError(err.message || "Upload failed");
        }}
        onClientUploadComplete={(res: Array<{ url: string; key: string }> | undefined) => {
          const files =
            res?.map((r) => ({ url: r.url, key: r.key })) ?? [];
          setUploaded(files);
          setError(null);
          props.onUploaded?.(files);
        }}
      />

      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {previews.length ? (
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            Preview
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {previews.map((f) => (
              <div
                key={f.key}
                className="relative aspect-[16/10] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40"
              >
                <Image
                  src={f.url}
                  alt="Uploaded media preview"
                  fill
                  sizes="(max-width: 768px) 50vw, 240px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

