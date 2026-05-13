"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div 
        className={cn(
          "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl",
          className
        )}
      >
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800" />
      </div>
    </div>
  );
}
