"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

interface GradientOverlayProps {
  className?: string;
  type?: "mesh" | "linear" | "glow";
  opacity?: number;
}

/**
 * Subtle gradient overlay system using CSS only, safe for low-GPU environments.
 */
export function GradientOverlay({
  className,
  type = "linear",
  opacity = 0.05,
}: GradientOverlayProps) {
  const typeMap = {
    linear: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, transparent 100%)",
    mesh: "radial-gradient(at 0% 0%, rgba(255,255,255,1) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(255,255,255,1) 0px, transparent 50%)",
    glow: "radial-gradient(circle at 50% -20%, rgba(255,255,255,1) 0%, transparent 60%)",
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{
        background: typeMap[type],
        opacity,
        mixBlendMode: "overlay",
      }}
      aria-hidden="true"
    />
  );
}
