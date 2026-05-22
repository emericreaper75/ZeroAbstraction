/* Server Component — pure CSS, no client-side APIs needed */

import * as React from "react";
import { cn } from "@/lib/cn";

interface VignetteProps {
  className?: string;
  intensity?: "light" | "medium" | "heavy";
}

/**
 * Reusable edge-darkening overlay to improve cinematic depth and text readability.
 */
export function Vignette({ className, intensity = "medium" }: VignetteProps) {
  const intensityMap = {
    light: "radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.4) 100%)",
    medium: "radial-gradient(circle at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
    heavy: "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
  };

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-10", className)}
      style={{
        background: intensityMap[intensity],
        willChange: 'opacity',
        transform: 'translateZ(0)',
      }}
      aria-hidden="true"
    />
  );
}
